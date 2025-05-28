export interface DashboardData {
  account: {
    id: number;
    name: string;
    broker: string;
    accountType: string;
    currentBalance: string;
    currency: string;
  };
  accounts: Array<{
    id: number;
    name: string;
    broker: string;
    accountType: string;
    currentBalance: string;
    currency: string;
    isActive: boolean;
  }>;
  recentTrades: Array<{
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
  }>;
  performance: Array<{
    date: string;
    balance: string;
    equity: string;
    drawdown: string;
    dailyPnl: string;
  }>;
  expertAdvisors: Array<{
    id: number;
    name: string;
    description: string;
    status: string;
    totalProfit: string;
    winRate: string;
    totalTrades: number;
  }>;
  metrics: {
    totalBalance: number;
    totalProfit: string;
    maxDrawdown: string;
    winRate: string;
    profitFactor: string;
    totalTrades: number;
    avgTrade: string;
    bestTrade: string;
    worstTrade: string;
  };
}
