import { create, read } from "@/api/crud";
import { supabase } from "@/integrations/supabase/client";
import { fetchReadCategories } from "@/store/thunks/categoriesThunk";
import { fetchReadProducts } from "@/store/thunks/productsThunk";
import { fetchReadUsers } from "@/store/thunks/usersThunck";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { setUserAuth } from "@/store/slices/usersSlice";

const Provider = () => {
  const feteched = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (feteched.current) return;
    feteched.current = true;

    // const userId = Cookies.get("userId") ?? "";
    // dispatch(setUserAuth, 1);
    dispatch(fetchReadProducts());
    dispatch(fetchReadCategories());

    toast.success("Items fetched successfully");
  }, [dispatch]);

  return <></>;
};

export default Provider;
// dispatch(addProduct(newProduct));
// dispatch(updateProduct(updatedProduct));
// dispatch(deleteProduct(productId));
