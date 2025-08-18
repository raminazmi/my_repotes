import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

function StatCard({ title, value, icon, change, changeType }) {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-2xl">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${changeColors[changeType || 'neutral']} mt-1`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsGrid() {
  const stats = [
    {
      title: "إجمالي الطلاب",
      value: "1,248",
      icon: "👥",
      change: "+12% من الشهر الماضي",
      changeType: "positive"
    },
    {
      title: "التقارير المكتملة",
      value: "89",
      icon: "📊",
      change: "+5% من الأسبوع الماضي",
      changeType: "positive"
    },
    {
      title: "معدل الحضور",
      value: "94.2%",
      icon: "✅",
      change: "-2% من الشهر الماضي",
      changeType: "negative"
    },
    {
      title: "المعدل العام",
      value: "87.5",
      icon: "⭐",
      change: "بدون تغيير",
      changeType: "neutral"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
} 