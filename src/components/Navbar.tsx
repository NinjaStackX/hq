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
import BtnAuth from "./auth/BtnAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);

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
    <nav className="sticky top-0 z-50 glass-effect border-b border-white/20">
      <DialogAuth open={open} onClose={() => setOpen(false)} />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <span className="text-white font-bold text-2xl">HQ</span>
            </div>
            <span className="text-2xl font-bold gradient-text hidden sm:block">
              {t("nav.home")} HQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className="px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-colors"
                  >
                    {t("nav.home")}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10">
                    {t("nav.shop")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4 space-y-2">
                      <Link
                        to="/products"
                        className="block p-3 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-primary" />
                          <div>
                            <h4 className="font-medium">
                              {t("nav.allProducts")}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {t("nav.browseAll")}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/categories"
                        className="block p-3 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Grid3x3 className="w-5 h-5 text-primary" />
                          <div>
                            <h4 className="font-medium">
                              {t("categories.title")}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {t("nav.shopByCategory")}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {navLinks.slice(1).map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link
                      to={link.href}
                      className="px-4 py-2 text-foreground/80 hover:text-primary font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full hover:bg-primary/10 transition-all duration-300"
              title={i18n.language === "ar" ? "English" : "العربية"}
            >
              <Globe className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full hover:bg-primary/10 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-all duration-300 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-primary/10 transition-all duration-300 hidden md:inline-flex"
              >
                {t("nav.dashboard")}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            {/* ============== */}
            <BtnAuth />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-3 rounded-lg hover:bg-primary/10 text-foreground/80 hover:text-primary font-medium transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </nav>
  );
};

export default Navbar;
