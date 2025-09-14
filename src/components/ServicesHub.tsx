import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Briefcase, Scale, MapPin, Phone, ExternalLink } from "lucide-react";

export const ServicesHub = () => {
  const services = [
    {
      category: "Financial Services",
      icon: <CreditCard className="h-6 w-6" />,
      items: [
        { name: "Health Insurance Claims", status: "Available", link: "#" },
        { name: "Medical Loan Assistance", status: "Available", link: "#" },
        { name: "Digital Payments for Healthcare", status: "Available", link: "#" },
        { name: "Emergency Fund Access", status: "Coming Soon", link: "#" }
      ]
    },
    {
      category: "Employment",
      icon: <Briefcase className="h-6 w-6" />,
      items: [
        { name: "Health-Safe Job Listings", status: "Available", link: "#" },
        { name: "Workplace Safety Reports", status: "Available", link: "#" },
        { name: "Skill Development Programs", status: "Available", link: "#" },
        { name: "Labor Rights Information", status: "Available", link: "#" }
      ]
    },
    {
      category: "Legal Aid",
      icon: <Scale className="h-6 w-6" />,
      items: [
        { name: "Healthcare Rights Helpline", status: "Available", link: "tel:1800-123-4567" },
        { name: "Legal Document Assistance", status: "Available", link: "#" },
        { name: "Immigration Support", status: "Available", link: "#" },
        { name: "Free Legal Consultation", status: "Available", link: "#" }
      ]
    }
  ];

  const quickActions = [
    { name: "Find Nearby ATM", icon: <MapPin className="h-4 w-4" />, action: () => {} },
    { name: "Emergency Helpline", icon: <Phone className="h-4 w-4" />, action: () => window.open("tel:108") },
    { name: "Government Schemes", icon: <ExternalLink className="h-4 w-4" />, action: () => {} },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Services Hub</h1>
        <p className="text-muted-foreground">Your gateway to comprehensive support services</p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-16 flex flex-col gap-2"
                onClick={action.action}
              >
                {action.icon}
                <span className="text-sm">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {service.icon}
                </div>
                <CardTitle className="text-lg">{service.category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {service.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={item.status === "Available" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                    {item.status === "Available" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(item.link)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Contact */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Need Help?</h3>
            <p className="text-muted-foreground">
              Our support team is available 24/7 to assist you with any service-related queries
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="health" onClick={() => window.open("tel:1800-AROGYA")}>
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
              <Button variant="outline">
                Chat with Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};