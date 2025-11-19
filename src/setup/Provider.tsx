import { fetchReadCategories } from "@/store/thunks/categoriesThunk";
import { fetchReadProducts } from "@/store/thunks/productsThunk";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { toast } from "sonner";

const Provider = () => {
  const feteched = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (feteched.current) return;
    feteched.current = true;

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
