import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("تم الاشتراك بنجاح! شكراً لانضمامك إلينا");
      setEmail("");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-10"></div>
      <div className="absolute inset-0 backdrop-blur-3xl"></div>

      {/* Animated Circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-12 border border-primary/20 shadow-[var(--shadow-elegant)]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                اشترك في <span className="gradient-text">نشرتنا البريدية</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                احصل على أحدث العروض والخصومات الحصرية مباشرة في بريدك الإلكتروني
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 px-6 text-lg rounded-xl border-2 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105"
              >
                اشترك الآن
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
