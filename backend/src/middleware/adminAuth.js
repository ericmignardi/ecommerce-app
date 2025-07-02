import jsonwebtoken from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    const tokenDecode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    next();
  } catch (error) {
    console.error("Error in adminAuth: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
