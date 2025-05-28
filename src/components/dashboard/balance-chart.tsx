import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, subDays } from "date-fns";
import { useState } from "react";

interface PerformanceData {
  date: string;
  balance: string;
}

interface BalanceChartProps {
  performance: PerformanceData[];
}

export default function BalanceChart({ performance }: BalanceChartProps) {
  const [timeframe, setTimeframe] = useState("7days");

  // Generate synthetic data based on timeframe
  const generateData = (days: number) => {
    const data = [];
    const baseBalance = 200000;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const volatility = Math.sin(i * 0.1) * 5000 + Math.random() * 3000;
      const trend = (days - i) * 100; // Gradual upward trend
      const balance = baseBalance + trend + volatility;
      
      data.push({
        date: format(date, "MMM dd"),
        balance: Math.round(balance),
      });
    }
    return data;
  };

  const getChartData = () => {
    switch (timeframe) {
      case "7days": return generateData(7);
      case "30days": return generateData(30);
      case "90days": return generateData(90);
      default: return generateData(7);
    }
  };

  const chartData = getChartData();

  return (
    <Card className="bg-[#1E293B] border-[#334155]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-50">Balance History</h3>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32 bg-[#0B1426] border-[#334155] text-slate-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E293B] border-[#334155]">
              <SelectItem value="7days" className="text-slate-50">7 Days</SelectItem>
              <SelectItem value="30days" className="text-slate-50">30 Days</SelectItem>
              <SelectItem value="90days" className="text-slate-50">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="date" 
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8" }}
              />
              <YAxis 
                stroke="#94A3B8"
                tick={{ fill: "#94A3B8" }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#10B981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
