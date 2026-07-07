import Search from "../../ui/Search";
function CaptainsOperations() {
  return (
    <div className="mx-1.5 my-3.5 rounded-xl bg-white px-2 py-2.5">
      <Search
        placeHolder={"ابحث باسم المدرب او برقم الهويه ..."}
        field={"full_name"}
      />
    </div>
  );
}

export default CaptainsOperations;
