import User from "../models/User.js";

//! UPDATE

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "تم تحديث المستخدم بنجاح",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

//! DELETE

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "تم حذف المستخدم بنجاح",
    });
  } catch (err) {
    next(err);
  }
};

//! GET

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(createError(404, "المستخدم غير موجود"));
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    next(err);
  }
};
