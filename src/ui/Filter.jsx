import { useSearchParams } from "react-router-dom";
import ButtonFilter from "./ButtonFilter";
import SelectFilter from "./SelectFilter";

function Filter({ values, nameFilter, defaultValue = ["all", "all"] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeField, activeValue = ""] =
    searchParams.get(nameFilter)?.split(":") ?? defaultValue;

  function handleFilterChange(field, value) {
    searchParams.set(nameFilter, `${field}:${value}`);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <div className="my-1.5 flex flex-wrap gap-2.5 p-1">
      {values.map((value) => {
        if (value?.buttonType === "select") {
          return (
            <SelectFilter
              onChange={handleFilterChange}
              label={value.label}
              options={value.options}
              key={value.value}
              field={value.field}
              active={activeField === value.value}
            />
          );
        } else {
          return (
            <ButtonFilter
              field={value.field}
              key={value.value}
              value={value.value}
              onClick={handleFilterChange}
              active={
                activeField === value.field && activeValue === value.value
              }
            >
              {value.label}
            </ButtonFilter>
          );
        }
      })}
    </div>
  );
}

export default Filter;
