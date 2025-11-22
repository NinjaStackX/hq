import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const { items, error } = useSelector((state) => state.products);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = items.filter(
        (p) =>
          p.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description_en?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    onOpenChange(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{t("nav.search")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <ScrollArea className="h-[400px]">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex gap-4 p-3 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                  >
                    <div className="w-16 h-16 rounded bg-muted flex-shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={
                            i18n.language === "ar"
                              ? product.name_ar
                              : product.name_en
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingCart className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">
                        {i18n.language === "ar"
                          ? product.name_ar
                          : product.name_en}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {i18n.language === "ar"
                          ? product.description_ar
                          : product.description_en}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        {product.price} {t("products.price")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-8 text-muted-foreground">
                {t("search.noResults")}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {t("search.startTyping")}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
