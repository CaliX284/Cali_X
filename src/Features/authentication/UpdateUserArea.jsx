import ChangePersonalUser from "./ChangePersonalUser";
import UpdatePasswordForm from "./UpdatePasswordForm";

function UpdateUserArea() {
  return (
    <div className="my-6 rounded-xl bg-white px-3 py-4">
      <div>
        {/* <h4 className="my-4 text-[16px] font-semibold text-orange-500  sm:text-[18px]">
          تحديث الحساب الحالي{" "}
        </h4> */}
      </div>
      <ChangePersonalUser />
      <UpdatePasswordForm />
    </div>
  );
}

export default UpdateUserArea;
