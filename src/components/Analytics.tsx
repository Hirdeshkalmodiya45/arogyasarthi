import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Heart, Target, Brain } from "lucide-react";

export const Analytics = () => {
  const [healthScore, setHealthScore] = useState(78);
  const [riskLevel, setRiskLevel] = useState("Low");
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    // Simulate predictive analytics
    setPredictions([
      {
        condition: "Hypertension Risk",
        probability: 35,
        trend: "increasing",
        recommendation: "Monitor blood pressure daily and reduce salt intake",
        priority: "medium"
      },
      {
        condition: "Diabetes Risk",
        probability: 15,
        trend: "stable",
        recommendation: "Continue current diet and exercise routine",
        priority: "low"
      },
      {
        condition: "Mental Health Alert",
        probability: 60,
        trend: "increasing",
        recommendation: "Consider stress management techniques or counseling",
        priority: "high"
      }
    ]);
  }, []);

  const vitalTrends = [
    { date: "Jan 1", bp_systolic: 120, bp_diastolic: 80, heart_rate: 72, weight: 70 },
    { date: "Jan 8", bp_systolic: 125, bp_diastolic: 82, heart_rate: 75, weight: 69.5 },
    { date: "Jan 15", bp_systolic: 128, bp_diastolic: 85, heart_rate: 78, weight: 69.8 },
    { date: "Jan 22", bp_systolic: 130, bp_diastolic: 88, heart_rate: 80, weight: 70.2 },
    { date: "Jan 29", bp_systolic: 132, bp_diastolic: 90, heart_rate: 82, weight: 70.5 }
  ];

  const healthMetrics = [
    {
      name: "Sleep Quality",
      score: 85,
      trend: "up",
      change: "+5%",
      target: 90
    },
    {
      name: "Physical Activity",
      score: 70,
      trend: "up",
      change: "+12%",
      target: 85
    },
    {
      name: "Nutrition Score",
      score: 60,
      trend: "down",
      change: "-3%",
      target: 80
    },
    {
      name: "Stress Level",
      score: 45,
      trend: "down",
      change: "-8%",
      target: 30
    }
  ];

  const riskFactors = [
    { name: "Sedentary Lifestyle", value: 30, color: "#ef4444" },
    { name: "Poor Diet", value: 25, color: "#f97316" },
    { name: "Stress", value: 20, color: "#eab308" },
    { name: "Sleep Issues", value: 15, color: "#06b6d4" },
    { name: "Other", value: 10, color: "#8b5cf6" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Health Analytics</h1>
          <p className="text-muted-foreground">AI-powered insights into your health patterns and predictions</p>
        </div>
      </div>

      {/* Health Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Score</p>
                <p className="text-2xl font-bold text-primary">{healthScore}/100</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <Progress value={healthScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-2xl font-bold text-green-500">{riskLevel}</p>
              </div>
              <Heart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trend</p>
                <p className="text-2xl font-bold text-green-500">Improving</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predictions</p>
                <p className="text-2xl font-bold text-orange-500">{predictions.length}</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Health Alerts</CardTitle>
              <CardDescription>
                AI analysis of your health patterns to predict potential health risks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="p-4 rounded-lg border space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <h3 className="font-semibold">{prediction.condition}</h3>
                        <p className="text-sm text-muted-foreground">
                          {prediction.probability}% probability in next 6 months
                        </p>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(prediction.priority)}>
                      {prediction.priority} priority
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Level</span>
                      <span>{prediction.probability}%</span>
                    </div>
                    <Progress value={prediction.probability} className="h-2" />
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{prediction.recommendation}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs Trends</CardTitle>
              <CardDescription>Track your health metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bp_systolic" stroke="#2563eb" strokeWidth={2} name="Systolic BP" />
                    <Line type="monotone" dataKey="bp_diastolic" stroke="#dc2626" strokeWidth={2} name="Diastolic BP" />
                    <Line type="monotone" dataKey="heart_rate" stroke="#16a34a" strokeWidth={2} name="Heart Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{metric.name}</h3>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Score</span>
                      <span>{metric.score}/{metric.target}</span>
                    </div>
                    <Progress value={(metric.score / metric.target) * 100} className="h-2" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Target: {metric.target}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Distribution</CardTitle>
                <CardDescription>Analysis of your current health risk factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskFactors}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {riskFactors.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preventive Actions</CardTitle>
                <CardDescription>Recommended actions to reduce health risks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border">
                    <h4 className="font-medium text-sm">Daily Exercise</h4>
                    <p className="text-xs text-muted-foreground">30 minutes of physical activity</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Risk Reduction: 25%</span>
                      <Button size="sm" variant="outline">Set Goal</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border">
                    <h4 className="font-medium text-sm">Stress Management</h4>
                    <p className="text-xs text-muted-foreground">Meditation or relaxation techniques</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Risk Reduction: 20%</span>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border">
                    <h4 className="font-medium text-sm">Regular Check-ups</h4>
                    <p className="text-xs text-muted-foreground">Monthly health screenings</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Risk Reduction: 30%</span>
                      <Button size="sm" variant="outline">Schedule</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};