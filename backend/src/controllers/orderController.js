import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { stripe } from "../lib/stripe.js";

const currency = "CAD";
const deliveryCharge = 10;

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const order = new Order(orderData);
    await order.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const order = new Order(orderData);
    await order.save();
    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    lineItems.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items: lineItems,
      mode: "payment",
    });
    res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const response = await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
