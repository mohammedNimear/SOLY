import Customer from "../models/Customer.js";

//! CREATE

export const createCustomer = async (req, res, next) => {
  const newCustomer = new Customer(req.body);

  try {
    const savedCustomer = await newCustomer.save();

    res.status(200).json(savedCustomer);
  } catch (err) {
    next(err);
  }
};

//! UPDATE

export const updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      // update immediately
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (err) {
    next(err);
  }
};

//! DELETE

export const deleteCustomer = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json(`Customer has been deleted`);
  } catch (err) {
    next(err);
  }
};

//! GET

export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

//! COUNT BY DUSTER dusterDetails

export const countByDuster = async (req, res, next) => {
  try {
    const dusterCount = await Customer.countDocuments({ duster: true });

    res.status(200).json(
      { duster: true, count: dusterCount }

    );
  } catch (err) {
    next(err);
  }
};

//! GET BY DUSTER Details

export const getByDuster = async (req, res, next) => {
  const dusters = req.query.duster
  try {
    const list = await Customer.find({ duster: true });

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};