import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useLocation } from "wouter";

interface Trade {
  id: number;
  symbol: string;
  type: string;
  volume: string;
  openPrice: string;
  closePrice: string;
  profit: string;
  openTime: string;
  closeTime: string;
  expertAdvisor: string;
}

interface RecentTradesProps {
  trades: Trade[];
}

export default function RecentTrades({ trades }: RecentTradesProps) {
  const [, setLocation] = useLocation();
  
  const formatProfit = (profit: string) => {
    const num = parseFloat(profit);
    const formatted = Math.abs(num).toFixed(2);
    return num >= 0 ? `+$${formatted}` : `-$${formatted}`;
  };

  const getProfitColor = (profit: string) => {
    return parseFloat(profit) >= 0 ? "text-green-500" : "text-red-500";
  };

  const handleViewAll = () => {
    setLocation('/history');
  };

  return (
    <Card className="bg-[#1E293B] border-[#334155]">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h3 className="text-lg font-semibold text-slate-50">Recent Trades</h3>
          <Button 
            variant="ghost" 
            className="text-blue-400 hover:text-blue-300 w-full sm:w-auto"
            onClick={handleViewAll}
            size="sm"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        {/* Mobile Cards View */}
        <div className="block sm:hidden space-y-3">
          {trades.map((trade) => (
            <div key={trade.id} className="bg-[#0B1426] border border-[#334155] rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-slate-50">{trade.symbol}</div>
                <div className={`font-medium ${getProfitColor(trade.profit || "0")}`}>
                  {formatProfit(trade.profit || "0")}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-400">Type:</span>
                  <span className="text-slate-300 ml-1">{trade.type}</span>
                </div>
                <div>
                  <span className="text-slate-400">Size:</span>
                  <span className="text-slate-300 ml-1">{trade.volume}</span>
                </div>
                <div>
                  <span className="text-slate-400">Open:</span>
                  <span className="text-slate-300 ml-1">{trade.openPrice}</span>
                </div>
                <div>
                  <span className="text-slate-400">Close:</span>
                  <span className="text-slate-300 ml-1">{trade.closePrice || "-"}</span>
                </div>
              </div>
              <div className="text-slate-400 text-xs mt-2">
                {format(new Date(trade.openTime), "MMM dd, HH:mm")}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#334155] text-slate-400 text-sm">
                <th className="text-left py-3">Symbol</th>
                <th className="text-left py-3">Type</th>
                <th className="text-left py-3">Size</th>
                <th className="text-left py-3">Open Price</th>
                <th className="text-left py-3">Close Price</th>
                <th className="text-left py-3">P&L</th>
                <th className="text-left py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {trades.map((trade) => (
                <tr 
                  key={trade.id} 
                  className="border-b border-[#334155]/50 hover:bg-[#334155]/20 transition-colors"
                >
                  <td className="py-3 font-medium text-slate-50">{trade.symbol}</td>
                  <td className="py-3 text-slate-300">{trade.type}</td>
                  <td className="py-3 text-slate-300">{trade.volume}</td>
                  <td className="py-3 text-slate-300">{trade.openPrice}</td>
                  <td className="py-3 text-slate-300">{trade.closePrice || "-"}</td>
                  <td className={`py-3 ${getProfitColor(trade.profit || "0")}`}>
                    {formatProfit(trade.profit || "0")}
                  </td>
                  <td className="py-3 text-slate-400">
                    {format(new Date(trade.openTime), "MMM dd, HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
