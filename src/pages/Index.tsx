import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Registration } from '@/components/Registration';
import { Dashboard } from '@/components/Dashboard';
import { HealthCard } from '@/components/HealthCard';
import { HealthTracking } from '@/components/HealthTracking';
import { MedicalRecords } from '@/components/MedicalRecords';
import { FamilyHealth } from '@/components/FamilyHealth';
import { EmergencyInfo } from '@/components/EmergencyInfo';
import { Navigation } from '@/components/Navigation';
import { ServicesHub } from '@/components/ServicesHub';
import { AIGuidance } from '@/components/AIGuidance';
import { Gamification } from '@/components/Gamification';
import { Community } from '@/components/Community';
import { Telemedicine } from '@/components/Telemedicine';
import { Analytics } from '@/components/Analytics';
import { CommunityReporting } from '@/components/CommunityReporting';
import { VoiceInterface } from '@/components/VoiceInterface';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    setShowWelcome(false);
    setShowRegistration(true);
  };

  const handleRegistrationComplete = (data: any) => {
    setUserData(data);
    setShowRegistration(false);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onLanguageSelect={handleLanguageSelect}
        onContinue={handleContinue}
      />
    );
  }

  if (showRegistration) {
    return (
      <Registration onComplete={handleRegistrationComplete} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      
      {/* Main Content */}
      <div className="md:ml-64 pb-16 md:pb-0">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'health-card' && <HealthCard userData={userData} />}
        {currentView === 'records' && <MedicalRecords />}
        {currentView === 'tracking' && <HealthTracking />}
        {currentView === 'family' && <FamilyHealth />}
        {currentView === 'emergency' && <EmergencyInfo />}
        {currentView === 'services' && <ServicesHub />}
        {currentView === 'ai-guidance' && <AIGuidance />}
        {currentView === 'rewards' && <Gamification />}
        {currentView === 'community' && <Community />}
        {currentView === 'telemedicine' && <Telemedicine />}
        {currentView === 'analytics' && <Analytics />}
        {currentView === 'reporting' && <CommunityReporting />}
        {currentView === 'voice' && <VoiceInterface />}
        {currentView === 'settings' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-muted-foreground">App settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
