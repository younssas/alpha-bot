import { useQuery } from "@tanstack/react-query";
import Sidebar from "./sidebar";
import { Loader2, ChartLine, History, Settings, Users, UserCircle } from "lucide-react";
import { useLocation } from "wouter";
import type { DashboardData } from "@/lib/types";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  
  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/1"], // Using user ID 1 for demo
  });

  const mobileNavigation = [
    { name: "Dashboard", icon: ChartLine, path: "/", current: location === "/" || location === "/dashboard" },
    { name: "History", icon: History, path: "/history", current: location === "/history" },
    { name: "EAs", icon: Settings, path: "/expert-advisors", current: location === "/expert-advisors" },
    { name: "Community", icon: Users, path: "/community", current: location === "/community" },
    { name: "Settings", icon: UserCircle, path: "/settings", current: location === "/settings" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-slate-300 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#0B1426] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">No Data Available</h2>
          <p className="text-slate-400">Unable to load application data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#0B1426]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          accounts={dashboardData.accounts} 
          activeAccount={dashboardData.account}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1E293B] border-t border-[#334155] z-50">
        <div className="flex items-center justify-around py-2">
          {mobileNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setLocation(item.path)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  item.current
                    ? "text-blue-400"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}