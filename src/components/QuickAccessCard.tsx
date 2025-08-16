import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  variant?: "primary" | "accent" | "success";
  onClick?: () => void;
}

const QuickAccessCard = ({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  variant = "primary",
  onClick 
}: QuickAccessCardProps) => {
  const gradientClass = {
    primary: "bg-gradient-primary",
    accent: "bg-gradient-accent", 
    success: "bg-success"
  }[variant];

  const buttonVariant = {
    primary: "default",
    accent: "secondary",
    success: "outline"
  }[variant] as "default" | "secondary" | "outline";

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-scale-in bg-gradient-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant={buttonVariant}
          className="w-full font-medium"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;