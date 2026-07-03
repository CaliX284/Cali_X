

function StatCard({
  icon,
  value,
  label,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
  textColor = "text-slate-500",
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 ${className} `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${textColor}`}>{label}</p>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} `}
        >
          <span className={`text-xl ${iconColor}`}>{icon}</span>
        </div>
      </div>

      {/* Value */}
      <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;
