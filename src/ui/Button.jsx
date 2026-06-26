function Button({ children, onClick, type, design = "primary" }) {
  return (
    <button
      className={`cursor-pointer rounded-2xl bg-orange-500 px-2 py-1.5 text-[15px] font-semibold text-stone-50 duration-300 hover:bg-orange-700 ${design === "secondary" ? "bg-stone-200 text-stone-900 hover:bg-stone-400" : ""}`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}

export default Button;
