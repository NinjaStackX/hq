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
import { getById } from "@/api/getById";

const Provider = () => {
  const fetched = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    const feti = async () => {
      const userId = Cookies.get("user_id") ?? "";

      const user = (await getById("users", Number(userId))) || {};
      console.log("====)))>>", user);

      dispatch(setUserAuth(user));
    };

    feti();
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
