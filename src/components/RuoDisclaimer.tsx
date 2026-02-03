import { AlertTriangle } from "lucide-react";

interface RuoDisclaimerProps {
  className?: string;
  variant?: "inline" | "box";
}

const RuoDisclaimer = ({ className = "", variant = "box" }: RuoDisclaimerProps) => {
  const disclaimerText = "For Research Use Only (RUO). Not for human or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease.";

  if (variant === "inline") {
    return (
      <p className={`text-sm text-muted-foreground italic ${className}`}>
        {disclaimerText}
      </p>
    );
  }

  return (
    <div className={`bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3 ${className}`}>
      <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <p className="text-sm text-muted-foreground">
        {disclaimerText}
      </p>
    </div>
  );
};

export default RuoDisclaimer;
