function SelectFilter({ active, options, label, onChange, field }) {
  return (
    <select
      defaultValue=""
      onChange={(e) => onChange(field, e.target.value)}
      className={`cursor-pointer rounded-2xl px-3 py-2 text-[12px] font-semibold duration-300 ${active ? "bg-orange-500 text-white" : "bg-gray-200 text-stone-800 hover:bg-gray-400"} outline-0`}
    >
      <option value="" disabled hidden>
        {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectFilter;
