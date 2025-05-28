import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useLocation } from "wouter";

interface ExpertAdvisor {
  id: number;
  name: string;
  description: string;
  status: string;
  totalProfit: string;
  winRate: string;
  totalTrades: number;
}

interface ExpertAdvisorsProps {
  expertAdvisors: ExpertAdvisor[];
}

export default function ExpertAdvisors({ expertAdvisors }: ExpertAdvisorsProps) {
  const [, setLocation] = useLocation();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/20">Active</Badge>;
      case "standby":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">Standby</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/20">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/20">{status}</Badge>;
    }
  };

  const handleAddEA = () => {
    setLocation('/expert-advisors');
  };

  return (
    <Card className="bg-[#1E293B] border-[#334155]">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h3 className="text-lg font-semibold text-slate-50">Expert Advisors</h3>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
            onClick={handleAddEA}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add EA
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {expertAdvisors.map((ea) => (
            <Card key={ea.id} className="bg-[#0B1426] border-[#334155]">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                  <h4 className="font-semibold text-slate-50">{ea.name}</h4>
                  {getStatusBadge(ea.status)}
                </div>
                <p className="text-slate-400 text-sm mb-4">{ea.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                  <div className="flex justify-between sm:block">
                    <span className="text-slate-400">Profit:</span>
                    <span className="text-green-500 font-medium sm:ml-2">
                      +${parseFloat(ea.totalProfit).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between sm:block">
                    <span className="text-slate-400">Win Rate:</span>
                    <span className="font-medium sm:ml-2 text-slate-50">{ea.winRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
