import { useState, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store3";
import { addMessage, Order } from "@/store3/slices/ordersSlice";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  processing: "bg-purple-500",
  shipped: "bg-indigo-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const CustomerOrders = memo(() => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = useCallback(() => {
    if (!selectedOrder || !messageText.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "customer" as const,
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage({ orderId: selectedOrder.id, message }));
    setMessageText("");
    toast.success(t("orders.messageSent"));
  }, [selectedOrder, messageText, dispatch, t]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{t("orders.myOrders")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders List */}
          <div className="space-y-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {sortedOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center text-muted-foreground">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">{t("orders.noOrders")}</p>
                    <p className="text-sm mt-2">{t("orders.startShopping")}</p>
                  </CardContent>
                </Card>
              ) : (
                sortedOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={`mb-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedOrder?.id === order.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {t("orders.order")} #{order.id.slice(0, 8)}
                        </CardTitle>
                        <Badge className={statusColors[order.status]}>
                          {t(`orders.status.${order.status}`)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">
                          {order.total.toFixed(0)}{" "}
                          {order.currency === "SYP" ? "ل.س" : "$"}
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(
                            i18n.language
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} {t("orders.items")}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </ScrollArea>
          </div>

          {/* Order Details */}
          <div>
            {selectedOrder ? (
              <Card>
                <CardHeader>
                  <CardTitle>{t("orders.orderDetails")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Info */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {t("orders.orderNumber")}
                    </p>
                    <p className="font-semibold">#{selectedOrder.id}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t("orders.orderedOn")}
                    </p>
                    <p>
                      {new Date(selectedOrder.createdAt).toLocaleString(
                        i18n.language
                      )}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t("orders.currentStatus")}
                    </p>
                    <Badge
                      className={`${
                        statusColors[selectedOrder.status]
                      } text-lg px-4 py-2`}
                    >
                      {t(`orders.status.${selectedOrder.status}`)}
                    </Badge>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-3">{t("orders.items")}</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 p-2 bg-muted rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} x {item.price.toFixed(0)}
                              {item.size
                                ? ` - ${t("product.size")}: ${item.size}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-bold text-lg">
                        <span>{t("orders.total")}:</span>
                        <span>
                          {selectedOrder.total.toFixed(0)}{" "}
                          {selectedOrder.currency === "SYP" ? "ل.س" : "$"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Section */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      {t("orders.chat")}
                    </h3>
                    <ScrollArea className="h-64 border rounded-lg p-4 mb-3">
                      {selectedOrder.messages.length === 0 ? (
                        <p className="text-center text-muted-foreground">
                          {t("orders.noMessages")}
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {selectedOrder.messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`p-3 rounded-lg ${
                                msg.sender === "customer"
                                  ? "bg-primary text-primary-foreground ml-8"
                                  : "bg-muted mr-8"
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {new Date(msg.timestamp).toLocaleString(
                                  i18n.language
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                    <div className="flex gap-2">
                      <Input
                        placeholder={t("orders.typeMessage")}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <Button onClick={handleSendMessage} size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center text-muted-foreground p-8">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>{t("orders.selectOrder")}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
});

CustomerOrders.displayName = "CustomerOrders";

export default CustomerOrders;
