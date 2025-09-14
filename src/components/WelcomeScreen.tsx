import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Heart, Shield, Users } from 'lucide-react';
import heroImage from '@/assets/hero-health.jpg';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

interface WelcomeScreenProps {
  onLanguageSelect: (language: string) => void;
  onContinue: () => void;
}

export const WelcomeScreen = ({ onLanguageSelect, onContinue }: WelcomeScreenProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageSelect(languageCode);
  };

  const features = [
    {
      icon: Heart,
      title: 'Personal Health Records',
      description: 'Secure digital storage of your medical history',
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your data is safe and fully under your control',
    },
    {
      icon: Users,
      title: 'Family Health',
      description: 'Manage health records for your entire family',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Available in your preferred language',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Arogya Sarthi
          </h1>
          <p className="text-xl mb-2 opacity-90">
            आरोग्य सारथी • Health Companion
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Your trusted digital health companion for secure medical records and healthcare access
          </p>
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Language Selection */}
        <Card className="mb-8 shadow-card-health">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Choose Your Language</h2>
              <p className="text-muted-foreground">अपनी भाषा चुनें • Select your preferred language</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    selectedLanguage === language.code
                      ? 'border-primary bg-primary/10 shadow-health'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold text-sm">{language.name}</div>
                  <div className="text-lg font-medium mt-1">{language.nativeName}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card-health">
              <CardContent className="p-6">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onContinue}
            className="px-12 py-6"
          >
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            By continuing, you agree to our privacy policy and terms of service
          </p>
        </div>
      </div>
    </div>
  );
};