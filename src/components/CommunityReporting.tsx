import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, AlertTriangle, Droplets, Users, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CommunityReporting = () => {
  const [reportType, setReportType] = useState("health_issue");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const reportTypes = [
    { id: "health_issue", label: "Health Issue", icon: <AlertTriangle className="h-4 w-4" /> },
    { id: "water_quality", label: "Water Quality", icon: <Droplets className="h-4 w-4" /> },
    { id: "outbreak", label: "Disease Outbreak", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "facility", label: "Healthcare Facility", icon: <Users className="h-4 w-4" /> }
  ];

  const recentReports = [
    {
      id: 1,
      type: "outbreak",
      title: "Flu Cases Increasing",
      location: "Industrial Area, Kochi",
      description: "Multiple workers reporting flu symptoms in dormitory",
      status: "investigating",
      severity: "medium",
      reportedBy: "Anonymous",
      date: "2024-01-15",
      upvotes: 12
    },
    {
      id: 2,
      type: "water_quality",
      title: "Water Contamination",
      location: "Worker Colony, Ernakulam",
      description: "Water supply appears cloudy and has unusual taste",
      status: "resolved",
      severity: "high",
      reportedBy: "Community Member",
      date: "2024-01-14",
      upvotes: 25
    },
    {
      id: 3,
      type: "facility",
      title: "Clinic Closure",
      location: "Primary Health Center, Aluva",
      description: "Local clinic has been closed for maintenance since last week",
      status: "confirmed",
      severity: "low",
      reportedBy: "Health Worker",
      date: "2024-01-12",
      upvotes: 8
    }
  ];

  const healthAlerts = [
    {
      title: "Monsoon Health Advisory",
      description: "Increased risk of waterborne diseases. Ensure water purification.",
      severity: "medium",
      date: "2024-01-15",
      area: "Coastal Areas"
    },
    {
      title: "Air Quality Alert",
      description: "Poor air quality due to industrial emissions. Use masks outdoors.",
      severity: "high",
      date: "2024-01-14",
      area: "Industrial Districts"
    }
  ];

  const handleSubmitReport = () => {
    if (!reportType || !location || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Submitted",
      description: "Your anonymous report has been submitted to health authorities",
    });

    // Reset form
    setLocation("");
    setDescription("");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "investigating": return "default";
      case "confirmed": return "destructive";
      case "resolved": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Community Health Reporting</h1>
          <p className="text-muted-foreground">Report health issues and track community health trends</p>
        </div>
      </div>

      {/* Health Alerts */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            Active Health Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {healthAlerts.map((alert, index) => (
            <div key={index} className="p-3 rounded-lg border border-orange-200 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{alert.area}</span>
                    <Calendar className="h-3 w-3 ml-2" />
                    <span>{alert.date}</span>
                  </div>
                </div>
                <Badge variant={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="report" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="report">Report Issue</TabsTrigger>
          <TabsTrigger value="community">Community Reports</TabsTrigger>
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Anonymous Health Report</CardTitle>
              <CardDescription>
                Help keep your community healthy by reporting health issues. All reports are anonymous.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Report Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {reportTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={reportType === type.id ? "default" : "outline"}
                      className="h-16 flex flex-col gap-2"
                      onClick={() => setReportType(type.id)}
                    >
                      {type.icon}
                      <span className="text-xs">{type.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="e.g., Worker dormitory, Industrial area, Kochi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Provide general area information to help authorities respond
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the health issue, symptoms observed, or facility problems..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Provide as much detail as possible while maintaining anonymity
                </p>
              </div>

              {/* Privacy Notice */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Privacy & Anonymity</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Your identity will not be shared with anyone</li>
                  <li>• Reports are used only for public health purposes</li>
                  <li>• Location data helps authorities respond effectively</li>
                  <li>• All submissions are encrypted and secure</li>
                </ul>
              </div>

              <Button onClick={handleSubmitReport} className="w-full" size="lg">
                Submit Anonymous Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          {recentReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{report.location}</span>
                        <span>•</span>
                        <span>{report.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getSeverityColor(report.severity)}>
                        {report.severity}
                      </Badge>
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Reported by: {report.reportedBy}</span>
                      <span>Upvotes: {report.upvotes}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Upvote
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Info
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved Issues</p>
                    <p className="text-2xl font-bold">32</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">68% resolution rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Ongoing investigations</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Health Trend Analysis</CardTitle>
              <CardDescription>
                Community health patterns based on reported data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Respiratory Issues</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Trending upward in industrial areas</span>
                    <Badge variant="destructive">+15%</Badge>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Water Quality</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Improved after recent interventions</span>
                    <Badge variant="secondary">+25%</Badge>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Healthcare Access</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New mobile clinics showing positive impact</span>
                    <Badge variant="secondary">+30%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};