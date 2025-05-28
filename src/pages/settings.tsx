import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Save, User, Bell, Shield, Database, Plus, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [userSettings, setUserSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    timezone: "UTC-5",
    notifications: {
      trades: true,
      profits: true,
      losses: true,
      weekly_reports: true,
      community: false,
    },
    risk: {
      max_drawdown: "5",
      max_daily_loss: "2",
      position_size: "0.01",
      stop_loss: "50",
    }
  });

  const [accounts, setAccounts] = useState([
    { id: 1, name: "FTMO Demo", broker: "FTMO", login: "12345678", server: "FTMO-Demo", connected: true },
    { id: 2, name: "Live Account", broker: "IC Markets", login: "87654321", server: "ICMarkets-Live01", connected: false },
  ]);

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: "", broker: "", login: "", password: "", server: "" });
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.broker || !newAccount.login) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const account = {
      id: accounts.length + 1,
      ...newAccount,
      connected: false,
    };
    
    setAccounts([...accounts, account]);
    setNewAccount({ name: "", broker: "", login: "", password: "", server: "" });
    setIsAddAccountOpen(false);
    
    toast({
      title: "Account Added",
      description: "New trading account has been configured",
    });
  };

  const handleConnectAccount = (accountId: number) => {
    setAccounts(accounts.map(acc => 
      acc.id === accountId ? { ...acc, connected: !acc.connected } : acc
    ));
    
    const account = accounts.find(acc => acc.id === accountId);
    toast({
      title: account?.connected ? "Account Disconnected" : "Account Connected",
      description: account?.connected ? "MetaTrader connection closed" : "Successfully connected to MetaTrader",
    });
  };

  const handleDeleteAccount = (accountId: number) => {
    setAccounts(accounts.filter(acc => acc.id !== accountId));
    toast({
      title: "Account Removed",
      description: "Trading account has been deleted",
    });
  };

  const updateNotification = (key: string, value: boolean) => {
    setUserSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const updateRiskSetting = (key: string, value: string) => {
    setUserSettings(prev => ({
      ...prev,
      risk: { ...prev.risk, [key]: value }
    }));
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#0B1426] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Account Settings</h1>
          <p className="text-slate-400 text-sm sm:text-base">Manage your profile, preferences, and trading accounts</p>
        </div>
        <Button 
          onClick={handleSaveSettings} 
          className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
          size="sm"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-slate-50">Profile Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400">Full Name</Label>
                    <Input
                      value={userSettings.name}
                      onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-[#0B1426] border-[#334155] text-slate-50"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400">Email Address</Label>
                    <Input
                      value={userSettings.email}
                      onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-[#0B1426] border-[#334155] text-slate-50"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-400">Timezone</Label>
                  <Select value={userSettings.timezone} onValueChange={(value) => setUserSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger className="bg-[#0B1426] border-[#334155] text-slate-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] border-[#334155]">
                      <SelectItem value="UTC-8" className="text-slate-50">UTC-8 (Pacific)</SelectItem>
                      <SelectItem value="UTC-5" className="text-slate-50">UTC-5 (Eastern)</SelectItem>
                      <SelectItem value="UTC+0" className="text-slate-50">UTC+0 (London)</SelectItem>
                      <SelectItem value="UTC+1" className="text-slate-50">UTC+1 (Central Europe)</SelectItem>
                      <SelectItem value="UTC+8" className="text-slate-50">UTC+8 (Asia)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Management */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-slate-50">Risk Management</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400">Max Drawdown (%)</Label>
                  <Input
                    type="number"
                    value={userSettings.risk.max_drawdown}
                    onChange={(e) => updateRiskSetting('max_drawdown', e.target.value)}
                    className="bg-[#0B1426] border-[#334155] text-slate-50"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Max Daily Loss (%)</Label>
                  <Input
                    type="number"
                    value={userSettings.risk.max_daily_loss}
                    onChange={(e) => updateRiskSetting('max_daily_loss', e.target.value)}
                    className="bg-[#0B1426] border-[#334155] text-slate-50"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Default Position Size</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={userSettings.risk.position_size}
                    onChange={(e) => updateRiskSetting('position_size', e.target.value)}
                    className="bg-[#0B1426] border-[#334155] text-slate-50"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Stop Loss (pips)</Label>
                  <Input
                    type="number"
                    value={userSettings.risk.stop_loss}
                    onChange={(e) => updateRiskSetting('stop_loss', e.target.value)}
                    className="bg-[#0B1426] border-[#334155] text-slate-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Accounts */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-slate-50">Trading Accounts</h3>
                </div>
                <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1E293B] border-[#334155] text-slate-50">
                    <DialogHeader>
                      <DialogTitle>Add Trading Account</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-400">Account Name</Label>
                        <Input
                          value={newAccount.name}
                          onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                          className="bg-[#0B1426] border-[#334155] text-slate-50"
                          placeholder="e.g., FTMO Challenge"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-400">Broker</Label>
                        <Select value={newAccount.broker} onValueChange={(value) => setNewAccount({ ...newAccount, broker: value })}>
                          <SelectTrigger className="bg-[#0B1426] border-[#334155] text-slate-50">
                            <SelectValue placeholder="Select broker" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1E293B] border-[#334155]">
                            <SelectItem value="FTMO" className="text-slate-50">FTMO</SelectItem>
                            <SelectItem value="IC Markets" className="text-slate-50">IC Markets</SelectItem>
                            <SelectItem value="Pepperstone" className="text-slate-50">Pepperstone</SelectItem>
                            <SelectItem value="XM" className="text-slate-50">XM</SelectItem>
                            <SelectItem value="Other" className="text-slate-50">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-400">Login</Label>
                          <Input
                            value={newAccount.login}
                            onChange={(e) => setNewAccount({ ...newAccount, login: e.target.value })}
                            className="bg-[#0B1426] border-[#334155] text-slate-50"
                            placeholder="MT4/MT5 Login"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-400">Password</Label>
                          <Input
                            type="password"
                            value={newAccount.password}
                            onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                            className="bg-[#0B1426] border-[#334155] text-slate-50"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-400">Server</Label>
                        <Input
                          value={newAccount.server}
                          onChange={(e) => setNewAccount({ ...newAccount, server: e.target.value })}
                          className="bg-[#0B1426] border-[#334155] text-slate-50"
                          placeholder="e.g., FTMO-Demo"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button onClick={handleAddAccount} className="flex-1 bg-green-500 hover:bg-green-600">
                          Add Account
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddAccountOpen(false)}
                          className="flex-1 border-[#334155] text-slate-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div key={account.id} className="bg-[#0B1426] border border-[#334155] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-slate-50">{account.name}</h4>
                          <Badge className={account.connected ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                            {account.connected ? "Connected" : "Disconnected"}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-400">
                          {account.broker} • Login: {account.login} • Server: {account.server}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={account.connected ? "outline" : "default"}
                          onClick={() => handleConnectAccount(account.id)}
                          className={account.connected ? 
                            "border-red-500 text-red-500 hover:bg-red-500/10" : 
                            "bg-green-500 hover:bg-green-600"
                          }
                        >
                          {account.connected ? "Disconnect" : "Connect"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAccount(account.id)}
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-slate-50">Notifications</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Trade Alerts</Label>
                  <Switch
                    checked={userSettings.notifications.trades}
                    onCheckedChange={(checked) => updateNotification('trades', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Profit Notifications</Label>
                  <Switch
                    checked={userSettings.notifications.profits}
                    onCheckedChange={(checked) => updateNotification('profits', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Loss Alerts</Label>
                  <Switch
                    checked={userSettings.notifications.losses}
                    onCheckedChange={(checked) => updateNotification('losses', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Weekly Reports</Label>
                  <Switch
                    checked={userSettings.notifications.weekly_reports}
                    onCheckedChange={(checked) => updateNotification('weekly_reports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Community Updates</Label>
                  <Switch
                    checked={userSettings.notifications.community}
                    onCheckedChange={(checked) => updateNotification('community', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold text-slate-50">Security</h3>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full border-[#334155] text-slate-50">
                  Enable 2FA
                </Button>
                <Separator className="bg-[#334155]" />
                <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-50">Pro Subscription</h3>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-slate-400">
                  Active until: Dec 31, 2024
                </div>
                <div className="text-sm text-slate-300">
                  ✓ Unlimited accounts<br/>
                  ✓ Advanced analytics<br/>
                  ✓ Priority support<br/>
                  ✓ Discord access
                </div>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Manage Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}