import { create, read } from "@/api/crud";
import { supabase } from "@/integrations/supabase/client";
import { fetchReadCategories } from "@/store/thunks/categoriesThunk";
import { fetchReadProducts } from "@/store/thunks/productsThunk";
import { fetchReadUsers } from "@/store/thunks/usersThunck";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { toast } from "sonner";

const Provider = () => {
  const feteched = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select(`
    id,
    status,
    orderdetails (
      id,
      quantity,
      products (
        id,
        name_ar
      )
    )
  `);

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        console.log("Orders with details:", data);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (feteched.current) return;
    feteched.current = true;

    dispatch(fetchReadProducts());
    dispatch(fetchReadCategories());
    dispatch(fetchReadUsers());
    toast.success("Items fetched successfully");
  }, [dispatch]);

  return <></>;
};

export default Provider;
// dispatch(addProduct(newProduct));
// dispatch(updateProduct(updatedProduct));
// dispatch(deleteProduct(productId));
