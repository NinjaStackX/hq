import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store3";
import { removeFromCart, updateQuantity } from "@/store3/slices/cartSlice";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("cart.title")}
          </h1>

          {items.length === 0 ? (
            <Card className="p-12 text-center backdrop-blur-sm bg-background/50">
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground/30" />
              <p className="text-xl text-muted-foreground mb-6">
                {t("cart.empty")}
              </p>
              <Button asChild>
                <Link to="/">{t("cart.continue")}</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="p-6 backdrop-blur-sm bg-background/50 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-6">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold mb-4">
                          {item.price} {t("products.price")}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: item.quantity - 1,
                                    })
                                  );
                                }
                              }}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                  })
                                )
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t("cart.remove")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 h-fit backdrop-blur-sm bg-background/50 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">{t("cart.total")}</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>{t("cart.total")}</span>
                    <span className="font-bold text-primary">
                      {total.toFixed(2)} {t("products.price")}
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  {t("cart.checkout")}
                </Button>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
