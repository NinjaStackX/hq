import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { mockProducts, mockCategories } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Package,
  Users,
  ShoppingCart,
  Settings,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import FeaturedProducts from "@/components/FeaturedProducts";
import {
  fetchCreateProduct,
  fetchDelProduct,
  fetchUpdateProduct,
} from "@/store/thunks/productsThunk";
import {
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
} from "@/store/thunks/categoriesThunk";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(mockProducts);
  const { items, error } = useSelector((state) => state.products);
  useEffect(() => {
    setProducts(items);
  }, [dispatch, items]);
  const { t } = useTranslation();
  const { toast } = useToast();
  const categories = useSelector((state) => state.categories);
  const [loading] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const [productForm, setProductForm] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price_syp: "",
    price_usd: "",
    stock: 1,
    category_id: "",
    image_url: "",
    is_featured: false,
  });

  const [categoryForm, setCategoryForm] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    image_url: "",
  });

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editingProduct);
    if (editingProduct) {
      dispatch(fetchUpdateProduct({ id: editingProduct.id, ...productForm }));
      setEditingProduct("");
    } else dispatch(fetchCreateProduct(productForm));

    setIsProductDialogOpen(false);
    resetProductForm();
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editingCategory);
    if (editingCategory) {
      dispatch(
        fetchUpdateCategory({ id: editingCategory.id, ...categoryForm })
      );
      setEditingProduct("");
    } else dispatch(fetchCreateCategory(categoryForm));

    setIsCategoryDialogOpen(false);
    resetCategoryForm();
  };

  const handleDeleteProduct = async (id: string) => {
    dispatch(fetchDelProduct(id));
  };

  const handleDeleteCategory = async (id: string) => {
    dispatch(fetchDeleteCategory(id));
  };

  const openEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name_ar: product.name_ar,
      name_en: product.name_en,
      description_ar: product.description_ar || "",
      description_en: product.description_en || "",
      price_syp: product.price_syp?.toString() || "",
      price_usd: product.price_usd?.toString() || "",
      stock: product.stock.toString(),
      category_id: product.category_id,
      image_url: product.image_url || "",
      is_featured: product.is_featured,
    });
    setIsProductDialogOpen(true);
  };

  const openEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryForm({
      name_ar: category.name_ar,
      name_en: category.name_en,
      description_ar: category.description_ar || "",
      description_en: category.description_en || "",
      image_url: category.image_url || "",
    });
    setIsCategoryDialogOpen(true);
  };

  const resetProductForm = () => {
    setProductForm({
      name_ar: "",
      name_en: "",
      description_ar: "",
      description_en: "",
      price_syp: "",
      price_usd: "",
      stock: 0,
      category_id: "4",
      image_url: "",
      is_featured: false,
    });
    setEditingProduct(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name_ar: "",
      name_en: "",
      description_ar: "",
      description_en: "",
      image_url: "",
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
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("admin.dashboard")}
          </h1>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="backdrop-blur-sm bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("admin.products")}
                </CardTitle>
                <Package className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("admin.categories")}
                </CardTitle>
                <Settings className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length}</div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("admin.orders")}
                </CardTitle>
                <ShoppingCart className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("admin.users")}
                </CardTitle>
                <Users className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-4">
            <TabsList className="bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="products">{t("admin.products")}</TabsTrigger>
              <TabsTrigger value="categories">
                {t("admin.categories")}
              </TabsTrigger>
              <TabsTrigger value="orders">{t("admin.orders")}</TabsTrigger>
              <TabsTrigger value="users">{t("admin.users")}</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <Card className="backdrop-blur-sm bg-background/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{t("admin.products")}</CardTitle>
                    <Dialog
                      open={isProductDialogOpen}
                      onOpenChange={(open) => {
                        setIsProductDialogOpen(open);
                        if (!open) {
                          setEditingProduct(null);
                          resetProductForm();
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-secondary">
                          <Plus className="w-4 h-4 mr-2" />
                          {t("admin.addProduct")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {editingProduct
                              ? "تعديل المنتج"
                              : t("admin.addProduct")}
                          </DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleProductSubmit}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>الاسم بالعربية *</Label>
                              <Input
                                required
                                value={productForm.name_ar}
                                onChange={(e) =>
                                  setProductForm({
                                    ...productForm,
                                    name_ar: e.target.value,
                                  })
                                }
                                placeholder="اسم المنتج بالعربية"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Name in English *</Label>
                              <Input
                                required
                                value={productForm.name_en}
                                onChange={(e) =>
                                  setProductForm({
                                    ...productForm,
                                    name_en: e.target.value,
                                  })
                                }
                                placeholder="Product name in English"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>الوصف بالعربية</Label>
                              <Textarea
                                value={productForm.description_ar}
                                onChange={(e) =>
                                  setProductForm({
                                    ...productForm,
                                    description_ar: e.target.value,
                                  })
                                }
                                placeholder="وصف المنتج بالعربية"
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Description in English</Label>
                              <Textarea
                                value={productForm.description_en}
                                onChange={(e) =>
                                  setProductForm({
                                    ...productForm,
                                    description_en: e.target.value,
                                  })
                                }
                                placeholder="Product description in English"
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>السعر بالليرة السورية *</Label>
                              <Input
                                type="number"
                                step="1"
                                required
                                value={productForm.price_syp}
                                onChange={(e) =>
                                  setProductForm({
                                    ...productForm,
                                    price_syp: e.target.value,
                                  })
                                }
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>السعر بالدولار *</Label>
                              <Input
                                type="number"
                                step="0.01"
                                required
                                value={productForm.price_usd}
                                onChange={(e) =>
                                  setProductForm({
                                    ...productForm,
                                    price_usd: e.target.value,
                                  })
                                }
                                placeholder="0.00"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>الكمية *</Label>
                              <Input
                                type="number"
                                required
                                value={productForm.stock}
                                onChange={(e) =>
                                  setProductForm({
                                    ...productForm,
                                    stock: Number(e.target.value),
                                  })
                                }
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>الفئة *</Label>
                              <Select
                                value={productForm.category_id}
                                onValueChange={(value) =>
                                  setProductForm({
                                    ...productForm,
                                    category_id: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الفئة" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories?.items &&
                                    categories?.items.map((cat) => (
                                      <SelectItem key={cat.id} value={cat.id}>
                                        {cat.name_ar}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>رابط الصورة</Label>
                            <Input
                              type="url"
                              value={productForm.image_url}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  image_url: e.target.value,
                                })
                              }
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="is_featured"
                              checked={productForm.is_featured}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  is_featured: e.target.checked,
                                })
                              }
                              className="w-4 h-4"
                            />
                            <Label htmlFor="is_featured">منتج مميز</Label>
                          </div>

                          <div className="flex gap-2 justify-end">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsProductDialogOpen(false)}
                            >
                              {t("admin.cancel")}
                            </Button>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-primary to-secondary"
                            >
                              {t("admin.save")}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {products.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      لا توجد منتجات حالياً
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((product) => (
                        <div
                          key={product.id}
                          className="p-4 border rounded-lg flex gap-4 hover:bg-primary/5"
                        >
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.name_ar}
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium">{product.name_ar}</h3>
                            <p className="text-sm text-muted-foreground">
                              {product.name_en}
                            </p>
                            <div className="flex gap-4 mt-2 text-sm">
                              <span>
                                السعر: {product.price_syp} ل.س / $
                                {product.price_usd}
                              </span>
                              <span>الكمية: {product.stock}</span>
                              {product.is_featured && (
                                <span className="text-primary">⭐ مميز</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditProduct(product)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <Card className="backdrop-blur-sm bg-background/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{t("admin.categories")}</CardTitle>
                    <Dialog
                      open={isCategoryDialogOpen}
                      onOpenChange={(open) => {
                        setIsCategoryDialogOpen(open);
                        if (!open) {
                          setEditingCategory(null);
                          resetCategoryForm();
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-secondary">
                          <Plus className="w-4 h-4 mr-2" />
                          {t("admin.addCategory")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingCategory
                              ? "تعديل الفئة"
                              : t("admin.addCategory")}
                          </DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleCategorySubmit}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>الاسم بالعربية *</Label>
                              <Input
                                required
                                value={categoryForm.name_ar}
                                onChange={(e) =>
                                  setCategoryForm({
                                    ...categoryForm,
                                    name_ar: e.target.value,
                                  })
                                }
                                placeholder="اسم الفئة بالعربية"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Name in English *</Label>
                              <Input
                                required
                                value={categoryForm.name_en}
                                onChange={(e) =>
                                  setCategoryForm({
                                    ...categoryForm,
                                    name_en: e.target.value,
                                  })
                                }
                                placeholder="Category name in English"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>الوصف بالعربية</Label>
                              <Textarea
                                value={categoryForm.description_ar}
                                onChange={(e) =>
                                  setCategoryForm({
                                    ...categoryForm,
                                    description_ar: e.target.value,
                                  })
                                }
                                placeholder="وصف الفئة بالعربية"
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Description in English</Label>
                              <Textarea
                                value={categoryForm.description_en}
                                onChange={(e) =>
                                  setCategoryForm({
                                    ...categoryForm,
                                    description_en: e.target.value,
                                  })
                                }
                                placeholder="Category description in English"
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>رابط الصورة</Label>
                            <Input
                              type="url"
                              value={categoryForm.image_url}
                              onChange={(e) =>
                                setCategoryForm({
                                  ...categoryForm,
                                  image_url: e.target.value,
                                })
                              }
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>

                          <div className="flex gap-2 justify-end">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsCategoryDialogOpen(false)}
                            >
                              {t("admin.cancel")}
                            </Button>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-primary to-secondary"
                            >
                              {t("admin.save")}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {categories.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      لا توجد فئات حالياً
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {categories?.items &&
                        categories?.items.map((cat) => (
                          <div
                            key={cat.id}
                            className="p-4 border rounded-lg flex gap-4 hover:bg-primary/5"
                          >
                            {cat.image_url && (
                              <img
                                src={cat.image_url}
                                alt={cat.name_ar}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="font-medium">{cat.name_ar}</h3>
                              <p className="text-sm text-muted-foreground">
                                {cat.name_en}
                              </p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditCategory(cat)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteCategory(cat.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="backdrop-blur-sm bg-background/50">
                <CardHeader>
                  <CardTitle>{t("admin.orders")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    قائمة الطلبات ستظهر هنا
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card className="backdrop-blur-sm bg-background/50">
                <CardHeader>
                  <CardTitle>{t("admin.users")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    قائمة المستخدمين ستظهر هنا
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
