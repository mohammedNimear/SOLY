import Sale from "../models/Sale.js";

//! CREATE

export const createSale = async (req, res, next) => {
  const newSale = new Sale(req.body);

  try {
    const savedSale = await newSale.save();

    res.status(200).json(savedSale);
  } catch (err) {
    next(err);
  }
};

//! UPDATE

export const updateSale = async (req, res, next) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      // update immediately
      { new: true }
    );
    res.status(200).json(updatedSale);
  } catch (err) {
    next(err);
  }
};

//! DELETE

export const deleteSale = async (req, res, next) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.status(200).json(`Sale has been deleted`);
  } catch (err) {
    next(err);
  }
};

//! GET

export const getSale = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllSales = async (req, res, next) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

