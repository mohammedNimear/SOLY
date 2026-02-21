import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './db/connection.js'
import authRoute from './routes/auth.js'
import employersRoute from './routes/employers.js'
import suppliersRoute from './routes/suppliers.js'
import salesRoute from './routes/sales.js'
import storesRoute from './routes/stores.js'
import productsRoute from './routes/products.js'
import usersRoute from './routes/users.js'
import customersRoute from './routes/customers.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
// using json in app
app.use(express.json());

// using cookieParser in app             <Route path="getByStock">

app.use(cookieParser());

app.use("/api/auth", authRoute)
app.use("/api/employers", employersRoute)
app.use("/api/suppliers", suppliersRoute)
app.use("/api/sales", salesRoute)

app.use("/api/stores", storesRoute)
app.use("/api/products", productsRoute)

app.use("/api/users", usersRoute)
app.use("/api/customers", customersRoute)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "حدث خطأ غير متوقع !";
  return res.status(errorStatus).json({
    success: false,
    error: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});



const port = process.env.PORT || 3310;
app.listen(port, ()=>{
    connectDB(); 
    console.log(`Server on port:${port}`)
})