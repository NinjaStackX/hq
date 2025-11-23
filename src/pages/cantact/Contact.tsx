import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground"></p>
          </div>

          <Card className="p-8 backdrop-blur-sm bg-background/50">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6"></p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 rounded-lg bg-primary/5">
                  <h3 className="text-xl font-bold mb-3 ">
                    {t("contact.subtitle")}
                    <br />
                    <br />
                  </h3>
                  <p> {t("contact.description")} </p>
                </div>
              </div>
              {/*
                <div className="p-6 rounded-lg bg-secondary/5">
                  <h3 className="text-xl font-bold mb-3">رسالتنا</h3>
                  <p>
                    تقديم منتجات عالية الجودة بأسعار تنافسية مع خدمة عملاء
                    متميزة وتوصيل سريع.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6">لماذا تختار HQ؟</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm mt-1">
                      ✓
                    </span>
                    <span>منتجات أصلية بضمان 100%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm mt-1">
                      ✓
                    </span>
                    <span>توصيل سريع لجميع مناطق المملكة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm mt-1">
                      ✓
                    </span>
                    <span>خدمة عملاء متاحة على مدار الساعة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm mt-1">
                      ✓
                    </span>
                    <span>أسعار تنافسية وعروض خاصة</span>
                  </li>
                </ul>
              </div> */}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
