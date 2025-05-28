import { Card, CardContent } from "@/components/ui/card";

interface Metrics {
  profitFactor: string;
  totalTrades: number;
  avgTrade: string;
  bestTrade: string;
  worstTrade: string;
}

interface PerformanceMetricsProps {
  metrics: Metrics;
}

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    return num >= 0 ? `+$${Math.abs(num).toFixed(2)}` : `-$${Math.abs(num).toFixed(2)}`;
  };

  const performanceItems = [
    {
      label: "Profit Factor",
      value: metrics.profitFactor,
      className: "text-green-500"
    },
    {
      label: "Sharpe Ratio",
      value: "1.89", // Mock value
      className: "text-slate-50"
    },
    {
      label: "Average Trade",
      value: formatCurrency(metrics.avgTrade),
      className: parseFloat(metrics.avgTrade) >= 0 ? "text-green-500" : "text-red-500"
    },
    {
      label: "Total Trades",
      value: metrics.totalTrades.toString(),
      className: "text-slate-50"
    },
    {
      label: "Best Trade",
      value: formatCurrency(metrics.bestTrade),
      className: "text-green-500"
    },
    {
      label: "Worst Trade",
      value: formatCurrency(metrics.worstTrade),
      className: "text-red-500"
    }
  ];

  return (
    <Card className="bg-[#1E293B] border-[#334155]">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6 text-slate-50">Performance Metrics</h3>
        <div className="space-y-4">
          {performanceItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-slate-400">{item.label}</span>
              <span className={`font-semibold ${item.className}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
