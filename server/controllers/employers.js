import Employer from "../models/Employer.js";

//! CREATE

export const createEmployer = async (req, res, next) => {
  const newEmployer = new Employer(req.body);

  try {
    const savedEmployer = await newEmployer.save();

    res.status(200).json(savedEmployer);
  } catch (err) {
    next(err);
  }
};

//! UPDATE

export const updateEmployer = async (req, res, next) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      // update immediately
      { new: true }
    );
    res.status(200).json(updatedEmployer);
  } catch (err) {
    next(err);
  }
};

//! DELETE

export const deleteEmployer = async (req, res, next) => {
  try {
    await Employer.findByIdAndDelete(req.params.id);
    res.status(200).json(`Employer has been deleted`);
  } catch (err) {
    next(err);
  }
};

//! GET

export const getEmployer = async (req, res, next) => {
  try {
    const employer = await Employer.findById(req.params.id);

    res.status(200).json(employer);
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllEmployers = async (req, res, next) => {
  try {
    const employers = await Employer.find();
    res.status(200).json(employers);
  } catch (err) {
    next(err);
  }
};

