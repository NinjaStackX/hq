import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/i18n/config";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cart from "./pages/payments/Cart";
import About from "./pages/about/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/products/Products";
import ProductDetail from "./pages/products/ProductDetail";
import Categories from "./pages/categories/Categories";
import AdminOrders from "./pages/admin/AdminOrders";
import CustomerOrders from "./pages/payments/CustomerOrders";

import Provider from "./store/Provider";
import Contact from "./pages/cantact/Contact";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Provider />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
