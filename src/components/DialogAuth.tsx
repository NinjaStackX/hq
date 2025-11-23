import { fetchCreateUser } from "@/store/thunks/usersThunck";
import { dataTagSymbol } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
type Mode = "login" | "signup";

interface DialogAuthProps {
  open: boolean;
  onClose: () => void;
}

const DialogAuth: React.FC<DialogAuthProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.users);
  function handleSignUp(e) {
    e.preventDefault();
    const fetch = async (data) => {
      await dispatch(fetchCreateUser({ ...data }));
      // تخزين
    };
    // سحب البيانات من الفورم مباشرة بدون useState
    const formData = new FormData(e.target);

    // تحويلها إلى كائن عادي
    const data = Object.fromEntries(formData.entries());
    fetch(data);
  }
  useEffect(() => {
    // // تخزين
    //  Cookies.set("user_id", items.at, { expires: 7 });
    // // قراءة
    // const userId = Cookies.get('user_id');
    // // حذف
    // Cookies.remove('user_id');
  }, [dispatch, items, loading]);
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState<Mode>("login");
  const [exiting, setExiting] = useState(false);

  const buttonRef = useRef(null);

  const handleClick = () => {
    alert("الزر تم النقر عليه برمجيًا!");
  };

  const triggerClick = () => {
    // استدعاء النقر على الزر من غير ضغط المستخدم
    buttonRef.current.click();
  };

  // Determine direction based on language for RTL/LTR animations
  const isRTL = useMemo(() => i18n.language?.startsWith("ar"), [i18n.language]);

  // Set document dir for proper RTL layout
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  // Handle close with exit animation
  const handleClose = () => {
    setExiting(true);
    const timer = setTimeout(() => {
      setExiting(false);
      onClose();
    }, 260); // matches slideOut duration
    return () => clearTimeout(timer);
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "signup" : "login"));
  };

  // Staggered delay utility for fields
  const fieldDelay = (index: number) => ({
    animationDelay: `${index * 80}ms`,
  });

  // Login form with sequential field animations
  const LoginForm: React.FC<{
    fieldDelay: (i: number) => React.CSSProperties;
  }> = ({ fieldDelay }) => {
    const { t } = useTranslation();
    return (
      <form className="space-y-4" onSubmit={handleSignUp}>
        <div className="opacity-0 animate-fadeInUp" style={fieldDelay(0)}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.login.email")}
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={t("auth.login.email")}
          />
        </div>

        <div className="opacity-0 animate-fadeInUp" style={fieldDelay(1)}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.login.password")}
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={t("auth.login.password")}
          />
        </div>

        <div
          className="flex items-center justify-between opacity-0 animate-fadeInUp"
          style={fieldDelay(2)}
        >
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="rounded" />
            {t("auth.login.rememberMe")}
          </label>
          <button
            type="button"
            className="text-sm text-indigo-600 hover:underline"
          >
            {t("auth.login.forgotPassword")}
          </button>
        </div>
        <button ref={buttonRef} type="submit"></button>
      </form>
    );
  };

  // Signup form with sequential field animations
  const SignupForm: React.FC<{
    fieldDelay: (i: number) => React.CSSProperties;
  }> = ({ fieldDelay }) => {
    const { t } = useTranslation();
    return (
      <form className="space-y-4" onSubmit={handleSignUp}>
        <div className="opacity-0 animate-fadeInUp" style={fieldDelay(0)}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.register.name")}
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={t("auth.register.name")}
          />
        </div>

        <div className="opacity-0 animate-fadeInUp" style={fieldDelay(1)}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.register.email")}
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={t("auth.register.email")}
          />
        </div>

        <div className="opacity-0 animate-fadeInUp" style={fieldDelay(2)}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.register.password")}
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={t("auth.register.password")}
          />
        </div>

        <div className="opacity-0 animate-fadeInUp" style={fieldDelay(3)}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.register.confirmPassword")}
          </label>
          <input
            type="password"
            name="rpassword"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder={t("auth.register.confirmPassword")}
          />
        </div>
        <button ref={buttonRef} onClick={handleClick} type="submit"></button>
      </form>
    );
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* Dialog container */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            role="dialog"
            aria-modal="true"
            className={`
              w-full max-w-md rounded-xl bg-white shadow-2xl
              ${
                exiting
                  ? isRTL
                    ? "animate-slideOutRTL"
                    : "animate-slideOutLTR"
                  : isRTL
                  ? "animate-slideInRTL"
                  : "animate-slideInLTR"
              }
            `}
            style={{
              marginTop: "460px",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {mode === "login"
                  ? t("auth.login.title")
                  : t("auth.register.title")}
              </h2>

              <div className="flex items-center gap-2">
                {/* Language toggle */}
                <button
                  type="button"
                  className="text-sm px-2 py-1 rounded border hover:bg-gray-50"
                  onClick={() => i18n.changeLanguage(isRTL ? "en" : "ar")}
                >
                  {isRTL ? "EN" : "AR"}
                </button>

                {/* Close button */}
                <button
                  type="button"
                  aria-label={t("auth.common.cancel")}
                  className="p-2 rounded hover:bg-gray-100"
                  onClick={handleClose}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {mode === "login" ? (
                <LoginForm fieldDelay={fieldDelay} />
              ) : (
                <SignupForm fieldDelay={fieldDelay} />
              )}

              {/* Footer: mode switch */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  className="text-indigo-600 hover:underline"
                  onClick={switchMode}
                >
                  {mode === "login"
                    ? t("auth.login.createAccount")
                    : t("auth.register.signIn")}
                </button>

                <button
                  onClick={triggerClick}
                  type="button"
                  className="px-4 py-2 rounded bg-pink-800 text-white hover:bg-pink-900 transition"
                >
                  {mode === "login"
                    ? t("auth.login.signIn")
                    : t("auth.register.signUp")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogAuth;
