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

const formatNumber = (value) => Number(value || 0).toLocaleString("en-US");

const formatCurrency = (value) => `${formatNumber(value)} ج.م`;

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="w-[220px] rounded-2xl border border-orange-100 bg-white/95 p-4 shadow-xl backdrop-blur">
      <h3 className="mb-3 border-b border-orange-100 pb-2 text-right text-sm font-bold text-orange-600">
        {data.monthName}
      </h3>

      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">إجمالي الدخل</span>

          <span className="font-semibold text-emerald-600">
            {formatCurrency(data.income)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">إجمالي المصروفات</span>

          <span className="font-semibold text-red-500">
            {formatCurrency(data.expense)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">نصيب المدربين</span>

          <span className="font-semibold text-sky-600">
            {formatCurrency(data.captains_amount)}
          </span>
        </div>

        <hr className="border-orange-100" />

        <div className="flex items-center justify-between text-sm font-bold text-orange-600">
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
    <div className="w-full min-w-0 rounded-2xl border border-orange-100 bg-white p-3 shadow-sm sm:p-5">
      <h2 className="mb-4 text-base font-bold text-gray-800 sm:text-lg">
        الأداء الشهري
      </h2>

      <div
        className="h-[320px] sm:h-[420px]"
        style={{
          touchAction: "pan-y",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 12,
              right: 8,
              left: -18,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity={0.45} />

                <stop offset="100%" stopColor="#F97316" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#f3f4f6"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="monthName"
              tickLine={false}
              axisLine={false}
              minTickGap={20}
              interval="preserveStartEnd"
              tick={{
                fill: "#6b7280",
                fontSize: 11,
              }}
            />

            <YAxis
              tickFormatter={formatNumber}
              tickLine={false}
              axisLine={false}
              width={45}
              tick={{
                fill: "#6b7280",
                fontSize: 11,
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#F97316",
                strokeDasharray: "4 4",
                strokeWidth: 1.5,
              }}
              wrapperStyle={{
                outline: "none",
                border: "none",
              }}
            />

            <Area
              type="monotone"
              dataKey="net_profit"
              stroke="#F97316"
              strokeWidth={3}
              fill="url(#orangeGradient)"
              isAnimationActive
              animationDuration={700}
              dot={{
                r: 3,
                fill: "#F97316",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#EA580C",
                stroke: "#fff",
                strokeWidth: 3,
              }}
              style={{
                outline: "none",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
