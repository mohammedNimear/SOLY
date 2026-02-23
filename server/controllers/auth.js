import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//! REGISTER 

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser)
      return next(createError(400, "اسم المستخدم موجود بالفعل"));
    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // creating the user
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res
      .status(200)
      .send(
        `  تم إنشاء حساب ${req.body.username} بنجاح! .`
      );
  } catch (err) {
    next(err);
  }
};

//! LOGIN
export const login = async (req, res, next) => {
  try {
    // checking if the User is found
    const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] });
    if (!user)
      return next(createError(404, `المستخدم ${req.body.username} غير موجود`));
    // checking if the password is correct
    const isMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isMatched)
      return next(createError(400, "خطأ في اسم المستخدم أو كلمة المرور"));
    // setting the user's token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "1d" }
    );
    // filtering the user's password and token role before sending
    const { password, ...otherDetails } = user._doc;
    // send cookie & user Details
    res
      .cookie("access_token", token, { 
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // يوم واحد
      })
      .status(200)
      .json({
        details: { ...otherDetails }, 
        isAdmin: user.isAdmin,
        message: `مرحبا ${user.username}، تم تسجيل الدخول بنجاح!`
        });
  } catch (err) {
    next(err);
  }
};
