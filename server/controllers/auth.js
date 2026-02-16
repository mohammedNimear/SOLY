import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//! REGISTER 

export const register = async (req, res, next) => {
  try {
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
        `welcome ${newUser.username} you registration has done successfully`
      );
  } catch (err) {
    next(err);
  }
};

//! LOGIN

export const login = async (req, res, next) => {
  try {
    // checking if the User is found
    const user = await User.findOne({ username: req.body.username });

    if (!user)
      return next(createError(404, `User ${req.body.username} not found`));

    // checking if the password is correct
    const isMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatched)
      return next(createError(400, "Wrong password or username!"));

    // setting the user's token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // filtering the user's password and token role before sending
    const { password, isAdmin, ...otherDetails } = user._doc;

    // send cookie & user Details
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
