import { FaArrowCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_TRANSACTIONS } from "../utils/constance";

function Pagination({ count, pageSize = PAGE_SIZE_TRANSACTIONS }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const pageCount = Math.ceil(count / pageSize);

  function handlePrev() {
    const temp = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", temp);
    setSearchParams(searchParams);
  }

  function handleNext() {
    const temp = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", temp);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="my-5 mb-1 flex w-full items-center justify-between rounded-xl bg-white px-3 py-5">
      <p className="text-sm text-gray-500">
        عرض من{" "}
        <span className="font-semibold text-orange-500">
          {(currentPage - 1) * pageSize + 1}
        </span>{" "}
        لي{" "}
        <span className="font-semibold text-orange-500">
          {Math.min(currentPage * pageSize, count)}
        </span>{" "}
        من <span className="font-semibold text-black">{count}</span> نتيجة
      </p>

      <div className="flex gap-1.5">
        <Button
          design="secondary"
          onClick={handleNext}
          disabled={currentPage === pageCount}
        >
          <FaArrowCircleRight /> التالي
        </Button>
        <Button design="cold" onClick={handlePrev} disabled={currentPage === 1}>
          السابق <FaArrowAltCircleLeft />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
