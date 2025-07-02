import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

export const create = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    const product = new Product(productData);
    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Successfully created product" });
  } catch (error) {
    console.error("Error in create: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const read = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in read: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const readById = async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error in readById: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "Successfully deleted product" });
  } catch (error) {
    console.error("Error in deleteById: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
