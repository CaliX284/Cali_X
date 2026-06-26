import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function Error({
  title = "حدث خطأ",
  message = "حدث خطأ أثناء تحميل البيانات، حاول مرة أخرى.",
  fullPage = false,
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullPage ? "min-h-screen" : "py-10"
      }`}
    >
      <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <HiOutlineExclamationTriangle className="h-9 w-9 text-red-500" />
        </div>

        <h2 className="mb-2 text-xl font-bold text-slate-800">{title}</h2>

        <p className="text-sm leading-6 text-slate-600">{message}</p>
      </div>
    </div>
  );
}

export default Error;
