import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function TradingHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Mock trading history data
  const tradingHistory = [
    {
      id: 1, symbol: "EURUSD", type: "BUY", volume: "0.50", openPrice: "1.08450", closePrice: "1.08920",
      profit: "235.00", commission: "-7.50", swap: "0.00", openTime: "2024-01-15T14:23:00Z",
      closeTime: "2024-01-15T16:45:00Z", status: "closed", expertAdvisor: "ZenBot Nexus", duration: "2h 22m"
    },
    {
      id: 2, symbol: "GBPUSD", type: "SELL", volume: "0.30", openPrice: "1.27340", closePrice: "1.26980",
      profit: "108.00", commission: "-4.50", swap: "0.00", openTime: "2024-01-15T13:45:00Z",
      closeTime: "2024-01-15T15:12:00Z", status: "closed", expertAdvisor: "ZenBot Nexus", duration: "1h 27m"
    },
    {
      id: 3, symbol: "USDJPY", type: "BUY", volume: "0.20", openPrice: "148.230", closePrice: "147.890",
      profit: "-68.00", commission: "-3.00", swap: "0.00", openTime: "2024-01-15T12:18:00Z",
      closeTime: "2024-01-15T14:30:00Z", status: "closed", expertAdvisor: "ZenBot Zero", duration: "2h 12m"
    },
    {
      id: 4, symbol: "XAUUSD", type: "BUY", volume: "0.10", openPrice: "2028.50", closePrice: null,
      profit: "45.00", commission: "-2.00", swap: "-1.50", openTime: "2024-01-16T09:30:00Z",
      closeTime: null, status: "open", expertAdvisor: "ZenBot Nexus", duration: "6h 23m"
    },
    {
      id: 5, symbol: "USDCAD", type: "SELL", volume: "0.25", openPrice: "1.34520", closePrice: "1.34180",
      profit: "85.00", commission: "-3.75", swap: "0.00", openTime: "2024-01-16T11:15:00Z",
      closeTime: "2024-01-16T13:42:00Z", status: "closed", expertAdvisor: "ZenBot Zero", duration: "2h 27m"
    }
  ];

  const filteredTrades = tradingHistory.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.expertAdvisor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || trade.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatProfit = (profit: string) => {
    const num = parseFloat(profit);
    const formatted = Math.abs(num).toFixed(2);
    return num >= 0 ? `+$${formatted}` : `-$${formatted}`;
  };

  const getProfitColor = (profit: string) => {
    return parseFloat(profit) >= 0 ? "text-green-500" : "text-red-500";
  };

  const getStatusBadge = (status: string) => {
    return status === "open" ? 
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">Open</Badge> :
      <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/20">Closed</Badge>;
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Symbol,Type,Volume,Open Price,Close Price,P&L,Commission,Status,Open Time,Close Time\n" +
      filteredTrades.map(trade => 
        `${trade.symbol},${trade.type},${trade.volume},${trade.openPrice},${trade.closePrice || 'N/A'},${trade.profit},${trade.commission},${trade.status},${trade.openTime},${trade.closeTime || 'N/A'}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "trading_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#0B1426] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Trading History</h1>
          <p className="text-slate-400 text-sm sm:text-base">Complete record of all your trading activities</p>
        </div>
        <Button 
          onClick={handleExport} 
          className="bg-green-500 hover:bg-green-600 w-full sm:w-auto"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by symbol or EA..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#0B1426] border-[#334155] text-slate-50"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 bg-[#0B1426] border-[#334155] text-slate-50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1E293B] border-[#334155]">
                <SelectItem value="all" className="text-slate-50">All Trades</SelectItem>
                <SelectItem value="open" className="text-slate-50">Open Trades</SelectItem>
                <SelectItem value="closed" className="text-slate-50">Closed Trades</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trading History Table */}
      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#334155] text-slate-400 text-sm">
                  <th className="text-left py-3">Symbol</th>
                  <th className="text-left py-3">Type</th>
                  <th className="text-left py-3">Volume</th>
                  <th className="text-left py-3">Open Price</th>
                  <th className="text-left py-3">Close Price</th>
                  <th className="text-left py-3">P&L</th>
                  <th className="text-left py-3">Duration</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Expert Advisor</th>
                  <th className="text-left py-3">Open Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredTrades.map((trade) => (
                  <tr 
                    key={trade.id} 
                    className="border-b border-[#334155]/50 hover:bg-[#334155]/20 transition-colors"
                  >
                    <td className="py-3 font-medium text-slate-50">{trade.symbol}</td>
                    <td className="py-3">
                      <Badge className={trade.type === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {trade.type}
                      </Badge>
                    </td>
                    <td className="py-3 text-slate-300">{trade.volume}</td>
                    <td className="py-3 text-slate-300">{trade.openPrice}</td>
                    <td className="py-3 text-slate-300">{trade.closePrice || "-"}</td>
                    <td className={`py-3 ${getProfitColor(trade.profit)}`}>
                      {formatProfit(trade.profit)}
                    </td>
                    <td className="py-3 text-slate-300">{trade.duration}</td>
                    <td className="py-3">{getStatusBadge(trade.status)}</td>
                    <td className="py-3 text-slate-300">{trade.expertAdvisor}</td>
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-50">{filteredTrades.length}</div>
            <div className="text-slate-400 text-sm">Total Trades</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">
              {filteredTrades.filter(t => parseFloat(t.profit) > 0).length}
            </div>
            <div className="text-slate-400 text-sm">Winning Trades</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-500">
              {filteredTrades.filter(t => parseFloat(t.profit) < 0).length}
            </div>
            <div className="text-slate-400 text-sm">Losing Trades</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-50">
              {filteredTrades.filter(t => t.status === "open").length}
            </div>
            <div className="text-slate-400 text-sm">Open Positions</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}