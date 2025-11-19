import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const FeaturedProducts = () => {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const featured = items.filter((p) => p.is_featured) || [];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            منتجات <span className="gradient-text">مميزة</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اكتشف أفضل منتجاتنا المختارة بعناية لك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {error && <p>Error: {error}</p>}
          {loading && <p>Loading...</p>}
          {items &&
            featured.map((product, index) => (
              <div
                key={product.id}
                className="group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-card rounded-2xl overflow-hidden hover-lift border border-border/50 hover:border-primary/30 transition-all duration-300">
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        className="bg-white text-primary hover:bg-white/90 shadow-lg"
                      >
                        <ShoppingCart className="w-4 h-4 ml-2" />
                        أضف للسلة
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">
                        {product.price_syp} ل.س
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice} ل.س
                      </span>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-primary/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
        </div>
        {items && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              عرض جميع المنتجات
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
