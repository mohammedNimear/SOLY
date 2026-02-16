import Supplier from "../models/Supplier.js";

//! CREATE

export const createSupplier = async (req, res, next) => {
  const newSupplier = new Supplier(req.body);

  try {
    const savedSupplier = await newSupplier.save();

    res.status(200).json(savedSupplier);
  } catch (err) {
    next(err);
  }
};

//! UPDATE

export const updateSupplier = async (req, res, next) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      // update immediately
      { new: true }
    );
    res.status(200).json(updatedSupplier);
  } catch (err) {
    next(err);
  }
};

//! DELETE

export const deleteSupplier = async (req, res, next) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json(`Supplier has been deleted`);
  } catch (err) {
    next(err);
  }
};

//! GET

export const getSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    res.status(200).json(supplier);
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    next(err);
  }
};

