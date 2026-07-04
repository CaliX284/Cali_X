import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "إبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("en-US");

const formatCurrency = (value) =>
  `${formatNumber(value)} ج.م`;

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="min-w-[230px] rounded-2xl border border-orange-100 bg-white p-4 shadow-xl">
      <h3 className="mb-3 border-b border-orange-100 pb-2 text-right text-base font-bold text-orange-600">
        {data.monthName}
      </h3>

      <div className="space-y-2 text-sm">

        <div className="flex items-center justify-between">
          <span>إجمالي الدخل</span>
          <span className="font-semibold text-emerald-600">
            {formatCurrency(data.income)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>إجمالي المصروفات</span>
          <span className="font-semibold text-red-500">
            {formatCurrency(data.expense)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>نصيب المدربين</span>
          <span className="font-semibold text-sky-600">
            {formatCurrency(data.captains_amount)}
          </span>
        </div>

        <hr />

        <div className="flex items-center justify-between text-base font-bold text-orange-600">
          <span>صافي الربح</span>
          <span>{formatCurrency(data.net_profit)}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardAreaChart({ data }) {
  const chartData = data.map((item) => ({
    ...item,
    monthName: MONTHS[item.month - 1],
  }));

  return (
    <div className="h-[420px] w-full rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">

      <h2 className="mb-5 text-lg font-bold text-gray-800">
        الأداء الشهري
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 15,
            left: 15,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="orangeGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#F97316"
                stopOpacity={0.45}
              />
              <stop
                offset="95%"
                stopColor="#F97316"
                stopOpacity={0.03}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#f3f4f6"
          />

          <XAxis
            dataKey="monthName"
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 13,
              fill: "#6b7280",
            }}
          />

          <YAxis
            tickFormatter={formatNumber}
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
              fill: "#6b7280",
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#F97316",
              strokeDasharray: "3 3",
            }}
          />

          <Area
            type="monotone"
            dataKey="net_profit"
            stroke="#F97316"
            strokeWidth={4}
            fill="url(#orangeGradient)"
            dot={{
              r: 5,
              fill: "#F97316",
              stroke: "#fff",
              strokeWidth: 3,
            }}
            activeDot={{
              r: 8,
              fill: "#EA580C",
              stroke: "#fff",
              strokeWidth: 4,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

