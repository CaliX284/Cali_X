import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CheckCircle2, AlertTriangle, Clock3 } from "lucide-react";

const COLORS = {
  paid: "#22C55E",
  due: "#F59E0B",
  expired: "#EF4444",
};

export default function MembersPaymentStatusChart({ data }) {
  // يدعم سواء Array أو Object
  const stats = Array.isArray(data) ? data[0] : data;

  const total = Number(stats?.total_members ?? 0);

  const chartData = [
    {
      name: "مدفوع",
      value: Number(stats?.paid_count ?? 0),
      color: COLORS.paid,
      icon: CheckCircle2,
    },
    {
      name: "مستحقات",
      value: Number(stats?.due_count ?? 0),
      color: COLORS.due,
      icon: AlertTriangle,
    },
    {
      name: "منتهي",
      value: Number(stats?.expired_count ?? 0),
      color: COLORS.expired,
      icon: Clock3,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
        <p className="font-semibold">{item.name}</p>

        <p className="mt-1 text-gray-500">{item.value} عضو</p>

        <p className="text-sm text-gray-400">
          {total === 0 ? 0 : ((item.value / total) * 100).toFixed(1)}%
        </p>
      </div>
    );
  };

  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">حالة الاشتراكات</h2>

        <p className="text-sm text-gray-500">توزيع حالات جميع الأعضاء</p>
      </div>

      {/* Chart */}

      <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[460px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="63%"
              outerRadius="84%"
              paddingAngle={5}
              cornerRadius={14}
              stroke="none"
              animationDuration={900}
            >
              {chartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center */}

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gray-900">{total}</span>

          <span className="mt-1 text-sm text-gray-500">إجمالي الأعضاء</span>
        </div>
      </div>

      {/* Cards */}

      <div className="mt-8 grid gap-3">
        {chartData.map((item) => {
          const Icon = item.icon;

          const percent =
            total === 0 ? 0 : ((item.value / total) * 100).toFixed(1);

          return (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${item.color}20`,
                  }}
                >
                  <Icon size={22} color={item.color} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>

                  <p className="text-sm text-gray-500">{percent}%</p>
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900">
                  {item.value}
                </h2>

                <div className="mt-2 h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
