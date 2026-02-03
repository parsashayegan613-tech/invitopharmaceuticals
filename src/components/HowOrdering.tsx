import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import { ClipboardList, FileText, Package, Truck } from "lucide-react";

const HowOrdering = () => {
  const steps = [
    {
      icon: ClipboardList,
      step: "1",
      title: "Submit RFQ",
      description: "Complete the Request for Quotation form with your product selection and shipping details"
    },
    {
      icon: FileText,
      step: "2",
      title: "Receive Quote",
      description: "Our team will provide a formal quotation within 1-2 business days"
    },
    {
      icon: Package,
      step: "3",
      title: "Confirm Order",
      description: "Approve the quote and submit payment or purchase order to confirm your order"
    },
    {
      icon: Truck,
      step: "4",
      title: "Receive Shipment",
      description: "Products shipped with COA and SDS. Standard lead time is 5-10 business days"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <h2 className="section-title mb-4">How Ordering Works</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Simple, professional procurement process for research institutions
          </p>
        </FadeInOnScroll>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <FadeInOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="relative text-center"
              >
                {/* Connector line (hidden on mobile, hidden for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border z-0" />
                )}
                
                {/* Step circle */}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-4 shadow-lg">
                  <item.icon className="w-7 h-7" />
                </div>
                
                <div className="text-xs font-medium text-primary mb-2">STEP {item.step}</div>
                <h4 className="text-lg font-medium text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowOrdering;
