import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  TrendingUp,
  Shield,
  Target,
  DollarSign
} from "lucide-react";

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "AlphaBot Mastery: Complete Trading Automation",
      description: "Master the AlphaBot platform from setup to advanced strategies. Learn risk management, optimization, and prop firm strategies.",
      instructor: "Michael Torres",
      rating: 4.9,
      students: 2847,
      duration: "8.5 hours",
      lessons: 42,
      price: 199,
      originalPrice: 299,
      level: "Intermediate",
      category: "automation",
      image: "/course-alphabot.jpg",
      progress: 0,
      enrolled: false,
      highlights: [
        "Complete AlphaBot setup and configuration",
        "Advanced risk management techniques", 
        "Prop firm challenge strategies",
        "Portfolio optimization methods"
      ]
    },
    {
      id: 2,
      title: "Forex Trading Psychology & Mental Edge",
      description: "Develop the psychological skills needed for consistent trading success. Overcome emotional barriers and build discipline.",
      instructor: "Dr. Sarah Chen",
      rating: 4.8,
      students: 1923,
      duration: "6.2 hours",
      lessons: 28,
      price: 149,
      originalPrice: 249,
      level: "Beginner",
      category: "psychology",
      image: "/course-psychology.jpg",
      progress: 65,
      enrolled: true,
      highlights: [
        "Trading psychology fundamentals",
        "Emotional control techniques",
        "Building trading discipline",
        "Managing drawdowns mentally"
      ]
    },
    {
      id: 3,
      title: "Risk Management for Prop Firm Success",
      description: "Learn professional risk management strategies used by successful prop traders. Perfect for FTMO, MyForexFunds, and other firms.",
      instructor: "James Rodriguez",
      rating: 4.9,
      students: 3241,
      duration: "5.8 hours",
      lessons: 31,
      price: 179,
      originalPrice: 279,
      level: "Advanced",
      category: "risk-management",
      image: "/course-risk.jpg",
      progress: 20,
      enrolled: true,
      highlights: [
        "Prop firm specific strategies",
        "Position sizing calculations",
        "Drawdown management",
        "Real trading examples"
      ]
    },
    {
      id: 4,
      title: "Technical Analysis & Market Structure",
      description: "Master technical analysis, chart patterns, and market structure for better trading decisions and strategy development.",
      instructor: "Alexandra Kim",
      rating: 4.7,
      students: 1654,
      duration: "12.3 hours",
      lessons: 68,
      price: 229,
      originalPrice: 349,
      level: "Intermediate",
      category: "analysis",
      image: "/course-technical.jpg",
      progress: 0,
      enrolled: false,
      highlights: [
        "Advanced chart pattern recognition",
        "Market structure analysis",
        "Support and resistance levels",
        "Volume analysis techniques"
      ]
    },
    {
      id: 5,
      title: "Building Custom Trading Strategies",
      description: "Create, backtest, and optimize your own trading strategies. Learn to build robust systems for long-term success.",
      instructor: "Robert Martinez",
      rating: 4.8,
      students: 987,
      duration: "9.7 hours",
      lessons: 45,
      price: 249,
      originalPrice: 399,
      level: "Advanced",
      category: "strategy",
      image: "/course-strategy.jpg",
      progress: 0,
      enrolled: false,
      highlights: [
        "Strategy development process",
        "Backtesting methodologies", 
        "Optimization techniques",
        "Live implementation guide"
      ]
    },
    {
      id: 6,
      title: "AlphaBot API Integration & Customization",
      description: "Advanced course on integrating AlphaBot with external systems, custom indicators, and advanced automation setups.",
      instructor: "David Thompson",
      rating: 4.9,
      students: 567,
      duration: "7.1 hours",
      lessons: 38,
      price: 299,
      originalPrice: 449,
      level: "Expert",
      category: "automation",
      image: "/course-api.jpg",
      progress: 0,
      enrolled: false,
      highlights: [
        "API integration techniques",
        "Custom indicator development",
        "Advanced automation setups",
        "Multi-platform connectivity"
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen },
    { id: "automation", name: "Trading Automation", icon: TrendingUp },
    { id: "psychology", name: "Trading Psychology", icon: Shield },
    { id: "risk-management", name: "Risk Management", icon: Target },
    { id: "analysis", name: "Technical Analysis", icon: Award },
    { id: "strategy", name: "Strategy Building", icon: DollarSign }
  ];

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/20";
      case "Intermediate": return "bg-blue-500/20 text-blue-400 border-blue-500/20";
      case "Advanced": return "bg-orange-500/20 text-orange-400 border-orange-500/20";
      case "Expert": return "bg-red-500/20 text-red-400 border-red-500/20";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/20";
    }
  };

  const handleEnroll = (courseId: number) => {
    console.log(`Enrolling in course ${courseId}`);
    // In a real app, this would handle enrollment
  };

  const handleContinue = (courseId: number) => {
    console.log(`Continuing course ${courseId}`);
    // In a real app, this would navigate to the course content
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#0B1426] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Trading Courses</h1>
          <p className="text-slate-400 text-sm sm:text-base">Master trading with expert-led courses and hands-on training</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Users className="h-4 w-4" />
          <span>12,000+ Students Enrolled</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-[#1E293B] border-[#334155] text-slate-300 hover:bg-[#334155]"
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="bg-[#1E293B] border-[#334155] hover:border-[#475569] transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <Badge className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-slate-50 text-lg line-clamp-2">
                {course.title}
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Course Info */}
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress (if enrolled) */}
              {course.enrolled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-blue-400">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-300">What you'll learn:</h4>
                <ul className="space-y-1">
                  {course.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className="text-xs text-slate-400 flex items-start space-x-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <span>{course.instructor}</span>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-2 border-t border-[#334155]">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-slate-50">${course.price}</span>
                  <span className="text-sm text-slate-400 line-through">${course.originalPrice}</span>
                </div>
                {course.enrolled ? (
                  <Button 
                    onClick={() => handleContinue(course.id)}
                    className="bg-green-500 hover:bg-green-600"
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleEnroll(course.id)}
                    className="bg-blue-500 hover:bg-blue-600"
                    size="sm"
                  >
                    Enroll Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-[#1E293B] border-[#334155] text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">50+</div>
            <div className="text-sm text-slate-400">Expert Courses</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155] text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">12K+</div>
            <div className="text-sm text-slate-400">Active Students</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155] text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-400">4.8</div>
            <div className="text-sm text-slate-400">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1E293B] border-[#334155] text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-400">85%</div>
            <div className="text-sm text-slate-400">Success Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}