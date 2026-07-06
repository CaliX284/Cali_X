import { useEffect, useState } from "react";
import useUser from "./useUser";
import Button from "../../ui/Button";
import { useUpdateUser } from "./useUpdateUser";

export default function ChangePersonalUser() {
  const { user, isLoading } = useUser();
  const { updateUserMutation, isPending } = useUpdateUser();
  const [fullName, setFullName] = useState("");
  let email = user?.user_metadata?.email ?? "";

  useEffect(() => {
    if (!user) return;
    setFullName(user.user_metadata.fullName ?? "");
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    updateUserMutation({ fullName });
  }

  function handleCancel() {
    setFullName(user.user_metadata.fullName);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-6 text-right"
    >
      <h5 className="text-[17px] font-semibold text-orange-500">
        تغير اسم المستخدم
      </h5>
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          البريد الإلكتروني
        </label>

        <input
          type="email"
          value={email}
          disabled
          className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500 outline-none"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          اسم المستخدم
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-orange-500"
          placeholder="اسم المستخدم"
        />
      </div>

      <div className="flex justify-between pt-2">
        <Button
          disabled={isLoading || isPending}
          design="secondary"
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          إلغاء
        </Button>

        <Button
          disabled={isLoading || isPending}
          type="submit"
          className="rounded-lg bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600"
        >
          حفظ التعديلات
        </Button>
      </div>
    </form>
  );
}
