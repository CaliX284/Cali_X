function ButtonFilter({ active , field , value  , onClick, children }) {
  return (
    <button
      className={`cursor-pointer rounded-2xl px-3 py-2 text-[12px] font-semibold duration-300 ${active ? "bg-orange-500 text-white" : "bg-gray-200 text-stone-800 hover:bg-gray-400"}`}
      onClick={() => onClick(field, value)}
    >
      {children}
    </button>
  );
}

export default ButtonFilter;
