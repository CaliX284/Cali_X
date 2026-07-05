import { useForm } from "react-hook-form";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { useCreateAccount } from "./useCreateAccount";

export default function SignupForm({ onClose }) {
  const { signupMutation, isPending } = useCreateAccount();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  function onSubmit(data) {
    const newUser = {
      email: data.email,
      password: data.password,
      fullName: data.username,
    };

    signupMutation(newUser, { onSettled: () => onClose?.() });
  }

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-8"
    >
      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 shadow-lg shadow-orange-200">
            <UserPlus size={38} className="text-white" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-800">
            إنشاء حساب جديد
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            أدخل البيانات التالية لإنشاء حساب جديد.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              اسم المستخدم
            </label>

            <div className="relative">
              <User
                className="absolute top-1/2 right-4 -translate-y-1/2 text-orange-500"
                size={20}
              />

              <input
                type="text"
                placeholder="أدخل اسم المستخدم"
                className={`w-full rounded-xl border bg-orange-50 py-3 pr-12 pl-4 text-right transition-all duration-200 outline-none ${
                  errors.username
                    ? "border-red-500"
                    : "border-orange-200 focus:border-orange-500 focus:bg-white"
                }`}
                {...register("username", {
                  required: "اسم المستخدم مطلوب",
                  minLength: {
                    value: 3,
                    message: "يجب ألا يقل عن 3 أحرف",
                  },
                })}
              />
            </div>

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              البريد الإلكتروني
            </label>

            <div className="relative">
              <Mail
                className="absolute top-1/2 right-4 -translate-y-1/2 text-orange-500"
                size={20}
              />

              <input
                type="email"
                placeholder="example@gmail.com"
                className={`w-full rounded-xl border bg-orange-50 py-3 pr-12 pl-4 text-right transition-all duration-200 outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-orange-200 focus:border-orange-500 focus:bg-white"
                }`}
                {...register("email", {
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "البريد الإلكتروني غير صحيح",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              كلمة المرور
            </label>

            <div className="relative">
              <Lock
                className="absolute top-1/2 right-4 -translate-y-1/2 text-orange-500"
                size={20}
              />

              <input
                type="password"
                placeholder="********"
                className={`w-full rounded-xl border bg-orange-50 py-3 pr-12 pl-4 text-right transition-all duration-200 outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-orange-200 focus:border-orange-500 focus:bg-white"
                }`}
                {...register("password", {
                  required: "كلمة المرور مطلوبة",
                  minLength: {
                    value: 8,
                    message: "يجب ألا تقل كلمة المرور عن 8 أحرف",
                  },
                })}
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              تأكيد كلمة المرور
            </label>

            <div className="relative">
              <Lock
                className="absolute top-1/2 right-4 -translate-y-1/2 text-orange-500"
                size={20}
              />

              <input
                type="password"
                placeholder="********"
                className={`w-full rounded-xl border bg-orange-50 py-3 pr-12 pl-4 text-right transition-all duration-200 outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-orange-200 focus:border-orange-500 focus:bg-white"
                }`}
                {...register("confirmPassword", {
                  required: "يرجى تأكيد كلمة المرور",
                  validate: (value) =>
                    value === password || "كلمتا المرور غير متطابقتين",
                })}
              />
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition-all duration-300 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>
      </div>
    </div>
  );
}
