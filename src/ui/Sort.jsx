import { useSearchParams } from "react-router-dom";

function Sort({ options }) {
  const [searchparams, setSearchParams] = useSearchParams();
  const sortValue = searchparams.get("sortBy") ?? options[0].value;

  function handleChange(value) {
    searchparams.set("sortBy", value);
    searchparams.set("page", "1");
    setSearchParams(searchparams);
  }

  return (
    <div className="mb-3 px-1 py-1.5">
      <select
        className="cursor-pointer rounded-xl border-2 border-orange-500 bg-stone-100 px-1.5 py-1.5 text-[14px] font-semibold text-stone-800 shadow outline-0 duration-300 hover:bg-stone-300"
        onChange={(e) => handleChange(e.target.value)}
        value={sortValue}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}{" "}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sort;
