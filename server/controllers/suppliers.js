import Store from "../models/Store.js";
import Supplier from "../models/Supplier.js";

//! CREATE

export const createSupplier = async (req, res, next) => {

  try {
        const store =await Store.findById(req.body.store)
        if(!store){
          return res.status(400).json({message:"store not exist"})
        }
        const newSupplier = new Supplier(req.body);
        const savedSupplier = await newSupplier.save();
        res.status(200).json(savedSupplier);
      } catch (err) {
    next(err);
  }
};
// export const createSupplier = async (req, res, next) => {
//   const newSupplier = new Supplier(req.body);

//   try {
//     const storeInput = req.body.storeInput

//     const isObjectId = (id)=> /^[0-9a-fA-F]{24}/.test(id)

//     if(isObjectId(storeInput)){
//       const store =await Store.findById(storeInput)
//       if(!store){
//         return res.status(400).json({message :"No Store by this ID"})
//       }else{
//         const store = await Store.findOne({name: storeInput})
//         return res.status(400).json({message :`Store${storeInput} doesn't exist`})
//       }
//       req.body.store = store._id
//     }

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
    const supplier = await Supplier.findById(req.params.id)
    .populate({
      path: "store",
      select: "name",
      strictPopulate: false,
    })
    if(!supplier) {return res.status(400).json({message:"المورد غير موجود"})}
    res.status(200).json(supplier);
  } catch (err) {
    next(err);
  }
};
//! GET ALL
export const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find()
    .populate({
      path: "store",
      select: "name",
      strictPopulate: false,
    })
    res.status(200).json(suppliers);
  } catch (err) {
    next(err);
  }
};

