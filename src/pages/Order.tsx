import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const Order = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const products = [
    { id: "terrein-5mg", name: "Terrein >95%", amount: "5 mg", price: "C$450" },
    { id: "terrein-10mg", name: "Terrein >95%", amount: "10 mg", price: "C$800" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      toast({
        title: "Please select a product",
        description: "Choose a product from the table before submitting your order.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Order request submitted",
      description: "Thank you for your interest. Our team will contact you shortly to process your order.",
    });
    setFormData({ name: "", email: "", organization: "", message: "" });
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="Order" />
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeInOnScroll>
              <h3 className="text-2xl font-light text-foreground mb-8 text-center">
                Available Products
              </h3>
            </FadeInOnScroll>

            {/* Product Table */}
            <FadeInOnScroll delay={0.2}>
              <div className="overflow-hidden rounded-lg border border-border mb-12">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Price</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-foreground">Select</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((product) => (
                      <motion.tr
                        key={product.id}
                        className={`cursor-pointer transition-colors duration-200 ${
                          selectedProduct === product.id 
                            ? "bg-primary/10" 
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedProduct(product.id)}
                        whileHover={{ scale: 1.005 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="px-6 py-4 text-muted-foreground">{product.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{product.amount}</td>
                        <td className="px-6 py-4 text-foreground font-medium">{product.price}</td>
                        <td className="px-6 py-4 text-center">
                          <div className={`w-5 h-5 mx-auto rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                            selectedProduct === product.id 
                              ? "border-primary bg-primary" 
                              : "border-muted-foreground"
                          }`}>
                            {selectedProduct === product.id && (
                              <Check className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInOnScroll>

            {/* Order Form */}
            <FadeInOnScroll delay={0.3}>
              <h3 className="text-2xl font-light text-foreground mb-6 text-center">
                Request Order
              </h3>
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="transition-all duration-300 focus:shadow-md"
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
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Organization / Institution
                  </label>
                  <Input
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Additional Notes
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    Submit Order Request
                  </Button>
                </motion.div>
              </form>
            </FadeInOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
