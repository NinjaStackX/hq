import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Globe,
  Package,
  Grid3x3,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SearchDialog from "@/components/SearchDialog";
import DialogAuth from "@/components/auth/DialogAuth";

const BtnAuth = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.users);

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <>
      {user.currentUser?.length == 0 && (
        <button
          className="px-6 py-1 rounded bg-pink-800 text-white hover:bg-pink-900"
          onClick={() => setOpen(true)}
        >
          {t("auth.login.title")}
          <hr className="m-1" /> {t("auth.register.title")}
        </button>
      )}
      {user.currentUser?.length() >= 1 && (
        <>
          <button>{user.currentUser.id}</button>
        </>
      )}
    </>
  );
};

export default BtnAuth;
