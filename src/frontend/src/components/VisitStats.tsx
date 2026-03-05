import { Card, CardContent } from "@/components/ui/card";
import { Eye, TrendingUp } from "lucide-react";
import { useVisitAnalytics } from "../hooks/useVisitAnalytics";

interface VisitStatsProps {
  compact?: boolean;
}

export default function VisitStats({ compact = false }: VisitStatsProps) {
  const { totalVisits, todayVisits, isLoading } = useVisitAnalytics();

  if (isLoading) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Eye size={14} />
          Total: {totalVisits.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp size={14} />
          Today: {todayVisits.toLocaleString()}
        </span>
      </div>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Eye className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Visits</p>
              <p className="text-2xl font-bold text-foreground">
                {totalVisits.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="text-accent-foreground" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today's Visits</p>
              <p className="text-2xl font-bold text-foreground">
                {todayVisits.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
