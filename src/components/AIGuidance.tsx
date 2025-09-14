import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, MapPin, Clock, Stethoscope, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AIGuidance = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [userLocation] = useState("Kochi, Kerala"); // Mock location
  const { toast } = useToast();

  useEffect(() => {
    // Simulate AI analysis of user data
    const mockRecommendations = [
      {
        type: "clinic",
        priority: "high",
        title: "Blood Pressure Check Recommended",
        description: "Based on your recent readings, we recommend a check-up within 3 days",
        action: "Find Nearby Clinic",
        icon: <Stethoscope className="h-5 w-5" />,
        location: "Primary Health Center, Ernakulam - 1.2 km away"
      },
      {
        type: "medication",
        priority: "medium",
        title: "Medication Reminder",
        description: "Your diabetes medication schedule suggests an evening dose",
        action: "Set Reminder",
        icon: <Clock className="h-5 w-5" />,
        location: null
      },
      {
        type: "lifestyle",
        priority: "low",
        title: "Health Goal Progress",
        description: "You're 80% towards your weekly walking goal. Just 2km more!",
        action: "Track Activity",
        icon: <CheckCircle className="h-5 w-5" />,
        location: null
      },
      {
        type: "alert",
        priority: "high",
        title: "Weather Health Alert",
        description: "High pollution levels detected in your area. Consider wearing a mask",
        action: "View Details",
        icon: <AlertTriangle className="h-5 w-5" />,
        location: userLocation
      }
    ];
    setRecommendations(mockRecommendations);
  }, [userLocation]);

  const handleRecommendationAction = (recommendation: any) => {
    toast({
      title: "Action Taken",
      description: `${recommendation.action} for: ${recommendation.title}`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const insights = [
    {
      title: "Health Trend Analysis",
      value: "Improving",
      description: "Your blood pressure readings show a 15% improvement over the last month",
      trend: "up"
    },
    {
      title: "Risk Assessment",
      value: "Low Risk",
      description: "Based on your current health data and lifestyle factors",
      trend: "stable"
    },
    {
      title: "Medication Adherence",
      value: "92%",
      description: "Excellent adherence to your prescribed medication schedule",
      trend: "up"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Health Guidance</h1>
          <p className="text-muted-foreground">Personalized recommendations powered by your health data</p>
        </div>
      </div>

      {/* Health Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{insight.title}</p>
                <p className="text-2xl font-bold">{insight.value}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>
            Based on your health data, location, and daily patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {rec.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{rec.title}</h3>
                  <Badge variant={getPriorityColor(rec.priority)}>
                    {rec.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                {rec.location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {rec.location}
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRecommendationAction(rec)}
              >
                {rec.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Smart Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Health Scheduling</CardTitle>
          <CardDescription>
            AI-optimized scheduling based on your routine and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Optimal Clinic Visit Time</p>
                <p className="text-sm text-muted-foreground">Based on your work schedule and clinic availability</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Tuesday 2:00 PM</p>
                <p className="text-xs text-muted-foreground">Shortest wait time</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Medication Reminder</p>
                <p className="text-sm text-muted-foreground">Optimized for your daily routine</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">8:00 AM & 8:00 PM</p>
                <p className="text-xs text-muted-foreground">Best adherence times</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};