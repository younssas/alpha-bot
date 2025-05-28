import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import TradingHistory from "@/pages/trading-history";
import ExpertAdvisors from "@/pages/expert-advisors";
import Community from "@/pages/community";
import Courses from "@/pages/courses";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout><Dashboard /></Layout>} />
      <Route path="/dashboard" component={() => <Layout><Dashboard /></Layout>} />
      <Route path="/history" component={() => <Layout><TradingHistory /></Layout>} />
      <Route path="/expert-advisors" component={() => <Layout><ExpertAdvisors /></Layout>} />
      <Route path="/community" component={() => <Layout><Community /></Layout>} />
      <Route path="/courses" component={() => <Layout><Courses /></Layout>} />
      <Route path="/settings" component={() => <Layout><Settings /></Layout>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-[#0B1426] text-slate-50">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
