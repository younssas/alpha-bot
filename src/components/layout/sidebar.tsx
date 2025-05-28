import { Bot, ChartLine, History, Settings, Users, UserCircle, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

interface Account {
  id: number;
  name: string;
  broker: string;
  accountType: string;
  currentBalance: string;
  currency: string;
  isActive: boolean;
}

interface SidebarProps {
  accounts: Account[];
  activeAccount: Account;
  onAccountChange?: (accountId: string) => void;
}

export default function Sidebar({ accounts, activeAccount, onAccountChange }: SidebarProps) {
  const [location, setLocation] = useLocation();
  
  const formatBalance = (balance: string, currency: string) => {
    const amount = parseFloat(balance);
    return `${currency === "USD" ? "$" : currency}${amount.toLocaleString()}`;
  };

  const navigation = [
    { name: "Dashboard", icon: ChartLine, path: "/", current: location === "/" || location === "/dashboard" },
    { name: "Trading History", icon: History, path: "/history", current: location === "/history" },
    { name: "Expert Advisors", icon: Settings, path: "/expert-advisors", current: location === "/expert-advisors" },
    { name: "Community", icon: Users, path: "/community", current: location === "/community" },
    { name: "Courses", icon: BookOpen, path: "/courses", current: location === "/courses" },
    { name: "Account Settings", icon: UserCircle, path: "/settings", current: location === "/settings" },
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <aside className="w-64 bg-[#1E293B] border-r border-[#334155] flex-shrink-0 flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-50">AlphaBot</h1>
        </div>
        
        {/* Account Selector */}
        <div className="mb-6">
          <label className="text-sm text-slate-400 mb-2 block">Active Account</label>
          <Select 
            defaultValue={activeAccount.id.toString()}
            onValueChange={onAccountChange}
          >
            <SelectTrigger className="w-full bg-[#0B1426] border-[#334155] text-slate-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E293B] border-[#334155]">
              {accounts.map((account) => (
                <SelectItem 
                  key={account.id} 
                  value={account.id.toString()}
                  className="text-slate-50 focus:bg-[#334155]"
                >
                  {account.name} - {formatBalance(account.currentBalance, account.currency)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.current
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "hover:bg-slate-700/50 text-slate-300"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-[#334155]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">
            <span>JD</span>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-50">John Doe</div>
            <div className="text-xs text-slate-400">Pro Trader</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
