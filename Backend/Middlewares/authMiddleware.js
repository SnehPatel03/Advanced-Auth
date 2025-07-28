  import jwt from "jsonwebtoken";
  import { User } from "../model/userModel.js";

  export const authorize = async (req, res, next) => {
    const {token} = req.cookies;
   
    if (!token) {
      return res.status(400).json({ message: "Unauhtrize" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECERATE_KEY);
      req.user = await User.findById(decoded.id).select("+password");
      next();
    } catch (error) {
      console.log("error in token",error)
      return res.status(400).json({ message: "Error in token verifying" });
    }
  };