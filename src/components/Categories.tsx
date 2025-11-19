import { Shirt, Laptop, Sparkles, Watch, Camera, Headphones } from "lucide-react";

const categories = [
  {
    name: "ملابس",
    icon: Shirt,
    color: "from-purple-500 to-violet-500",
    count: "250+ منتج",
  },
  {
    name: "إلكترونيات",
    icon: Laptop,
    color: "from-violet-500 to-purple-500",
    count: "180+ منتج",
  },
  {
    name: "عناية شخصية",
    icon: Sparkles,
    color: "from-fuchsia-500 to-pink-500",
    count: "120+ منتج",
  },
  {
    name: "ساعات",
    icon: Watch,
    color: "from-indigo-500 to-purple-500",
    count: "90+ منتج",
  },
  {
    name: "كاميرات",
    icon: Camera,
    color: "from-purple-500 to-fuchsia-500",
    count: "75+ منتج",
  },
  {
    name: "سماعات",
    icon: Headphones,
    color: "from-violet-500 to-indigo-500",
    count: "110+ منتج",
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            تسوق حسب <span className="gradient-text">الفئة</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر من بين مجموعة واسعة من الفئات المتنوعة
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl p-6 bg-card hover-lift cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Glass Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>

                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-[var(--shadow-glow)] transition-all duration-300 group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </div>

                {/* Blur Effect Circle */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
