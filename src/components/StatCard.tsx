import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  variant?: "default" | "success" | "warning" | "accent";
}

const StatCard = ({ title, value, icon: Icon, change, variant = "default" }: StatCardProps) => {
  const iconBgClass = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    accent: "bg-accent/10 text-accent"
  }[variant];

  const trendColor = {
    up: "text-success",
    down: "text-destructive", 
    neutral: "text-muted-foreground"
  };

  return (
    <Card className="hover:shadow-medium transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`w-8 h-8 rounded-lg ${iconBgClass} flex items-center justify-center`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className={`text-xs ${trendColor[change.trend]} mt-1`}>
            {change.trend === "up" ? "+" : change.trend === "down" ? "-" : ""}{change.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;