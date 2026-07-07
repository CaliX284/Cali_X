import { useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import { useState } from "react";

function Search({ placeHolder, field }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("search")?.split(":")[1] || "",
  );

  const isActive = searchParams.has("search");

  // if search
  function handleSearch(value) {
    if (value.trim() === "") return false;

    searchParams.set("page", 1);
    searchParams.set("search", `${field}:${value}`);
    setSearchParams(searchParams);
  }

  function handleCancel() {
    if (isActive) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      setSearchValue("");
    }
  }

  // when submit
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
      <div className="flex items-center gap-1">
        <Button type={"submit"} design={"primary"}>
          {"ابحث"}
        </Button>

        <Button
          onClick={() => handleCancel()}
          type={"button"}
          design={"secondary"}
          disabled={!isActive}
        >
          {"مسح "}
        </Button>
      </div>
    </form>
  );
}

export default Search;
