import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Phone, MessageSquare, Calendar, Clock, User, Stethoscope, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Telemedicine = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [consultationType, setConsultationType] = useState("video");
  const { toast } = useToast();

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "General Medicine",
      languages: ["Hindi", "English", "Bengali"],
      rating: 4.8,
      experience: "8 years",
      availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
      consultationFee: 250,
      nextAvailable: "Today"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Diabetes & Endocrinology",
      languages: ["Hindi", "English", "Tamil"],
      rating: 4.9,
      experience: "12 years",
      availableSlots: ["11:00 AM", "3:00 PM", "5:00 PM"],
      consultationFee: 400,
      nextAvailable: "Tomorrow"
    },
    {
      id: 3,
      name: "Dr. Anjali Menon",
      specialization: "Mental Health",
      languages: ["Malayalam", "English", "Hindi"],
      rating: 4.7,
      experience: "6 years",
      availableSlots: ["9:00 AM", "1:00 PM", "6:00 PM"],
      consultationFee: 300,
      nextAvailable: "Today"
    }
  ];

  const upcomingConsultations = [
    {
      id: 1,
      doctorName: "Dr. Priya Sharma",
      type: "Follow-up",
      date: "Today",
      time: "2:00 PM",
      duration: "15 mins",
      status: "Confirmed"
    },
    {
      id: 2,
      doctorName: "Dr. Rajesh Kumar",
      type: "Diabetes Check",
      date: "Tomorrow",
      time: "3:00 PM",
      duration: "30 mins",
      status: "Confirmed"
    }
  ];

  const consultationHistory = [
    {
      id: 1,
      doctorName: "Dr. Priya Sharma",
      date: "2024-01-10",
      diagnosis: "Common Cold",
      prescription: "Rest, fluids, paracetamol",
      rating: 5
    },
    {
      id: 2,
      doctorName: "Dr. Rajesh Kumar",
      date: "2024-01-05",
      diagnosis: "Diabetes Management",
      prescription: "Metformin 500mg, dietary changes",
      rating: 5
    }
  ];

  const handleBookConsultation = (doctor: any, slot: string) => {
    toast({
      title: "Consultation Booked",
      description: `Your ${consultationType} consultation with ${doctor.name} is scheduled for ${slot}`,
    });
  };

  const handleEmergencyConsultation = () => {
    toast({
      title: "Emergency Consultation Requested",
      description: "A doctor will connect with you within 5 minutes",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Video className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Telemedicine</h1>
          <p className="text-muted-foreground">Connect with doctors from anywhere, anytime</p>
        </div>
      </div>

      {/* Emergency Consultation */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Emergency Consultation</CardTitle>
          <CardDescription>
            Need immediate medical help? Connect with a doctor within 5 minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            size="lg" 
            className="w-full"
            onClick={handleEmergencyConsultation}
          >
            <Video className="h-5 w-5 mr-2" />
            Start Emergency Consultation
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="book" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="book">Book Consultation</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="space-y-6">
          {/* Consultation Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Consultation Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={consultationType === "video" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2"
                  onClick={() => setConsultationType("video")}
                >
                  <Video className="h-6 w-6" />
                  <span>Video Call</span>
                </Button>
                <Button
                  variant={consultationType === "audio" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2"
                  onClick={() => setConsultationType("audio")}
                >
                  <Phone className="h-6 w-6" />
                  <span>Audio Call</span>
                </Button>
                <Button
                  variant={consultationType === "chat" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2"
                  onClick={() => setConsultationType("chat")}
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Text Chat</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Doctors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm">{doctor.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Languages</p>
                    <div className="flex gap-2 flex-wrap">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Available Today</p>
                    <div className="grid grid-cols-3 gap-2">
                      {doctor.availableSlots.map((slot, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookConsultation(doctor, slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="font-semibold text-primary">₹{doctor.consultationFee}</span>
                    <Button variant="health">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingConsultations.map((consultation) => (
            <Card key={consultation.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {consultation.doctorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{consultation.doctorName}</h3>
                      <p className="text-sm text-muted-foreground">{consultation.type}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{consultation.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{consultation.time}</span>
                        <span>({consultation.duration})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="default">{consultation.status}</Badge>
                    <Button variant="health">
                      <Video className="h-4 w-4 mr-2" />
                      Join Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {consultationHistory.map((consultation) => (
            <Card key={consultation.id}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {consultation.doctorName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{consultation.doctorName}</h3>
                        <p className="text-sm text-muted-foreground">{consultation.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(consultation.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Diagnosis</p>
                      <p className="text-sm">{consultation.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Prescription</p>
                      <p className="text-sm">{consultation.prescription}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm">
                      Book Follow-up
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};