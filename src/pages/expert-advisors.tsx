import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Play, Pause, Settings, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ExpertAdvisors() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEA, setNewEA] = useState({ name: "", description: "", status: "inactive" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: expertAdvisors = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/expert-advisors"],
  });

  const addEAMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/expert-advisors", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expert-advisors"] });
      setIsAddDialogOpen(false);
      setNewEA({ name: "", description: "", status: "inactive" });
      toast({
        title: "Expert Advisor Added",
        description: "New EA has been successfully configured",
      });
    },
  });

  const updateEAMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) => 
      apiRequest(`/api/expert-advisors/${id}`, "PATCH", updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expert-advisors"] });
      toast({
        title: "Status Updated",
        description: "Expert Advisor status has been changed",
      });
    },
  });

  const handleAddEA = () => {
    if (!newEA.name || !newEA.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    addEAMutation.mutate(newEA);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateEAMutation.mutate({ id, updates: { status: newStatus } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/20"><Activity className="h-3 w-3 mr-1" />Active</Badge>;
      case "standby":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20"><Pause className="h-3 w-3 mr-1" />Standby</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/20">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/20">{status}</Badge>;
    }
  };

  const getStatusActions = (ea: any) => {
    const actions = [];
    
    if (ea.status === "inactive") {
      actions.push(
        <Button
          key="activate"
          size="sm"
          onClick={() => handleStatusChange(ea.id, "active")}
          className="bg-green-500 hover:bg-green-600"
          disabled={updateEAMutation.isPending}
        >
          <Play className="h-3 w-3 mr-1" />
          Start
        </Button>
      );
    }
    
    if (ea.status === "active") {
      actions.push(
        <Button
          key="standby"
          size="sm"
          variant="outline"
          onClick={() => handleStatusChange(ea.id, "standby")}
          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
          disabled={updateEAMutation.isPending}
        >
          <Pause className="h-3 w-3 mr-1" />
          Standby
        </Button>
      );
      actions.push(
        <Button
          key="stop"
          size="sm"
          variant="outline"
          onClick={() => handleStatusChange(ea.id, "inactive")}
          className="border-red-500 text-red-500 hover:bg-red-500/10"
          disabled={updateEAMutation.isPending}
        >
          Stop
        </Button>
      );
    }
    
    if (ea.status === "standby") {
      actions.push(
        <Button
          key="resume"
          size="sm"
          onClick={() => handleStatusChange(ea.id, "active")}
          className="bg-green-500 hover:bg-green-600"
          disabled={updateEAMutation.isPending}
        >
          <Play className="h-3 w-3 mr-1" />
          Resume
        </Button>
      );
      actions.push(
        <Button
          key="stop"
          size="sm"
          variant="outline"
          onClick={() => handleStatusChange(ea.id, "inactive")}
          className="border-red-500 text-red-500 hover:bg-red-500/10"
          disabled={updateEAMutation.isPending}
        >
          Stop
        </Button>
      );
    }
    
    return actions;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-[#0B1426] min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400">Loading Expert Advisors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#0B1426] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Expert Advisors</h1>
          <p className="text-slate-400 text-sm sm:text-base">Manage your automated trading strategies</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Expert Advisor
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E293B] border-[#334155] text-slate-50">
            <DialogHeader>
              <DialogTitle>Add New Expert Advisor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Name</label>
                <Input
                  value={newEA.name}
                  onChange={(e) => setNewEA({ ...newEA, name: e.target.value })}
                  className="bg-[#0B1426] border-[#334155] text-slate-50"
                  placeholder="Enter EA name"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Description</label>
                <Textarea
                  value={newEA.description}
                  onChange={(e) => setNewEA({ ...newEA, description: e.target.value })}
                  className="bg-[#0B1426] border-[#334155] text-slate-50"
                  placeholder="Describe the EA strategy"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Initial Status</label>
                <Select value={newEA.status} onValueChange={(value) => setNewEA({ ...newEA, status: value })}>
                  <SelectTrigger className="bg-[#0B1426] border-[#334155] text-slate-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-[#334155]">
                    <SelectItem value="inactive" className="text-slate-50">Inactive</SelectItem>
                    <SelectItem value="standby" className="text-slate-50">Standby</SelectItem>
                    <SelectItem value="active" className="text-slate-50">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddEA}
                  disabled={addEAMutation.isPending}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  {addEAMutation.isPending ? "Adding..." : "Add Expert Advisor"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1 border-[#334155] text-slate-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* EA Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertAdvisors.map((ea: any) => (
          <Card key={ea.id} className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-50">{ea.name}</h3>
                {getStatusBadge(ea.status)}
              </div>
              
              <p className="text-slate-400 text-sm mb-4">{ea.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Total Profit</span>
                    <span className="text-green-500 font-medium">
                      +${parseFloat(ea.totalProfit || "0").toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Win Rate</span>
                    <span className="text-slate-50 font-medium">{ea.winRate || "0"}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Total Trades</span>
                    <span className="text-slate-50 font-medium">{ea.totalTrades || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Performance</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {getStatusActions(ea)}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#334155] text-slate-400 hover:bg-slate-700"
                >
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {expertAdvisors.length === 0 && (
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-12 text-center">
            <div className="text-slate-400 mb-4">
              <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-slate-300">No Expert Advisors</h3>
              <p className="text-sm">Add your first Expert Advisor to start automated trading</p>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First EA
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Performance Summary */}
      {expertAdvisors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-50">{expertAdvisors.length}</div>
              <div className="text-slate-400 text-sm">Total EAs</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">
                {expertAdvisors.filter((ea: any) => ea.status === "active").length}
              </div>
              <div className="text-slate-400 text-sm">Active</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-500">
                {expertAdvisors.filter((ea: any) => ea.status === "standby").length}
              </div>
              <div className="text-slate-400 text-sm">Standby</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-slate-50">
                ${expertAdvisors.reduce((sum: number, ea: any) => sum + parseFloat(ea.totalProfit || "0"), 0).toLocaleString()}
              </div>
              <div className="text-slate-400 text-sm">Total Profit</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}