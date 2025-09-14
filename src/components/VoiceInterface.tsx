import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MicOff, Volume2, VolumeX, Settings, Languages, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const VoiceInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const languages = [
    { code: "hindi", name: "हिंदी (Hindi)", voice: "Aditi" },
    { code: "bengali", name: "বাংলা (Bengali)", voice: "Ruma" },
    { code: "tamil", name: "தமிழ் (Tamil)", voice: "Raveena" },
    { code: "malayalam", name: "മലയാളം (Malayalam)", voice: "Madhur" },
    { code: "english", name: "English", voice: "Joanna" },
    { code: "odia", name: "ଓଡ଼ିଆ (Odia)", voice: "Default" }
  ];

  const voiceCommands = [
    { command: "मेरा स्वास्थ्य कार्ड दिखाएं", english: "Show my health card", category: "Health Records" },
    { command: "दवा का समय याद दिलाएं", english: "Remind me to take medicine", category: "Medication" },
    { command: "नजदीकी अस्पताल ढूंढें", english: "Find nearby hospital", category: "Emergency" },
    { command: "डॉक्टर से बात करवाएं", english: "Connect with doctor", category: "Telemedicine" },
    { command: "मेरा ब्लड प्रेशर रिकॉर्ड करें", english: "Record my blood pressure", category: "Health Tracking" }
  ];

  const conversationHistory = [
    {
      type: "user",
      text: "मेरा स्वास्थ्य कार्ड दिखाएं",
      translation: "Show my health card",
      time: "2:30 PM"
    },
    {
      type: "assistant",
      text: "आपका स्वास्थ्य कार्ड तैयार है। क्या आप इसे साझा करना चाहते हैं?",
      translation: "Your health card is ready. Would you like to share it?",
      time: "2:30 PM"
    },
    {
      type: "user",
      text: "हाँ, कृपया भेजें",
      translation: "Yes, please send",
      time: "2:31 PM"
    }
  ];

  const handleStartListening = () => {
    if (!isListening) {
      setIsListening(true);
      setTranscript("");
      
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript("मेरा ब्लड प्रेशर रिकॉर्ड करें");
        setIsListening(false);
        handleVoiceCommand("मेरा ब्लड प्रेशर रिकॉर्ड करें");
      }, 3000);

      toast({
        title: "सुन रहा हूँ...",
        description: "अपनी आवाज़ में बोलें",
      });
    } else {
      setIsListening(false);
    }
  };

  const handleVoiceCommand = (command: string) => {
    // Simulate AI response
    setIsSpeaking(true);
    let aiResponse = "";
    
    if (command.includes("ब्लड प्रेशर")) {
      aiResponse = "कृपया अपना ब्लड प्रेशर बताएं। पहले सिस्टोलिक फिर डायस्टोलिक।";
    } else if (command.includes("स्वास्थ्य कार्ड")) {
      aiResponse = "आपका स्वास्थ्य कार्ड तैयार है। स्क्रीन पर देखें।";
    } else {
      aiResponse = "मैं आपकी मदद करने के लिए यहाँ हूँ। कुछ और पूछें।";
    }
    
    setResponse(aiResponse);
    
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
      toast({
        title: "प्रतिक्रिया",
        description: aiResponse,
      });
    }, 2000);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    toast({
      title: voiceEnabled ? "आवाज़ बंद" : "आवाज़ चालू",
      description: voiceEnabled ? "Voice responses disabled" : "Voice responses enabled",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Mic className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Voice Assistant</h1>
          <p className="text-muted-foreground">Speak in your language for health assistance</p>
        </div>
      </div>

      {/* Voice Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Voice Controls</CardTitle>
          <CardDescription>
            Tap to speak in your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Main Voice Button */}
            <div className="relative">
              <Button
                size="lg"
                variant={isListening ? "destructive" : "health"}
                className={`w-24 h-24 rounded-full ${isListening ? 'animate-pulse' : ''}`}
                onClick={handleStartListening}
              >
                {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
              {isListening && (
                <div className="absolute -inset-2 rounded-full border-4 border-primary/30 animate-ping"></div>
              )}
            </div>

            {/* Status */}
            <div className="text-center space-y-2">
              {isListening && (
                <Badge variant="default" className="animate-pulse">
                  Listening...
                </Badge>
              )}
              {isSpeaking && (
                <Badge variant="secondary" className="animate-pulse">
                  Speaking...
                </Badge>
              )}
              {!isListening && !isSpeaking && (
                <Badge variant="outline">
                  Ready to listen
                </Badge>
              )}
            </div>

            {/* Language Selection */}
            <div className="w-full max-w-md">
              <label className="text-sm font-medium mb-2 block">Current Language</label>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-3 border rounded-lg bg-background"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.voice})
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Settings */}
            <div className="flex gap-4">
              <Button
                variant={voiceEnabled ? "default" : "outline"}
                onClick={toggleVoice}
                className="flex items-center gap-2"
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {voiceEnabled ? "Voice On" : "Voice Off"}
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="commands" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="commands">Voice Commands</TabsTrigger>
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="help">Help & Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="commands" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Voice Commands</CardTitle>
              <CardDescription>
                Try saying these commands in your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {voiceCommands.map((cmd, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{cmd.command}</p>
                        <p className="text-xs text-muted-foreground mt-1">{cmd.english}</p>
                      </div>
                      <Badge variant="outline">{cmd.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversation</CardTitle>
              <CardDescription>
                Your voice interactions with the health assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversationHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm font-medium">{msg.text}</p>
                      <p className="text-xs opacity-75 mt-1">{msg.translation}</p>
                      <p className="text-xs opacity-60 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">1. Select Your Language</h4>
                  <p className="text-xs text-muted-foreground">
                    Choose your preferred language from the dropdown menu
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">2. Tap to Speak</h4>
                  <p className="text-xs text-muted-foreground">
                    Press the microphone button and speak clearly
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">3. Listen to Response</h4>
                  <p className="text-xs text-muted-foreground">
                    The assistant will respond in your selected language
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Language Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm">{lang.name}</span>
                      <Badge variant="outline">{lang.voice}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Better Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Speaking Tips</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Speak clearly and slowly</li>
                    <li>• Use simple, direct phrases</li>
                    <li>• Avoid background noise</li>
                    <li>• Hold phone close to mouth</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Best Environment</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Quiet indoor space</li>
                    <li>• Good internet connection</li>
                    <li>• Phone microphone unblocked</li>
                    <li>• Speak in your native language</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};