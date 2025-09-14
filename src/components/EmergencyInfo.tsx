import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Heart, 
  Pill, 
  User,
  Hospital,
  Clock,
  Copy,
  Share2,
  Edit,
  Shield,
  Info
} from 'lucide-react';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export const EmergencyInfo = () => {
  const [userData] = useState({
    name: 'राज Kumar',
    age: 28,
    gender: 'Male',
    bloodGroup: 'O+',
    healthId: 'AHS-789456',
    phone: '+91 98765 43210',
    currentAddress: 'Room 12, Workers Quarters, Industrial Area, Kochi, Kerala 682030',
    emergencyContacts: [
      {
        name: 'प्रिया Kumar',
        relationship: 'Spouse',
        phone: '+91 98765 43211',
        isPrimary: true
      },
      {
        name: 'राज Kumar Sr.',
        relationship: 'Father',
        phone: '+91 87654 32109',
        isPrimary: false
      }
    ] as EmergencyContact[],
    allergies: ['Penicillin', 'Dust'],
    chronicConditions: ['Hypertension'],
    currentMedications: ['Amlodipine 5mg - Once daily'],
    insuranceStatus: 'Currently Ineligible',
    preferredLanguage: 'Hindi'
  });

  const [nearbyFacilities] = useState([
    {
      name: 'Government General Hospital',
      type: 'Public Hospital',
      distance: '2.3 km',
      phone: '+91 484 2361234',
      emergency: true,
      address: 'Ernakulam, Kochi'
    },
    {
      name: 'Community Health Center',
      type: 'Primary Health Center',
      distance: '0.8 km',
      phone: '+91 484 2345678',
      emergency: false,
      address: 'Industrial Area, Kochi'
    },
    {
      name: 'MedPlus Pharmacy',
      type: 'Pharmacy',
      distance: '0.5 km',
      phone: '+91 484 2987654',
      emergency: false,
      address: 'Main Road, Kochi'
    }
  ]);

  const emergencyNumbers = [
    { service: 'Ambulance', number: '108', description: 'Free emergency medical service' },
    { service: 'Police', number: '100', description: 'Emergency police assistance' },
    { service: 'Fire Service', number: '101', description: 'Fire emergency service' },
    { service: 'Women Helpline', number: '1091', description: '24x7 women in distress' },
    { service: 'Disaster Management', number: '1070', description: 'Natural disaster helpline' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  const shareEmergencyInfo = async () => {
    const emergencyText = `EMERGENCY CONTACT INFO
Name: ${userData.name}
Health ID: ${userData.healthId}
Blood Group: ${userData.bloodGroup}
Emergency Contact: ${userData.emergencyContacts[0]?.phone}
Allergies: ${userData.allergies.join(', ')}
Location: ${userData.currentAddress}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Emergency Health Information',
          text: emergencyText
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard(emergencyText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-health-emergency" />
            <h1 className="text-2xl font-bold">Emergency Information</h1>
          </div>
          <p className="text-muted-foreground">
            Critical health information for emergency situations
          </p>
        </div>

        {/* Emergency Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Button variant="emergency" className="h-16 flex-col gap-2">
            <Phone className="w-6 h-6" />
            <span className="text-sm">Call 108</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2" onClick={shareEmergencyInfo}>
            <Share2 className="w-6 h-6" />
            <span className="text-sm">Share Info</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2">
            <MapPin className="w-6 h-6" />
            <span className="text-sm">Find Hospital</span>
          </Button>
        </div>

        {/* Critical Information Card */}
        <Card className="mb-8 shadow-card-health border-health-emergency">
          <CardHeader className="bg-health-emergency text-white">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              CRITICAL EMERGENCY INFORMATION
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-health-emergency">PATIENT NAME</label>
                  <p className="text-xl font-bold">{userData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-health-emergency">HEALTH ID</label>
                  <p className="text-lg font-mono font-bold">{userData.healthId}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm font-semibold text-health-emergency">BLOOD GROUP</label>
                    <p className="text-2xl font-bold text-health-emergency">{userData.bloodGroup}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-health-emergency">AGE</label>
                    <p className="text-xl font-bold">{userData.age}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-health-emergency">EMERGENCY CONTACT</label>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold">{userData.emergencyContacts[0]?.phone}</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(userData.emergencyContacts[0]?.phone)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{userData.emergencyContacts[0]?.name} ({userData.emergencyContacts[0]?.relationship})</p>
                </div>
                
                {userData.allergies.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-health-emergency">⚠️ ALLERGIES</label>
                    <p className="text-lg font-bold text-health-emergency">
                      {userData.allergies.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-health-emergency/10 rounded-lg">
              <p className="text-sm">
                <strong>Language:</strong> {userData.preferredLanguage} • 
                <strong> Insurance:</strong> {userData.insuranceStatus}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card-health">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Medical Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Chronic Conditions</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.chronicConditions.length > 0 ? (
                      userData.chronicConditions.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="bg-health-warning text-white">
                          {condition}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">None</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Known Allergies</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.allergies.length > 0 ? (
                      userData.allergies.map((allergy, index) => (
                        <Badge key={index} variant="secondary" className="bg-health-emergency text-white">
                          ⚠️ {allergy}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">None known</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-health">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userData.currentMedications.length > 0 ? (
                  userData.currentMedications.map((medication, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Pill className="w-4 h-4 text-primary" />
                      <span className="text-sm">{medication}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No current medications</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-8 shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{contact.name}</h4>
                      {contact.isPrimary && (
                        <Badge variant="default">Primary</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-semibold">{contact.phone}</p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(contact.phone)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Numbers */}
        <Card className="mb-8 shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Helplines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyNumbers.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{service.service}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-health-emergency">{service.number}</p>
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Healthcare Facilities */}
        <Card className="shadow-card-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hospital className="w-5 h-5" />
              Nearby Healthcare Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyFacilities.map((facility, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${facility.emergency ? 'bg-health-emergency' : 'bg-primary'}`} />
                    <div>
                      <h4 className="font-semibold">{facility.name}</h4>
                      <p className="text-sm text-muted-foreground">{facility.type} • {facility.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{facility.distance}</p>
                    <p className="text-sm text-muted-foreground">{facility.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Button */}
        <div className="mt-8 text-center">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Update Emergency Information
          </Button>
        </div>
      </div>
    </div>
  );
};