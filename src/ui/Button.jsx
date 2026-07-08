function Button({
  children,
  onClick,
  type,
  design = "primary",
  size = "normal",
  disabled = false,
}) {
  // 1. الكلاسات الثابتة
  const baseStyles =
    "cursor-pointer rounded-2xl font-semibold duration-300 flex items-center gap-1";

  // 2. التصميم
  const designStyles = {
    primary: "bg-orange-500 text-stone-50 hover:bg-orange-700",
    secondary: "bg-stone-200 text-stone-900 hover:bg-stone-400",
    delete: "bg-red-500 text-stone-50 hover:bg-red-700",
    cold: "bg-blue-400 text-stone-50 hover:bg-blue-300",
  };

  // 3. الأحجام
  const sizeStyles = {
    small: "text-[11px] px-1.5 py-1 rounded-xl gap-0.5",
    normal: "text-[15px] px-2 py-1.5",
    big: "text-[18px] sm:text-xl px-4 py-2",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${
        designStyles[design] || designStyles.primary
      } ${sizeStyles[size] || sizeStyles.normal} disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}

export default Button;
