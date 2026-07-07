import { useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import { useState } from "react";

function Search({ placeHolder, field }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("search")?.split(":")[1] || "",
  );

  const isActive = searchParams.get("search") ?? false;

  function handleSearch(value) {
    if (value.trim() === "") return false;
    if (!isActive) {
      searchParams.set("page", 1);
      searchParams.set("search", `${field}:${value}`);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
      setSearchValue("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(searchValue);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2 rounded-xl bg-white px-2 py-4"
    >
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        type="text"
        placeholder={placeHolder}
        className="w-62 rounded-2xl border-orange-500 bg-stone-300 px-3 py-2 ring-orange-500 outline-0 duration-200 focus:ring-1 sm:w-[300px] md:w-[350px]"
      />
      <Button type={"submit"} design={isActive ? "secondary" : "primary"}>
        {isActive ? "الغاء البحث" : "ابحث"}
      </Button>
    </form>
  );
}

export default Search;
