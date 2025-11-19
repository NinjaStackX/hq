import { Star } from "lucide-react";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "عميل مميز",
    content: "تجربة تسوق رائعة! المنتجات ذات جودة عالية والتوصيل سريع جداً. أنصح الجميع بالتعامل مع متجر HQ",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "فاطمة أحمد",
    role: "عميلة دائمة",
    content: "خدمة عملاء ممتازة ومنتجات أصلية. أصبح متجر HQ وجهتي الأولى للتسوق الإلكتروني",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "خالد سعيد",
    role: "عميل جديد",
    content: "أسعار منافسة جداً وعروض مميزة. حصلت على أفضل صفقة للأجهزة الإلكترونية",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ماذا يقول <span className="gradient-text">عملاؤنا</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            آراء عملائنا الكرام حول تجربتهم مع متجر HQ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative bg-card rounded-2xl p-8 hover-lift border border-border/50 hover:border-primary/30 transition-all duration-300">
                {/* Quote Mark */}
                <div className="absolute top-6 right-6 text-6xl text-primary/10 font-serif">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/80 mb-6 leading-relaxed relative z-10">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
