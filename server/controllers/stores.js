import Product from "../models/Product.js";
import Store from "../models/Store.js";

//! CREATE

export const createStore = async (req, res, next) => {
  const newStore = new Store(req.body);

  try {
    const savedStore = await newStore.save();

    res.status(200).json(savedStore);
  } catch (err) {
    next(err);
  }
};

//! UPDATE

export const updateStore = async (req, res, next) => {
    const updatedStore = async ()=> {
      const stores = await Store.find()
      for(const store of stores){
        for(const p of store.products){
          if(p.name && !p.product){
            const product = await Product.findOne({name:p.name})
            if(product){
              p.product = product._id
              delete p.name
            }
          }
        }
        await store.save()
      }
    }
  console.log("تم التحديث")
};

//! DELETE

export const deleteStore = async (req, res, next) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.status(200).json(`Store has been deleted`);
  } catch (err) {
    next(err);
  }
};

//! GET

export const getStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id)
    .populate("products.product", "name")
    .populate("manager", "name")


    res.status(200).json(store);
  } catch (err) {
    next(err);
  }
};

//! GET ALL

export const getAllStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
      const store = await Store.findById(req.params.id)
    .populate("products.product", "name")
    .populate("manager", "name")


    res.status(200).json(stores);
  } catch (err) {
    next(err);
  }
};

//! GET CRITICAL PRODUCTS

export const getCriticalProducts = async (req, res, next) => {
  try {
    const threhold = parseInt(req.query.threhold) || 5; // default threshold is 5
    const stores = await Store.find({}, 'name products');
      const criticalProducts = [];
      stores.forEach(store => {
        store.products.forEach(product => {
          if (product.quantity <= threhold) {
            criticalProducts.push({
              storeName: store.name,
              managerName: store.manager,
              productName: product.name,
              quantity: product.quantity
            });
          }
        });
      });
    res.status(200).json(criticalProducts);
  } catch (err) {
    next(err);
  }
};