import User from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await User.findByIdAndUpdate(userId, {
      cartData,
    });
    res.status(201).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addToCart: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, {
      cartData,
    });
    res.status(200).json({ success: true, message: "Updated cart" });
  } catch (error) {
    console.error("Error in updateCart: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getUserCart: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
