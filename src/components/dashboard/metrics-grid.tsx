import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, Target, ArrowUp } from "lucide-react";

interface MetricsGridProps {
  balance: number;
  totalProfit: string;
  maxDrawdown: string;
  winRate: string;
}

export default function MetricsGrid({ balance, totalProfit, maxDrawdown, winRate }: MetricsGridProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const dailyChange = balance * 0.0126; // Mock 1.26% daily change
  const dailyChangePercent = "1.26";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Total Balance</h3>
            <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-2 text-slate-50">
            {formatCurrency(balance)}
          </div>
          <div className="flex items-center text-xs sm:text-sm">
            <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
            <span className="text-green-500">
              +{formatCurrency(dailyChange)} ({dailyChangePercent}%)
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Total Profit</h3>
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-2 text-green-500">
            +${parseFloat(totalProfit).toLocaleString()}
          </div>
          <div className="flex items-center text-xs sm:text-sm">
            <span className="text-slate-400">Since inception</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Max Drawdown</h3>
            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-2 text-red-500">
            -{maxDrawdown}%
          </div>
          <div className="flex items-center text-xs sm:text-sm">
            <span className="text-slate-400">Within limits</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium">Win Rate</h3>
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-2 text-slate-50">
            {winRate}%
          </div>
          <div className="flex items-center text-xs sm:text-sm">
            <span className="text-slate-400">Last 30 days</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
