import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Heart, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Shield,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface RegistrationProps {
  onComplete: (userData: any) => void;
}

export const Registration = ({ onComplete }: RegistrationProps) => {
  const [step, setStep] = useState(1);
  const [registrationType, setRegistrationType] = useState<'abha' | 'provisional'>('provisional');
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    emergencyContact: '',
    
    // Location
    currentAddress: '',
    homeState: '',
    currentState: 'Kerala',
    
    // Health Info
    allergies: '',
    chronicConditions: [],
    medications: '',
    insuranceStatus: 'ineligible',
    
    // ABHA Details
    abhaNumber: '',
    aadhaarNumber: '',
    
    // Family
    familyMembers: [],
    
    // Privacy
    dataSharing: false,
    healthWorkerAccess: true,
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const states = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'West Bengal', 'Bihar', 'Odisha', 'Jharkhand', 'Uttar Pradesh'];
  const commonConditions = ['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis'];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConditionToggle = (condition: string) => {
    const updated = formData.chronicConditions.includes(condition)
      ? formData.chronicConditions.filter(c => c !== condition)
      : [...formData.chronicConditions, condition];
    updateFormData('chronicConditions', updated);
  };

  const generateHealthId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `AHS-${timestamp}-${random}`;
  };

  const handleComplete = () => {
    const userData = {
      ...formData,
      healthId: registrationType === 'abha' ? formData.abhaNumber : generateHealthId(),
      registrationType,
      registrationDate: new Date().toISOString(),
    };
    onComplete(userData);
  };

  const renderStep1 = () => (
    <Card className="shadow-card-health">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Registration Type
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={registrationType} onValueChange={(value: 'abha' | 'provisional') => setRegistrationType(value)}>
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="abha" id="abha" />
            <div className="flex-1">
              <Label htmlFor="abha" className="font-semibold">ABHA Health ID</Label>
              <p className="text-sm text-muted-foreground">
                I have Ayushman Bharat Health Account (ABHA) number
              </p>
            </div>
            <Badge variant="secondary">Recommended</Badge>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="provisional" id="provisional" />
            <div className="flex-1">
              <Label htmlFor="provisional" className="font-semibold">Provisional Health ID</Label>
              <p className="text-sm text-muted-foreground">
                Create a temporary health ID that can be upgraded later
              </p>
            </div>
            <Badge variant="outline">Accessible</Badge>
          </div>
        </RadioGroup>

        {registrationType === 'abha' && (
          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <div>
              <Label htmlFor="abhaNumber">ABHA Number</Label>
              <Input
                id="abhaNumber"
                value={formData.abhaNumber}
                onChange={(e) => updateFormData('abhaNumber', e.target.value)}
                placeholder="XX-XXXX-XXXX-XXXX"
              />
            </div>
            <div>
              <Label htmlFor="aadhaar">Aadhaar Number (for verification)</Label>
              <Input
                id="aadhaar"
                value={formData.aadhaarNumber}
                onChange={(e) => updateFormData('aadhaarNumber', e.target.value)}
                placeholder="XXXX-XXXX-XXXX"
                type="password"
              />
            </div>
          </div>
        )}

        <Button onClick={() => setStep(2)} className="w-full" variant="health">
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="shadow-card-health">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => updateFormData('age', e.target.value)}
              placeholder="Age"
            />
          </div>
          <div>
            <Label>Gender *</Label>
            <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Blood Group</Label>
            <Select value={formData.bloodGroup} onValueChange={(value) => updateFormData('bloodGroup', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {bloodGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div>
            <Label htmlFor="emergency">Emergency Contact</Label>
            <Input
              id="emergency"
              value={formData.emergencyContact}
              onChange={(e) => updateFormData('emergencyContact', e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
          <Button onClick={() => setStep(3)} className="flex-1" variant="health">
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="shadow-card-health">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="currentAddress">Current Address in Kerala</Label>
          <Textarea
            id="currentAddress"
            value={formData.currentAddress}
            onChange={(e) => updateFormData('currentAddress', e.target.value)}
            placeholder="Enter your current address"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Home State</Label>
            <Select value={formData.homeState} onValueChange={(value) => updateFormData('homeState', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select home state" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Current State</Label>
            <Input value="Kerala" disabled />
          </div>
        </div>

        <div>
          <Label>Insurance Status</Label>
          <Select value={formData.insuranceStatus} onValueChange={(value) => updateFormData('insuranceStatus', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eligible">Eligible for State Insurance</SelectItem>
              <SelectItem value="ineligible">Currently Ineligible</SelectItem>
              <SelectItem value="unknown">Status Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
          <Button onClick={() => setStep(4)} className="flex-1" variant="health">
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="shadow-card-health">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Health Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Chronic Conditions</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {commonConditions.map(condition => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition}
                  checked={formData.chronicConditions.includes(condition)}
                  onCheckedChange={() => handleConditionToggle(condition)}
                />
                <Label htmlFor={condition} className="text-sm">{condition}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            value={formData.allergies}
            onChange={(e) => updateFormData('allergies', e.target.value)}
            placeholder="List any known allergies"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea
            id="medications"
            value={formData.medications}
            onChange={(e) => updateFormData('medications', e.target.value)}
            placeholder="List current medications and dosages"
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
          <Button onClick={() => setStep(5)} className="flex-1" variant="health">
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep5 = () => (
    <Card className="shadow-card-health">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Consent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="healthWorkerAccess"
              checked={formData.healthWorkerAccess}
              onCheckedChange={(checked) => updateFormData('healthWorkerAccess', checked)}
            />
            <div>
              <Label htmlFor="healthWorkerAccess" className="font-semibold">
                Healthcare Worker Access
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow authorized healthcare workers to access your health information during consultations
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="dataSharing"
              checked={formData.dataSharing}
              onCheckedChange={(checked) => updateFormData('dataSharing', checked)}
            />
            <div>
              <Label htmlFor="dataSharing" className="font-semibold">
                Anonymous Data Sharing
              </Label>
              <p className="text-sm text-muted-foreground">
                Share anonymized health data for public health research and disease surveillance
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Your Privacy Rights:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• You control who can access your health information</li>
            <li>• Your immigration status is not tracked or documented</li>
            <li>• You can withdraw consent at any time</li>
            <li>• All data is encrypted and securely stored</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStep(4)}>Back</Button>
          <Button onClick={handleComplete} className="flex-1" variant="health">
            Complete Registration <CheckCircle className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const steps = [
    { number: 1, title: 'Registration Type', component: renderStep1 },
    { number: 2, title: 'Personal Info', component: renderStep2 },
    { number: 3, title: 'Location', component: renderStep3 },
    { number: 4, title: 'Health Info', component: renderStep4 },
    { number: 5, title: 'Privacy', component: renderStep5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="px-6 py-8 max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === s.number ? 'bg-primary text-white' : 
                  step > s.number ? 'bg-health-success text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > s.number ? <CheckCircle className="w-4 h-4" /> : s.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${step > s.number ? 'bg-health-success' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-center">
            {steps[step - 1].title}
          </h2>
        </div>

        {/* Current Step */}
        {steps[step - 1].component()}
      </div>
    </div>
  );
};