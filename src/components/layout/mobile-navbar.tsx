import { Bot, Menu, X, ChartLine, History, Settings, Users, UserCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Account {
  id: number;
  name: string;
  broker: string;
  accountType: string;
  currentBalance: string;
  currency: string;
  isActive: boolean;
}

interface MobileNavbarProps {
  accounts: Account[];
  activeAccount: Account;
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileNavbar({ accounts, activeAccount, isOpen, onToggle }: MobileNavbarProps) {
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
    onToggle();
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1E293B] border-b border-[#334155] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-50">AlphaBot</h1>
          </div>
          
          <Sheet open={isOpen} onOpenChange={onToggle}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-300 p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1E293B] border-[#334155] text-slate-50 w-80">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-slate-50 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span>AlphaBot</span>
                </SheetTitle>
              </SheetHeader>
              
              {/* Account Selector */}
              <div className="mb-6">
                <label className="text-sm text-slate-400 mb-2 block">Active Account</label>
                <Select defaultValue={activeAccount.id.toString()}>
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

              {/* Navigation */}
              <nav className="space-y-2 mb-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
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

              {/* User Profile */}
              <div className="border-t border-[#334155] pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">
                    <span>JD</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-50">John Doe</div>
                    <div className="text-xs text-slate-400">Pro Trader</div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Spacer for fixed header */}
      <div className="lg:hidden h-16" />
    </>
  );
}