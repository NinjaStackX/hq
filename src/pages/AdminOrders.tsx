import { useState, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store3";
import {
  updateOrderStatus,
  addMessage,
  Order,
} from "@/store3/slices/ordersSlice";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const AdminOrders = memo(() => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [messageText, setMessageText] = useState("");

  const handleStatusChange = useCallback(
    (orderId: string, status: Order["status"]) => {
      dispatch(updateOrderStatus({ id: orderId, status }));
      toast.success(t("admin.statusUpdated"));
    },
    [dispatch, t]
  );

  const handleSendMessage = useCallback(() => {
    if (!selectedOrder || !messageText.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "admin" as const,
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage({ orderId: selectedOrder.id, message }));
    setMessageText("");
    toast.success(t("admin.messageSent"));
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
        <h1 className="text-4xl font-bold mb-8">
          {t("admin.ordersManagement")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              {t("admin.allOrders")}
            </h2>
            <ScrollArea className="h-[calc(100vh-250px)]">
              {sortedOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{t("admin.noOrders")}</p>
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
                        <div>
                          <CardTitle className="text-lg">
                            {order.customerName}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {order.customerEmail}
                          </p>
                        </div>
                        <Badge className={statusColors[order.status]}>
                          {t(`admin.status.${order.status}`)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <span>
                          {t("admin.total")}: {order.total.toFixed(0)}{" "}
                          {order.currency === "SYP" ? "ل.س" : "$"}
                        </span>
                        <span>
                          {new Date(order.createdAt).toLocaleDateString(
                            i18n.language
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {order.items.length} {t("admin.items")}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </ScrollArea>
          </div>

          {/* Order Details & Chat */}
          <div>
            {selectedOrder ? (
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.orderDetails")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold mb-2">
                      {t("admin.customerInfo")}
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>{t("admin.name")}:</strong>{" "}
                        {selectedOrder.customerName}
                      </p>
                      <p>
                        <strong>{t("admin.email")}:</strong>{" "}
                        {selectedOrder.customerEmail}
                      </p>
                      <p>
                        <strong>{t("admin.phone")}:</strong>{" "}
                        {selectedOrder.customerPhone}
                      </p>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="font-semibold mb-2 block">
                      {t("admin.updateStatus")}
                    </label>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) =>
                        handleStatusChange(
                          selectedOrder.id,
                          value as Order["status"]
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          {t("admin.status.pending")}
                        </SelectItem>
                        <SelectItem value="confirmed">
                          {t("admin.status.confirmed")}
                        </SelectItem>
                        <SelectItem value="processing">
                          {t("admin.status.processing")}
                        </SelectItem>
                        <SelectItem value="shipped">
                          {t("admin.status.shipped")}
                        </SelectItem>
                        <SelectItem value="delivered">
                          {t("admin.status.delivered")}
                        </SelectItem>
                        <SelectItem value="cancelled">
                          {t("admin.status.cancelled")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-2">{t("admin.items")}</h3>
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
                  </div>

                  {/* Chat Section */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      {t("admin.chat")}
                    </h3>
                    <ScrollArea className="h-64 border rounded-lg p-4 mb-3">
                      {selectedOrder.messages.length === 0 ? (
                        <p className="text-center text-muted-foreground">
                          {t("admin.noMessages")}
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {selectedOrder.messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`p-3 rounded-lg ${
                                msg.sender === "admin"
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
                        placeholder={t("admin.typeMessage")}
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
                  <p>{t("admin.selectOrder")}</p>
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

AdminOrders.displayName = "AdminOrders";

export default AdminOrders;
