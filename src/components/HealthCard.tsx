import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  QrCode, 
  Download, 
  Share2, 
  Phone, 
  MapPin,
  Heart,
  AlertTriangle,
  Calendar,
  Shield,
  Edit
} from 'lucide-react';

interface HealthCardProps {
  userData: any;
}

export const HealthCard = ({ userData }: HealthCardProps) => {
  const [showQR, setShowQR] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'detailed'>('card');

  const generateQRData = () => {
    return JSON.stringify({
      healthId: userData.healthId,
      name: userData.name,
      bloodGroup: userData.bloodGroup,
      emergencyContact: userData.emergencyContact,
      allergies: userData.allergies,
      chronicConditions: userData.chronicConditions,
      timestamp: Date.now()
    });
  };

  const handleDownload = () => {
    // Simulate PDF download
    console.log('Downloading health card PDF...');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Arogya Sarthi Health Card',
          text: `Health ID: ${userData.healthId}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const renderHealthCard = () => (
    <div className="space-y-6">
      {/* Digital Health Card */}
      <Card className="shadow-card-health overflow-hidden">
        <div className="bg-gradient-health text-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">Arogya Sarthi</h2>
              <p className="opacity-90">Digital Health Card</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <div className="text-sm font-semibold">Health ID</div>
                <div className="text-lg font-mono">{userData.healthId}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{userData.name}</h3>
              <p className="opacity-90">{userData.gender} • Age: {userData.age}</p>
              <p className="opacity-90">Blood Group: {userData.bloodGroup || 'Not specified'}</p>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <p className="text-sm opacity-90">Registration Date</p>
                <p className="font-semibold">
                  {new Date(userData.registrationDate).toLocaleDateString()}
                </p>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {userData.registrationType === 'abha' ? 'ABHA Verified' : 'Provisional ID'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
            <div className="text-sm">
              <p className="opacity-90">Emergency: {userData.emergencyContact}</p>
              <p className="opacity-90">Location: {userData.currentState}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQR(!showQR)}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
          </div>
        </div>

        {showQR && (
          <CardContent className="p-6 text-center">
            <div className="bg-white p-4 rounded-lg inline-block">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                  <p className="text-sm text-gray-600">QR Code</p>
                  <p className="text-xs text-gray-500">Scan for health info</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Healthcare providers can scan this QR code to access your essential health information
            </p>
          </CardContent>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="health" className="h-16 flex-col gap-2">
          <Download className="w-5 h-5" />
          <span className="text-sm">Download</span>
        </Button>
        <Button variant="secondary" className="h-16 flex-col gap-2" onClick={handleShare}>
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Share</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-2">
          <Edit className="w-5 h-5" />
          <span className="text-sm">Edit Info</span>
        </Button>
        <Button 
          variant={viewMode === 'detailed' ? 'default' : 'outline'} 
          className="h-16 flex-col gap-2"
          onClick={() => setViewMode(viewMode === 'card' ? 'detailed' : 'card')}
        >
          <User className="w-5 h-5" />
          <span className="text-sm">Details</span>
        </Button>
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="shadow-card-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <p className="font-semibold">{userData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Health ID</label>
              <p className="font-mono">{userData.healthId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Age</label>
              <p>{userData.age} years</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Gender</label>
              <p className="capitalize">{userData.gender}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
              <p>{userData.bloodGroup || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p>{userData.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Information */}
      <Card className="shadow-card-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-health-emergency" />
            Emergency Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
              <p className="font-semibold">{userData.emergencyContact}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Blood Type</label>
              <p className="font-semibold">{userData.bloodGroup || 'Unknown'}</p>
            </div>
            {userData.allergies && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Allergies</label>
                <p className="text-health-emergency font-semibold">{userData.allergies}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Conditions */}
      <Card className="shadow-card-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Health Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Chronic Conditions</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.chronicConditions?.length > 0 ? (
                  userData.chronicConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary">{condition}</Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">None reported</p>
                )}
              </div>
            </div>
            {userData.medications && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current Medications</label>
                <p className="mt-1">{userData.medications}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card className="shadow-card-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Current Address</label>
              <p>{userData.currentAddress}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Home State</label>
                <p>{userData.homeState}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current State</label>
                <p>{userData.currentState}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="shadow-card-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Healthcare Worker Access</span>
              <Badge variant={userData.healthWorkerAccess ? 'default' : 'secondary'}>
                {userData.healthWorkerAccess ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Anonymous Data Sharing</span>
              <Badge variant={userData.dataSharing ? 'default' : 'secondary'}>
                {userData.dataSharing ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Your Health Card</h1>
          <p className="text-muted-foreground">
            Digital health identification and emergency information
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            onClick={() => setViewMode('card')}
          >
            Card View
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            onClick={() => setViewMode('detailed')}
          >
            Detailed View
          </Button>
        </div>

        {/* Content */}
        {viewMode === 'card' ? renderHealthCard() : renderDetailedView()}
      </div>
    </div>
  );
};