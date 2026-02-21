import Product from "../models/Product.js";

//! CREATE


export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

//! UPDATE

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      // update immediately
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "الصنف غير موجود" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

//! DELETE


export const deleteProduct = async (req, res, next) => {
  const typeid = req.params.typeid;

  try {
    await Product.findByIdAndDelete(req.params.id);
    try {
      await Type.findByIdAndUpdate(typeid, {
        $pull: { products: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(`Product has been deleted`);
  } catch (err) {
    next(err);
  }
};

//! GET

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    .populate({
      path: "supplair",
      select: "name",
            match:{_id:{$exist:true}},

      strictPopulate: false,
    })
    


    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    .populate({
      path: "supplair",
      select: "name",
      match:{_id:{$exist:true}},
      strictPopulate: false,
    })
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

//! count All

  export const countAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products.length);
  } catch (err) {
    next(err);
  }
};

