import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  User, 
  Heart, 
  Calendar,
  Phone,
  AlertTriangle,
  Activity,
  FileText,
  Settings,
  Edit,
  Baby,
  UserCheck
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
  bloodGroup?: string;
  emergencyContact?: string;
  allergies?: string[];
  chronicConditions?: string[];
  lastCheckup?: Date;
  healthStatus: 'good' | 'monitoring' | 'needs_attention';
}

export const FamilyHealth = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'प्रिया Kumar',
      relationship: 'Spouse',
      age: 26,
      gender: 'female',
      bloodGroup: 'A+',
      emergencyContact: '+91 98765 43210',
      allergies: ['Dust', 'Pollen'],
      chronicConditions: ['Asthma'],
      lastCheckup: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      healthStatus: 'monitoring'
    },
    {
      id: '2',
      name: 'आर्यन Kumar',
      relationship: 'Son',
      age: 3,
      gender: 'male',
      bloodGroup: 'O+',
      allergies: [],
      chronicConditions: [],
      lastCheckup: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      healthStatus: 'good'
    },
    {
      id: '3',
      name: 'राज Kumar Sr.',
      relationship: 'Father',
      age: 58,
      gender: 'male',
      bloodGroup: 'O+',
      emergencyContact: '+91 87654 32109',
      allergies: [],
      chronicConditions: ['Diabetes', 'Hypertension'],
      lastCheckup: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      healthStatus: 'needs_attention'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-health-success';
      case 'monitoring': return 'bg-health-warning';
      case 'needs_attention': return 'bg-health-emergency';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Good Health';
      case 'monitoring': return 'Monitoring';
      case 'needs_attention': return 'Needs Attention';
      default: return 'Unknown';
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case 'spouse':
      case 'wife':
      case 'husband':
        return <Heart className="w-4 h-4" />;
      case 'son':
      case 'daughter':
      case 'child':
        return <Baby className="w-4 h-4" />;
      case 'father':
      case 'mother':
      case 'parent':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const renderMemberCard = (member: FamilyMember) => (
    <Card 
      key={member.id} 
      className={`shadow-card-health hover:shadow-lg transition-all cursor-pointer ${
        selectedMember === member.id ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary/10">
                {member.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getRelationshipIcon(member.relationship)}
                {member.relationship} • Age {member.age}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className={`${getStatusColor(member.healthStatus)} text-white`}>
            {getStatusText(member.healthStatus)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Blood Group:</span>
            <p className="font-semibold">{member.bloodGroup || 'Unknown'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Last Checkup:</span>
            <p className="font-semibold">
              {member.lastCheckup 
                ? `${Math.floor((Date.now() - member.lastCheckup.getTime()) / (1000 * 60 * 60 * 24))} days ago`
                : 'Never'
              }
            </p>
          </div>
        </div>

        {member.chronicConditions && member.chronicConditions.length > 0 && (
          <div className="mt-4">
            <span className="text-sm text-muted-foreground">Conditions:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {member.chronicConditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedMember === member.id && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div className="grid grid-cols-1 gap-2 text-sm">
              {member.emergencyContact && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{member.emergencyContact}</span>
                </div>
              )}
              {member.allergies && member.allergies.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Allergies:</span>
                  <p className="text-health-emergency font-semibold">
                    {member.allergies.join(', ')}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                View Records
              </Button>
              <Button variant="health" size="sm" className="flex-1">
                <Activity className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderAddForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Add Family Member</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" />
            </div>
            <div>
              <Label>Relationship</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Select relationship</option>
                <option value="spouse">Spouse</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="brother">Brother</option>
                <option value="sister">Sister</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" placeholder="Age" />
            </div>
            <div>
              <Label>Gender</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label>Blood Group</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <Label>Emergency Contact</Label>
              <Input placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="health" className="flex-1">
              Add Member
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const familyStats = {
    total: familyMembers.length,
    needsAttention: familyMembers.filter(m => m.healthStatus === 'needs_attention').length,
    monitoring: familyMembers.filter(m => m.healthStatus === 'monitoring').length,
    overdue: familyMembers.filter(m => {
      if (!m.lastCheckup) return true;
      const daysSinceCheckup = (Date.now() - m.lastCheckup.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceCheckup > 180; // 6 months
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="px-6 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Family Health</h1>
          <p className="text-muted-foreground">
            Manage health records for your entire family
          </p>
        </div>

        {/* Family Health Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card-health">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{familyStats.total}</p>
              <p className="text-sm text-muted-foreground">Family Members</p>
            </CardContent>
          </Card>
          <Card className="shadow-card-health">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-health-emergency mx-auto mb-2" />
              <p className="text-2xl font-bold">{familyStats.needsAttention}</p>
              <p className="text-sm text-muted-foreground">Need Attention</p>
            </CardContent>
          </Card>
          <Card className="shadow-card-health">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-health-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">{familyStats.monitoring}</p>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </CardContent>
          </Card>
          <Card className="shadow-card-health">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-health-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">{familyStats.overdue}</p>
              <p className="text-sm text-muted-foreground">Checkup Overdue</p>
            </CardContent>
          </Card>
        </div>

        {/* Family Members */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Family Members</h2>
            <Button variant="health" onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyMembers.map(renderMemberCard)}
          </div>

          {familyMembers.length === 0 && (
            <Card className="shadow-card-health">
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No family members added</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your family members to manage their health records
                </p>
                <Button variant="health" onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Member
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Quick Family Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Schedule Checkups</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <FileText className="w-5 h-5" />
                <span className="text-sm">Family Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Health Reminders</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Settings className="w-5 h-5" />
                <span className="text-sm">Family Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Form Modal */}
        {showAddForm && renderAddForm()}
      </div>
    </div>
  );
};