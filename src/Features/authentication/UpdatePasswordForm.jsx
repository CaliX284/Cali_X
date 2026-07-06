import { useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

export default function UpdatePasswordForm() {
  const { updateUserMutation, isPending } = useUpdateUser();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("يرجى إدخال كلمة المرور وتأكيدها");
      return;
    }

    if (password !== confirmPassword) {
      setError("تأكيد كلمة المرور غير مطابق.");
      return;
    }

    setError("");
    updateUserMutation(
      { password },
      {
        onSuccess: () => {
          setPassword("");
          setConfirmPassword("");
        },
      },
    );
  }

  function handleCancel() {
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-11 w-full max-w-lg space-y-6 text-right"
    >
      <h5 className="text-[17px] font-semibold text-orange-500">
        تغير كلمه المرور
      </h5>
      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          كلمة المرور الجديدة
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-orange-500"
          placeholder="********"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          تأكيد كلمة المرور
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-orange-500"
          placeholder="********"
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          design="secondary"
          disabled={isPending}
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          إلغاء
        </Button>

        <Button
          disabled={isPending}
          type="submit"
          className="rounded-lg bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600"
        >
          حفظ التعديلات
        </Button>
      </div>
    </form>
  );
}
