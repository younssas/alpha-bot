import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, BookOpen, Ticket } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function CommunitySection() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleJoinDiscord = () => {
    setLocation('/community');
  };

  const handleOpenTicket = () => {
    toast({
      title: "Support Ticket",
      description: "Opening support ticket system...",
    });
    // In a real app, this would open a support ticket modal or redirect to support portal
  };

  const handleKnowledgeBase = () => {
    toast({
      title: "Knowledge Base",
      description: "Opening help documentation...",
    });
    // In a real app, this would open documentation or help system
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-50">Discord Community</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-300">1,247 active members</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-slate-300">Daily market analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-slate-300">EA setup guidance</span>
            </div>
          </div>
          <Button 
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
            onClick={handleJoinDiscord}
            size="sm"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Join Discord
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-[#1E293B] border-[#334155]">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-50">24/7 Support</h3>
          <p className="text-slate-400 text-sm mb-4">
            Get help with setup, troubleshooting, and trading strategies from our expert team.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button 
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              onClick={handleOpenTicket}
              size="sm"
            >
              <Ticket className="h-4 w-4 mr-2" />
              Open Ticket
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-[#0B1426] border-[#334155] hover:bg-slate-700 text-slate-50"
              onClick={handleKnowledgeBase}
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Knowledge Base
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
