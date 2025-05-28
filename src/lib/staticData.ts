// Static data for GitHub Pages deployment
export const dashboardData = {
  account: {
    id: 1,
    name: "FTMO Demo Account",
    broker: "FTMO",
    accountType: "Challenge",
    currentBalance: "102,450.00",
    currency: "USD"
  },
  accounts: [
    {
      id: 1,
      name: "FTMO Demo Account",
      broker: "FTMO",
      accountType: "Challenge",
      currentBalance: "102,450.00",
      currency: "USD",
      isActive: true
    },
    {
      id: 2,
      name: "Personal MT5",
      broker: "IC Markets",
      accountType: "Live",
      currentBalance: "25,680.00",
      currency: "USD",
      isActive: false
    }
  ],
  recentTrades: [
    {
      id: 1,
      symbol: "EURUSD",
      type: "BUY",
      volume: "0.50",
      openPrice: "1.08450",
      closePrice: "1.08720",
      profit: "135.00",
      openTime: "2024-01-15T14:23:00Z",
      closeTime: "2024-01-15T16:45:00Z",
      expertAdvisor: "AlphaBot Nexus"
    },
    {
      id: 2,
      symbol: "GBPUSD",
      type: "SELL",
      volume: "0.30",
      openPrice: "1.27340",
      closePrice: "1.26980",
      profit: "108.00",
      openTime: "2024-01-15T13:45:00Z",
      closeTime: "2024-01-15T15:12:00Z",
      expertAdvisor: "AlphaBot Nexus"
    },
    {
      id: 3,
      symbol: "USDJPY",
      type: "BUY",
      volume: "0.20",
      openPrice: "148.230",
      closePrice: "147.890",
      profit: "-68.00",
      openTime: "2024-01-15T12:18:00Z",
      closeTime: "2024-01-15T14:30:00Z",
      expertAdvisor: "AlphaBot Zero"
    }
  ],
  performance: [
    { date: "2024-01-01", balance: "100000.00", equity: "100000.00", drawdown: "0.00", dailyPnl: "0.00" },
    { date: "2024-01-02", balance: "100250.00", equity: "100250.00", drawdown: "0.00", dailyPnl: "250.00" },
    { date: "2024-01-03", balance: "100180.00", equity: "100180.00", drawdown: "70.00", dailyPnl: "-70.00" },
    { date: "2024-01-04", balance: "100520.00", equity: "100520.00", drawdown: "0.00", dailyPnl: "340.00" },
    { date: "2024-01-05", balance: "100890.00", equity: "100890.00", drawdown: "0.00", dailyPnl: "370.00" },
    { date: "2024-01-08", balance: "101200.00", equity: "101200.00", drawdown: "0.00", dailyPnl: "310.00" },
    { date: "2024-01-09", balance: "101050.00", equity: "101050.00", drawdown: "150.00", dailyPnl: "-150.00" },
    { date: "2024-01-10", balance: "101380.00", equity: "101380.00", drawdown: "0.00", dailyPnl: "330.00" },
    { date: "2024-01-11", balance: "101720.00", equity: "101720.00", drawdown: "0.00", dailyPnl: "340.00" },
    { date: "2024-01-12", balance: "102100.00", equity: "102100.00", drawdown: "0.00", dailyPnl: "380.00" },
    { date: "2024-01-15", balance: "102450.00", equity: "102450.00", drawdown: "0.00", dailyPnl: "350.00" }
  ],
  expertAdvisors: [
    {
      id: 1,
      name: "AlphaBot Nexus",
      description: "Professional prop firm passing EA with advanced risk management",
      status: "active",
      totalProfit: "45230.00",
      winRate: "82.3",
      totalTrades: 245
    },
    {
      id: 2,
      name: "AlphaBot Zero",
      description: "Conservative EA designed for personal capital preservation",
      status: "standby",
      totalProfit: "12890.00",
      winRate: "76.8",
      totalTrades: 156
    }
  ],
  metrics: {
    totalBalance: 102450,
    totalProfit: "+2450.00",
    maxDrawdown: "-1.2",
    winRate: "78.5%",
    profitFactor: "1.65",
    totalTrades: 45,
    avgTrade: "+54.44",
    bestTrade: "+280.00",
    worstTrade: "-125.00"
  }
};

export const allExpertAdvisors = dashboardData.expertAdvisors;

export const tradingHistory = [
  ...dashboardData.recentTrades,
  {
    id: 4,
    symbol: "AUDCAD",
    type: "BUY",
    volume: "0.40",
    openPrice: "0.91250",
    closePrice: "0.91580",
    profit: "132.00",
    openTime: "2024-01-14T09:15:00Z",
    closeTime: "2024-01-14T11:30:00Z",
    expertAdvisor: "AlphaBot Nexus"
  },
  {
    id: 5,
    symbol: "NZDUSD",
    type: "SELL",
    volume: "0.35",
    openPrice: "0.61450",
    closePrice: "0.61180",
    profit: "94.50",
    openTime: "2024-01-13T15:20:00Z",
    closeTime: "2024-01-13T17:45:00Z",
    expertAdvisor: "AlphaBot Zero"
  }
];