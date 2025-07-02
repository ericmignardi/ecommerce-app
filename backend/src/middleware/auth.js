import jsonwebtoken from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error in authUser: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
