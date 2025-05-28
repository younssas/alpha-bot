import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Users, Trophy, Share2, ThumbsUp, MessageCircle, ExternalLink, Crown, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Community() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", profit: "", timeframe: "" });
  const { toast } = useToast();

  // Mock community data
  const communityStats = {
    totalMembers: 1247,
    activeToday: 89,
    totalPosts: 2345,
    avgMonthlyProfit: 12.5
  };

  const featuredPosts = [
    {
      id: 1,
      author: "TraderPro_Mike",
      title: "FTMO Challenge Passed with AlphaBot Nexus",
      content: "Just passed my $200k FTMO challenge in 4 days using the AlphaBot Nexus with custom settings. Sharing my configuration and results!",
      profit: "+$23,450",
      timeframe: "4 days",
      likes: 156,
      comments: 34,
      timestamp: "2 hours ago",
      badge: "Pro Trader",
      verified: true
    },
    {
      id: 2,
      author: "Sarah_FX",
      title: "Consistent 15% Monthly Returns",
      content: "Been using AlphaBot Zero for personal capital management. Here's my 6-month track record and the settings that work best for conservative growth.",
      profit: "+$8,920",
      timeframe: "6 months",
      likes: 92,
      comments: 18,
      timestamp: "5 hours ago",
      badge: "Verified",
      verified: true
    },
    {
      id: 3,
      author: "CryptoKing_2024",
      title: "Multi-Account Strategy Success",
      content: "Running 8 prop firm accounts simultaneously. Sharing my risk management approach and portfolio diversification strategy.",
      profit: "+$45,670",
      timeframe: "3 months",
      likes: 203,
      comments: 67,
      timestamp: "1 day ago",
      badge: "Elite",
      verified: false
    }
  ];

  const leaderboard = [
    { rank: 1, username: "AlphaTrader_X", profit: "$89,234", winRate: "94.2%", badge: "Legend" },
    { rank: 2, username: "FX_Master_Pro", profit: "$76,890", winRate: "91.8%", badge: "Pro" },
    { rank: 3, username: "RiskManager_AI", profit: "$65,432", winRate: "89.5%", badge: "Expert" },
    { rank: 4, username: "SwingKing_2024", profit: "$58,901", winRate: "87.3%", badge: "Pro" },
    { rank: 5, username: "ScalpMaster", profit: "$52,167", winRate: "85.9%", badge: "Advanced" }
  ];

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/zenbot", "_blank");
    toast({
      title: "Joining Discord",
      description: "Opening Discord server in a new tab",
    });
  };

  const handleShareResults = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }
    
    // Mock sharing functionality
    toast({
      title: "Results Shared!",
      description: "Your trading results have been posted to the community",
    });
    setIsShareDialogOpen(false);
    setNewPost({ title: "", content: "", profit: "", timeframe: "" });
  };

  const handleLike = (postId: number) => {
    toast({
      title: "Liked!",
      description: "You liked this post",
    });
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Legend": return "bg-purple-500/20 text-purple-400 border-purple-500/20";
      case "Pro Trader": return "bg-blue-500/20 text-blue-400 border-blue-500/20";
      case "Elite": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
      case "Expert": return "bg-green-500/20 text-green-400 border-green-500/20";
      case "Advanced": return "bg-orange-500/20 text-orange-400 border-orange-500/20";
      case "Verified": return "bg-green-500/20 text-green-400 border-green-500/20";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#0B1426] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Community</h1>
          <p className="text-slate-400 text-sm sm:text-base">Connect with traders, share results, and learn strategies</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button onClick={handleJoinDiscord} className="bg-indigo-600 hover:bg-indigo-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Join Discord
          </Button>
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1E293B] border-[#334155] text-slate-50">
              <DialogHeader>
                <DialogTitle>Share Your Trading Results</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Title</label>
                  <Input
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="bg-[#0B1426] border-[#334155] text-slate-50"
                    placeholder="e.g., FTMO Challenge Passed!"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Content</label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="bg-[#0B1426] border-[#334155] text-slate-50"
                    placeholder="Share your strategy, settings, and experience..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Profit (optional)</label>
                    <Input
                      value={newPost.profit}
                      onChange={(e) => setNewPost({ ...newPost, profit: e.target.value })}
                      className="bg-[#0B1426] border-[#334155] text-slate-50"
                      placeholder="e.g., +$5,000"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Timeframe (optional)</label>
                    <Input
                      value={newPost.timeframe}
                      onChange={(e) => setNewPost({ ...newPost, timeframe: e.target.value })}
                      className="bg-[#0B1426] border-[#334155] text-slate-50"
                      placeholder="e.g., 2 weeks"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={handleShareResults}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    Share Results
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsShareDialogOpen(false)}
                    className="flex-1 border-[#334155] text-slate-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-slate-50">{communityStats.totalMembers.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Total Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-2xl font-bold text-green-500">{communityStats.activeToday}</div>
                <div className="text-slate-400 text-sm">Active Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-slate-50">{communityStats.totalPosts.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Community Posts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-500">+{communityStats.avgMonthlyProfit}%</div>
                <div className="text-slate-400 text-sm">Avg Monthly Profit</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Posts */}
        <div className="lg:col-span-2">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6 text-slate-50">Featured Community Posts</h3>
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="border-b border-[#334155] pb-6 last:border-b-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                        {post.author[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-slate-50">{post.author}</span>
                          {post.verified && <Star className="h-4 w-4 text-yellow-500" />}
                          <Badge className={getBadgeColor(post.badge)}>{post.badge}</Badge>
                        </div>
                        <span className="text-slate-400 text-sm">{post.timestamp}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-slate-50 mb-2">{post.title}</h4>
                    <p className="text-slate-300 text-sm mb-4">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-green-500 font-medium">{post.profit}</div>
                        <div className="text-slate-400 text-sm">in {post.timeframe}</div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </div>
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
          {/* Leaderboard */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-50 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Monthly Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((trader) => (
                  <div key={trader.rank} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      trader.rank === 1 ? "bg-yellow-500 text-black" :
                      trader.rank === 2 ? "bg-gray-400 text-black" :
                      trader.rank === 3 ? "bg-amber-600 text-black" :
                      "bg-slate-600 text-slate-300"
                    }`}>
                      {trader.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-50 text-sm font-medium">{trader.username}</span>
                        {trader.rank <= 3 && <Crown className="h-3 w-3 text-yellow-500" />}
                      </div>
                      <div className="text-slate-400 text-xs">{trader.profit} • {trader.winRate} WR</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discord Integration */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-50">Discord Community</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-300">Daily market analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Live trading signals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-slate-300">EA setup guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-slate-300">24/7 support</span>
                </div>
              </div>
              <Button onClick={handleJoinDiscord} className="w-full bg-indigo-600 hover:bg-indigo-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Discord Server
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-50">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#334155] text-slate-50 hover:bg-slate-700"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Strategy
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#334155] text-slate-50 hover:bg-slate-700"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Find Trading Partner
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#334155] text-slate-50 hover:bg-slate-700"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Join Contest
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}