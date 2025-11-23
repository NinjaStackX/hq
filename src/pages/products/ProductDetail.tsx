import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Share2, ChevronLeft, Ruler } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);

  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const prod = items.find((p) => p.id == id);
    if (prod) {
      setProduct(prod);
      const similar = items
        .filter((p) => p.category_id == prod.category_id && p.id != id)
        .slice(0, 4);
      setSimilarProducts(similar);
    }
  }, [items, id]);

  const handleAddToCart = () => {
    if (
      !selectedSize &&
      product.categories?.name_en?.toLowerCase().includes("cloth")
    ) {
      toast({
        title: t("product.selectSize"),
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name_ar,
        price: product.price_syp,
        quantity: 1,
        image: product.image_url,
      })
    );
    toast({
      title: t("products.addToCart"),
      description: `${product.name_ar} ${t("cart.added")}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t("product.notFound")}</h2>
            <Button onClick={() => navigate("/products")}>
              {t("products.backToProducts")}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <Button
            variant="ghost"
            onClick={() => navigate("/products")}
            className="mb-6 hover:bg-primary/10"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t("products.backToProducts")}
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product[`name_${i18n.language}`]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingCart className="w-24 h-24" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-3 bg-gradient-to-r from-primary to-secondary">
                  {i18n.language === "ar"
                    ? product.categories?.name_ar
                    : product.categories?.name_en}
                </Badge>
                <h1 className="text-4xl font-bold mb-2">
                  {product[`name_${i18n.language}`]}
                </h1>
                <p className="text-3xl font-bold text-primary">
                  {product.price} {t("products.price")}
                </p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {i18n.language === "ar"
                  ? product.description_ar
                  : product.description_en}
              </p>

              {/* Size Selection */}
              {product.categories?.name_en?.toLowerCase().includes("cloth") && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    <h3 className="font-semibold">{t("product.size")}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        className={
                          selectedSize === size
                            ? "bg-gradient-to-r from-primary to-secondary"
                            : ""
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-lg h-14"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock === 0
                    ? t("products.outOfStock")
                    : t("products.addToCart")}
                </Button>
                <Button size="lg" variant="outline" className="h-14">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="pt-6 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("product.availability")}
                  </span>
                  <span
                    className={
                      product.stock > 0 ? "text-green-600" : "text-destructive"
                    }
                  >
                    {product.stock > 0
                      ? `${product.stock} ${t("product.inStock")}`
                      : t("products.outOfStock")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8">
                {t("product.similarProducts")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((p) => (
                  <Card
                    key={p.id}
                    className="group hover-lift cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={i18n.language === "ar" ? p.name_ar : p.name_en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingCart className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">
                        {i18n.language === "ar" ? p.name_ar : p.name_en}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        {p.price} {t("products.price")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
