import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { mockProducts, mockCategories } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store3/slices/cartSlice";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [products] = useState(mockProducts);
  const [categories] = useState(mockCategories);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        searchTerm === "" ||
        p.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.name_en.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || p.category_id === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price_syp - b.price_syp;
      if (sortBy === "price-high") return b.price_syp - a.price_syp;
      if (sortBy === "name") return a.name_ar.localeCompare(b.name_ar);
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  const handleAddToCart = (product: any) => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("products.allProducts")}
            </h1>
            <p className="text-muted-foreground">{t("products.browse")}</p>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t("nav.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("categories.all")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("categories.all")}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("products.newest")}</SelectItem>
                <SelectItem value="price-low">
                  {t("products.priceLow")}
                </SelectItem>
                <SelectItem value="price-high">
                  {t("products.priceHigh")}
                </SelectItem>
                <SelectItem value="name">{t("products.name")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t("products.noProducts")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover-lift overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={
                          i18n.language === "ar"
                            ? product.name_ar
                            : product.name_en
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingCart className="w-16 h-16" />
                      </div>
                    )}
                    {product.is_featured && (
                      <div className="absolute top-2 right-2 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                        {t("products.featured")}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">
                      {i18n.language === "ar"
                        ? product.name_ar
                        : product.name_en}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {i18n.language === "ar"
                        ? product.description_ar
                        : product.description_en}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {product.price_syp.toLocaleString()} ل.س
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {product.stock === 0
                          ? t("products.outOfStock")
                          : t("products.addToCart")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
