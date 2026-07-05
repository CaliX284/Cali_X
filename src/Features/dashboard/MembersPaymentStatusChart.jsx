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

  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">حالة الاشتراكات</h2>

        <p className="mt-1 text-sm text-gray-500">توزيع حالات جميع الأعضاء</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 items-center gap-8 xl:grid-cols-[360px_1fr]">
        {/* Chart */}
        <div className="mx-auto w-full max-w-[360px]">
          <div className="relative aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="64%"
                  outerRadius="82%"
                  paddingAngle={5}
                  cornerRadius={14}
                  stroke="none"
                  animationDuration={900}
                >
                  {chartData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>

                <Tooltip
                  cursor={false}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 12px 30px rgba(0,0,0,.08)",
                    padding: "12px",
                  }}
                  formatter={(value, name) => {
                    const percent =
                      total === 0
                        ? 0
                        : ((Number(value) / total) * 100).toFixed(1);

                    return [`${value} عضو (${percent}%)`, name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                {total}
              </span>

              <span className="mt-1 text-sm text-gray-500">إجمالي الأعضاء</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4">
          {chartData.map((item) => {
            const Icon = item.icon;

            const percent =
              total === 0 ? 0 : ((item.value / total) * 100).toFixed(1);

            return (
              <div
                key={item.name}
                className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}18`,
                    }}
                  >
                    <Icon size={26} color={item.color} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {percent}% من إجمالي الأعضاء
                    </p>
                  </div>
                </div>

                <div className="min-w-[110px] text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {item.value}
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
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
    </div>
  );
}
