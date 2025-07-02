import React from "react";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendURL } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axiosInstance.post(
        "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
