import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "من نحن", href: "#about" },
      { name: "اتصل بنا", href: "#contact" },
      { name: "الوظائف", href: "#careers" },
      { name: "المدونة", href: "#blog" },
    ],
    shop: [
      { name: "ملابس", href: "#clothing" },
      { name: "إلكترونيات", href: "#electronics" },
      { name: "عناية شخصية", href: "#useral-care" },
      { name: "عروض خاصة", href: "#deals" },
    ],
    support: [
      { name: "الشحن والتوصيل", href: "#shipping" },
      { name: "سياسة الاسترجاع", href: "#returns" },
      { name: "الأسئلة الشائعة", href: "#faq" },
      { name: "الدعم الفني", href: "#support" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">HQ</span>
              </div>
              <span className="text-2xl font-bold gradient-text">متجر HQ</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              متجرك الإلكتروني الموثوق لأفضل المنتجات بأسعار منافسة وجودة عالية.
              نسعى دائماً لتقديم تجربة تسوق مميزة لعملائنا الكرام.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>920031298</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>info@hqstore.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="w-5 h-5" />
                <span>المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-bold text-lg mb-4">الشركة</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">تسوق</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">الدعم</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © 2025 متجر HQ. جميع الحقوق محفوظة.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">طرق الدفع:</span>
            <div className="flex gap-2">
              <div className="w-12 h-8 bg-secondary/50 rounded flex items-center justify-center text-xs font-semibold">
                VISA
              </div>
              <div className="w-12 h-8 bg-secondary/50 rounded flex items-center justify-center text-xs font-semibold">
                MADA
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
