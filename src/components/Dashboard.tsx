import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  Phone, 
  Activity,
  Pill,
  User,
  Shield,
  Plus
} from 'lucide-react';

export const Dashboard = () => {
  const healthStats = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Activity },
    { label: 'Blood Sugar', value: '95 mg/dL', status: 'normal', icon: Heart },
    { label: 'Last Checkup', value: '2 weeks ago', status: 'recent', icon: Calendar },
    { label: 'Medications', value: '2 active', status: 'active', icon: Pill },
  ];

  const quickActions = [
    { label: 'View Health Card', icon: User, variant: 'default' as const },
    { label: 'Add Record', icon: Plus, variant: 'health' as const },
    { label: 'Emergency Info', icon: AlertTriangle, variant: 'emergency' as const },
    { label: 'Find Healthcare', icon: Phone, variant: 'success' as const },
  ];

  const recentActivity = [
    { type: 'checkup', title: 'General Health Checkup', date: '2 weeks ago', provider: 'Community Health Center' },
    { type: 'medication', title: 'Blood Pressure Medication', date: '1 month ago', provider: 'Dr. Sharma' },
    { type: 'vaccination', title: 'COVID-19 Booster', date: '3 months ago', provider: 'Vaccination Center' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-health-success';
      case 'warning': return 'bg-health-warning';
      case 'emergency': return 'bg-health-emergency';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome, राज Kumar</h1>
              <p className="opacity-90">Health ID: AHS-2024-789456</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">Active</Badge>
              <p className="text-sm opacity-90">Kerala, India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Health Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {healthStats.map((stat, index) => (
            <Card key={index} className="shadow-card-health">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(stat.status)}`} />
                </div>
                <div className="text-lg font-semibold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  className="h-20 flex-col gap-2"
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Card Preview */}
        <Card className="mb-8 shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Your Health Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-health text-white rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">राज Kumar</h3>
                  <p className="opacity-90">Male • Age: 28 • Blood Type: O+</p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded px-3 py-1">
                    <div className="text-sm font-semibold">Health ID</div>
                    <div className="text-lg">AHS-789456</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm opacity-90">
                  Emergency Contact: +91 98765 43210
                </div>
                <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  View Full Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Health Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.provider}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};