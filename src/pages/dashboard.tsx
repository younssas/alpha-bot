import Sidebar from "@/components/layout/sidebar";
import MetricsGrid from "@/components/dashboard/metrics-grid";
import BalanceChart from "@/components/dashboard/balance-chart";
import PerformanceMetrics from "@/components/dashboard/performance-metrics";
import ExpertAdvisors from "@/components/dashboard/expert-advisors";
import RecentTrades from "@/components/dashboard/recent-trades";
import CommunitySection from "@/components/dashboard/community-section";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Wifi } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { dashboardData } from "@/lib/staticData";
import type { DashboardData } from "@/lib/types";

export default function Dashboard() {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  // Using static data for GitHub Pages deployment
  const data = dashboardData;
  const isLoading = false;

  const handleSync = async () => {
    if (!dashboardData?.account?.id) return;
    
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/sync/${dashboardData.account.id}`, {
        method: "POST",
        credentials: "include",
      });
      
      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Sync Complete",
          description: `Synchronized ${result.syncedTrades} trades from MetaTrader`,
        });
        refetch();
      } else {
        throw new Error("Sync failed");
      }
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Could not sync MetaTrader data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-slate-300 text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">No Data Available</h2>
          <p className="text-slate-400">Unable to load dashboard data.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-[#1E293B] border-b border-[#334155] px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <div className="text-sm text-blue-400 font-medium mb-1">Alpha Bot</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-50">Trading Dashboard</h2>
            <p className="text-slate-400 text-sm sm:text-base">Monitor your portfolio performance and trading metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400">MetaTrader Synced</span>
            </div>
            <Button 
              onClick={handleSync}
              disabled={isSyncing}
              className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
              size="sm"
            >
              {isSyncing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {isSyncing ? "Syncing..." : "Sync Data"}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <MetricsGrid 
          balance={data.metrics.totalBalance}
          totalProfit={data.metrics.totalProfit}
          maxDrawdown={data.metrics.maxDrawdown}
          winRate={data.metrics.winRate}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <BalanceChart performance={data.performance} />
          <PerformanceMetrics metrics={data.metrics} />
        </div>

        <ExpertAdvisors expertAdvisors={data.expertAdvisors} />
        
        <RecentTrades trades={data.recentTrades} />
        
        <CommunitySection />
      </div>
    </>
  );
}
