import { useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We will get back to you soon.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="Contact us" />
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Contact Info */}
            <div className="mb-10 space-y-2">
              <h4 className="font-semibold text-foreground">
                Address: 9407-20 Ave, NW, Edmonton, AB, Canada,T6N 1E5
              </h4>
              <h4 className="font-semibold text-foreground">
                Te: 780.709.5678
              </h4>
              <h4 className="font-semibold text-foreground">
                Email: info@invitvo.com
              </h4>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name <span className="text-primary">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">First</span>
                  </div>
                  <div>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                    <span className="text-xs text-muted-foreground mt-1 block">Last</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-primary">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Comment or Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                />
              </div>

              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Submit
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
