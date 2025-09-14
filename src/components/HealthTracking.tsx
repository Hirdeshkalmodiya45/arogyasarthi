import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Activity, 
  Heart, 
  Droplets, 
  Weight, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Edit,
  BarChart3
} from 'lucide-react';

interface HealthRecord {
  id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'weight' | 'temperature' | 'medication' | 'symptoms';
  value: string;
  unit: string;
  notes?: string;
  timestamp: Date;
  status?: 'normal' | 'warning' | 'critical';
}

export const HealthTracking = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: 'blood_pressure',
    value: '',
    notes: ''
  });

  // Mock data - in real app this would come from backend
  const [healthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      type: 'blood_pressure',
      value: '120/80',
      unit: 'mmHg',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'normal'
    },
    {
      id: '2',
      type: 'blood_sugar',
      value: '95',
      unit: 'mg/dL',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'normal',
      notes: 'Fasting glucose'
    },
    {
      id: '3',
      type: 'weight',
      value: '68',
      unit: 'kg',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'normal'
    },
    {
      id: '4',
      type: 'blood_pressure',
      value: '135/85',
      unit: 'mmHg',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: 'warning'
    }
  ]);

  const [medications] = useState([
    {
      id: '1',
      name: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      timeToTake: '09:00',
      lastTaken: new Date(Date.now() - 2 * 60 * 60 * 1000),
      nextDue: new Date(Date.now() + 22 * 60 * 60 * 1000),
      taken: true
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      timeToTake: '08:00, 20:00',
      lastTaken: new Date(Date.now() - 10 * 60 * 60 * 1000),
      nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000),
      taken: false
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4 text-health-success" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-health-warning" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-health-emergency" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-health-success';
      case 'warning': return 'bg-health-warning';
      case 'critical': return 'bg-health-emergency';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blood_pressure': return <Heart className="w-5 h-5" />;
      case 'blood_sugar': return <Droplets className="w-5 h-5" />;
      case 'weight': return <Weight className="w-5 h-5" />;
      case 'temperature': return <Activity className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const handleAddRecord = () => {
    console.log('Adding new health record:', newRecord);
    setShowAddForm(false);
    setNewRecord({ type: 'blood_pressure', value: '', notes: '' });
  };

  const getLatestReading = (type: string) => {
    return healthRecords
      .filter(record => record.type === type)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  };

  const renderOverview = () => {
    const bpReading = getLatestReading('blood_pressure');
    const sugarReading = getLatestReading('blood_sugar');
    const weightReading = getLatestReading('weight');

    const vitals = [
      {
        label: 'Blood Pressure',
        value: bpReading?.value || '--',
        unit: 'mmHg',
        status: bpReading?.status || 'normal',
        icon: Heart,
        trend: 'stable'
      },
      {
        label: 'Blood Sugar',
        value: sugarReading?.value || '--',
        unit: 'mg/dL',
        status: sugarReading?.status || 'normal',
        icon: Droplets,
        trend: 'down'
      },
      {
        label: 'Weight',
        value: weightReading?.value || '--',
        unit: 'kg',
        status: weightReading?.status || 'normal',
        icon: Weight,
        trend: 'stable'
      }
    ];

    return (
      <div className="space-y-6">
        {/* Vital Signs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vitals.map((vital) => (
            <Card key={vital.label} className="shadow-card-health">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <vital.icon className="w-8 h-8 text-primary" />
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(vital.status)}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{vital.value}</p>
                  <p className="text-sm text-muted-foreground">{vital.unit}</p>
                  <p className="text-sm font-medium">{vital.label}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {vital.trend === 'up' && <TrendingUp className="w-4 h-4 text-health-warning" />}
                  {vital.trend === 'down' && <TrendingDown className="w-4 h-4 text-health-success" />}
                  {vital.trend === 'stable' && <BarChart3 className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-xs text-muted-foreground capitalize">{vital.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Readings */}
        <Card className="shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Readings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthRecords.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(record.type)}
                    <div>
                      <div className="font-semibold capitalize">
                        {record.type.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {record.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{record.value} {record.unit}</span>
                      {getStatusIcon(record.status || 'normal')}
                    </div>
                    {record.notes && (
                      <div className="text-sm text-muted-foreground mt-1">{record.notes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setActiveTab('history')}
            >
              View All Records
            </Button>
          </CardContent>
        </Card>

        {/* Add Reading Button */}
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="fixed bottom-20 md:bottom-6 right-6 rounded-full w-14 h-14 shadow-health"
          variant="health"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    );
  };

  const renderMedications = () => (
    <div className="space-y-6">
      <Card className="shadow-card-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Today's Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    med.taken ? 'bg-health-success' : 'bg-muted'
                  }`}>
                    <Activity className={`w-6 h-6 ${med.taken ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <div className="font-semibold">{med.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {med.dosage} • {med.frequency}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Take at: {med.timeToTake}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={med.taken ? 'default' : 'secondary'}>
                    {med.taken ? 'Taken' : 'Pending'}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    Next: {med.nextDue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="health" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Medication
      </Button>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <Card className="shadow-card-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Health Records History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(record.type)}
                  <div>
                    <div className="font-semibold capitalize">
                      {record.type.replace('_', ' ')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {record.timestamp.toLocaleDateString()} at {record.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {record.notes && (
                      <div className="text-sm text-muted-foreground mt-1">{record.notes}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{record.value} {record.unit}</span>
                    {getStatusIcon(record.status || 'normal')}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-1">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAddForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Health Reading</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Type</Label>
            <select 
              className="w-full p-2 border rounded-md"
              value={newRecord.type}
              onChange={(e) => setNewRecord(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="blood_pressure">Blood Pressure</option>
              <option value="blood_sugar">Blood Sugar</option>
              <option value="weight">Weight</option>
              <option value="temperature">Temperature</option>
            </select>
          </div>
          
          <div>
            <Label>Value</Label>
            <Input
              value={newRecord.value}
              onChange={(e) => setNewRecord(prev => ({ ...prev, value: e.target.value }))}
              placeholder={newRecord.type === 'blood_pressure' ? '120/80' : 'Enter value'}
            />
          </div>

          <div>
            <Label>Notes (Optional)</Label>
            <Textarea
              value={newRecord.notes}
              onChange={(e) => setNewRecord(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddRecord} className="flex-1" variant="health">
              Add Reading
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'medications', label: 'Medications', icon: Heart },
    { id: 'history', label: 'History', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Health Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your vital signs and medication schedule
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'medications' && renderMedications()}
        {activeTab === 'history' && renderHistory()}

        {/* Add Form Modal */}
        {showAddForm && renderAddForm()}
      </div>
    </div>
  );
};