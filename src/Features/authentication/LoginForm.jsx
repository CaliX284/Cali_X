import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useLogin } from "./useLogin";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { loginUser, isLoading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.error("قم بادخال البايانات");
      
      return;
    }

    loginUser(
      {
        email,
        password,
      },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eee] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500">
            <LogIn size={30} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">تسجيل الدخول</h1>

          <p className="mt-2 text-sm text-gray-500">
            سجل دخولك للوصول إلى لوحة التحكم
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 pr-4 pl-12 transition-all outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              كلمة المرور
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 pr-4 pl-12 transition-all outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white transition-all duration-300 hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <LogIn size={20} />
                تسجيل الدخول
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
