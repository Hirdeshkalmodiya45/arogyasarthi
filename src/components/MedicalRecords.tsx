import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Calendar,
  MapPin,
  User,
  Stethoscope,
  Pill,
  TestTube,
  Image,
  Plus,
  Search,
  Filter,
  Share2
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  type: 'consultation' | 'prescription' | 'lab_result' | 'vaccination' | 'imaging' | 'surgery';
  title: string;
  provider: string;
  date: Date;
  location: string;
  description: string;
  attachments?: string[];
  status: 'active' | 'completed' | 'pending';
  tags: string[];
}

export const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const [records] = useState<MedicalRecord[]>([
    {
      id: '1',
      type: 'consultation',
      title: 'General Health Checkup',
      provider: 'Dr. Priya Sharma, MBBS',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      location: 'Community Health Center, Kochi',
      description: 'Routine health checkup. Blood pressure slightly elevated. Recommended dietary changes and regular exercise.',
      status: 'completed',
      tags: ['routine', 'hypertension', 'preventive']
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Hypertension Medication',
      provider: 'Dr. Priya Sharma, MBBS',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      location: 'Community Health Center, Kochi',
      description: 'Amlodipine 5mg once daily. Take in the morning with food. Monitor blood pressure weekly.',
      status: 'active',
      tags: ['medication', 'hypertension']
    },
    {
      id: '3',
      type: 'lab_result',
      title: 'Complete Blood Count',
      provider: 'MedLab Diagnostics',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      location: 'MedLab, Ernakulam',
      description: 'All parameters within normal range. Hemoglobin: 13.2 g/dL, WBC: 7200/μL, Platelets: 280,000/μL',
      status: 'completed',
      tags: ['blood_test', 'normal']
    },
    {
      id: '4',
      type: 'vaccination',
      title: 'COVID-19 Booster Shot',
      provider: 'Kerala State Vaccination Center',
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      location: 'Primary Health Center, Thrissur',
      description: 'Covishield booster dose administered. No adverse reactions reported.',
      status: 'completed',
      tags: ['vaccination', 'covid19', 'booster']
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <Stethoscope className="w-5 h-5" />;
      case 'prescription': return <Pill className="w-5 h-5" />;
      case 'lab_result': return <TestTube className="w-5 h-5" />;
      case 'vaccination': return <FileText className="w-5 h-5" />;
      case 'imaging': return <Image className="w-5 h-5" />;
      case 'surgery': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary';
      case 'completed': return 'bg-health-success';
      case 'pending': return 'bg-health-warning';
      default: return 'bg-muted';
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || record.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const recordTypes = [
    { id: 'all', label: 'All Records', icon: FileText },
    { id: 'consultation', label: 'Consultations', icon: Stethoscope },
    { id: 'prescription', label: 'Prescriptions', icon: Pill },
    { id: 'lab_result', label: 'Lab Results', icon: TestTube },
    { id: 'vaccination', label: 'Vaccinations', icon: FileText },
  ];

  const renderRecordCard = (record: MedicalRecord) => (
    <Card key={record.id} className="shadow-card-health hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {getTypeIcon(record.type)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{record.title}</h3>
              <p className="text-muted-foreground">{record.provider}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className={`${getStatusColor(record.status)} text-white`}>
              {record.status}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              {record.date.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {record.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {record.date.toLocaleDateString()} at {record.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <p className="text-sm mb-4 line-clamp-2">{record.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {record.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedRecord(record)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderRecordDetail = () => {
    if (!selectedRecord) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getTypeIcon(selectedRecord.type)}
              {selectedRecord.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Provider</Label>
                <p className="font-semibold">{selectedRecord.provider}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                <p>{selectedRecord.date.toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                <p>{selectedRecord.location}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <Badge variant="secondary" className={`${getStatusColor(selectedRecord.status)} text-white`}>
                  {selectedRecord.status}
                </Badge>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Description</Label>
              <p className="mt-2 p-4 bg-muted rounded-lg">{selectedRecord.description}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedRecord.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedRecord(null)} className="flex-1">
                Close
              </Button>
              <Button variant="health" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAddForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Add Medical Record</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Record Type</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="consultation">Consultation</option>
                <option value="prescription">Prescription</option>
                <option value="lab_result">Lab Result</option>
                <option value="vaccination">Vaccination</option>
                <option value="imaging">Imaging</option>
              </select>
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div className="md:col-span-2">
              <Label>Title</Label>
              <Input placeholder="Enter record title" />
            </div>
            <div>
              <Label>Healthcare Provider</Label>
              <Input placeholder="Doctor/Clinic name" />
            </div>
            <div>
              <Label>Location</Label>
              <Input placeholder="Clinic/Hospital location" />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea placeholder="Detailed description..." rows={4} />
            </div>
            <div className="md:col-span-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Click to upload files or drag and drop</p>
                <p className="text-sm text-muted-foreground">PDF, images, documents</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="health" className="flex-1">
              Save Record
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="px-6 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Medical Records</h1>
          <p className="text-muted-foreground">
            Your complete medical history in one secure place
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 shadow-card-health">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search medical records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="health" onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {recordTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeTab === type.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(type.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </Button>
          ))}
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecords.map(renderRecordCard)}
        </div>

        {filteredRecords.length === 0 && (
          <Card className="shadow-card-health">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No records found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first medical record'}
              </p>
              <Button variant="health" onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Record
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        {selectedRecord && renderRecordDetail()}
        {showAddForm && renderAddForm()}
      </div>
    </div>
  );
};