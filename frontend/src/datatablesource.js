//!
export const saleColumns = [
  // { field: "_id", headerName: "ID", width: 70 },
  {
    field: "employer",
    headerName: "الموظف",
    width: 150,
    valueGetter: (params) => {
      return params.row.employer?.name || "غير محدد";
    }
  },
  {
    field: "location",
    headerName: "النافذة",
    width: 130,
    valueGetter: (params) => {
      return params.row.store?.name || "غير محدد";
    }
  },

  {
    field: "note",
    headerName: "رقم وتاريخ الاشعار",  
    width: 150,
      valueGetter: (params) => {
      return params.row.payed ? params.row.note || "لا يوجد اشعار" : "لا يوجد اشعار";
    }
  },
  {
    field: "customer",
    headerName: "العميل المستلم",
    width: 150,
      valueGetter: (params) => {
        return params.row.customer?.name || "غير محدد";
      }
  },
  
  {
    field: "paymentMethod",
    headerName: "طريقة السداد",
    width: 120,
  }, 
  {
    field: "paymentDate",
    headerName: "تاريخ السداد ",
    width: 120,
    renderCell: (params) => {
          const status = params.row.status
          const paymentDate = params.value? new Date(params.value) : null
          const today = new Date();
          let color = "black"

          if(status === "متأخرة"){
            color = "red"
          }else if(status === "معلقة" && paymentDate ){
            const diffdays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24))
            if(diffdays <= 3 && diffdays >= 0){
              color = "orange"
            }
          }else if(status === "مكتملة"){
            color = "green"
          }
          return <span style={{ color, fontWeight: "bold" }}>{paymentDate?.toLocaleDateString()||"لا يوجد تاريخ"}</span>;
    },
  },
  {
    field: "rest_money",
    headerName: "المبلغ المتبقي",
    width: 120,
    getValue: (params) => {
      return params.row.rest_money ? params.row.rest_money.toFixed(2) : "0.00";
    }
  },
  {
    field: "payed",
    headerName: "المدفوع",
    width: 100,
    valueGetter: (params) => {
      return params.row.payed ? params.row.payed.toFixed(2) : "0.00";
    }
  },
  {
    field: "total",
    headerName: "القيمة الكلية ",
    width: 120,
    valueGetter: (params) => {
      return params.row.totalPrice ? params.row.totalPrice.toFixed(2) : "0.00";
    }
  },
  {
    field: "products",
    headerName: "الاصناف",
    width: 180,
    renderCell: (params) => {
      const products = params.row.products || [];
      return <span>{products.length} الاصناف</span>;
  },}
];

//!

export const customerColumns = [
  // { field: "_id", headerName: "ID", width: 70 },

  {
    field: "employer",
    headerName: "الموظف",
    width: 150,
  },

  {
    field: "store",
    headerName: "النافذة",
    width: 150,
  },
  {
    field: "payment_date",
    headerName: "تاريخ السداد",
    width: 200,
  },

  {
    field: "rest_money",
    headerName: "المبلغ المتبقي",
    width: 100,
  },
  {
    field: "note",
    headerName: "رقم العملية و التاريخ",
    width: 220,
  },
  {
    field: "payed",
    headerName: "المدفوع",
    width: 100,
  },
  {
    field: "payment_metod",
    headerName: "طريقة السداد",
    width: 100,
  },
  {
    field: "total",
    headerName: "القيمةالكلية",
    width: 100,
  },
  {
    field: "products",
    headerName: "المنتج",
    width: 180,
  },
  {
    field: "name",
    headerName: "اسم العميل",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img
            className="cellImg"
            src={params.row.img || "https://images.pexels.com/photos/14667172/pexels-photo-14667172.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
            alt="avatar"
          /> */}
          {params.row.name}
        </div>
      );
    },
  },
];

//!

export const supplierColumns = [
  //{ field: "_id", headerName: "ID", width: 70 },
  {
    field: "phone",
    headerName: "الهاتف",
    width: 150,
  },

  {
    field: "store",
    headerName: "المخزن",
    width: 120,
    valueGetter:(params)=>{
      return params.row.store?.name || ""
    }
  },


  {
    field: "employer",
    headerName: "المستلم",
    width: 180,
  },
  {
    field: "note",
    headerName: "السداد",
    width: 150,
  },
  {
    field: "cost",
    headerName: "القيمة",
    width: 150,
  },

  {
    field: "quantity",
    headerName: "الكمية",
    width: 120,
  },

  {
    field: "product_name",
    headerName: "المنتج",
    width: 180,
  },

  {
    field: "name",
    headerName: "اسم المورد",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img
            className="cellImg"
            src={params.row.img || "https://images.pexels.com/photos/14667172/pexels-photo-14667172.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
            alt="avatar"
          /> */}
          {params.row.name}
        </div>
      );
    },
  },
];

//!

export const storeColumns = [
  { field: "_id", headerName: "ID", width: 70, hide: true },

   {
    field: "manager",
    headerName: "المشرف",
    width: 200,
      valueGetter: (params) => {
        return params.row.employer?.manager || "غير محدد";
      }
  },
  {
    field: "employers_number",
    headerName: "عدد الموظفين",
    width: 150,
  },
  {
    field: "products",
    headerName: " الاصناف",
    width: 200,
    renderCell: (params)=>{
      const products = params.row.products || []
      if(productColumns.length===0){
        
      }
      if (products.length===0){
        return <span style={{color:"#999"}}>لا توجد اصناف </span>
      }
      return(
        <select
        className="products-dropdown"
        defaultValue=""
        style={{
          width:"100",
          padding:"4px 8px",
          border:"1px solid #ccc",
          backgroundColor:"#f9f9f9",
          cursor:"pointer",
        }}>
          <option value="" disabled>عرض الاصناف</option>
          {products.map((product, index)=>(
            <option key={index} value={product.name}>
              {product.name} ({product.quantity})
            </option>
          ))}


        </select>
      )

    }
  },

  {
    field: "location",
    headerName: "الموقع",
    width: 120,
  },
  {
    field: "name",
    headerName: "الاسم",
    width: 200,
    
    
  },
];

//!

// export const userColumns = [
//   { field: "_id", headerName: "ID", width: 70 },
//   {
//     field: "name",
//     headerName: "ٍName",
//     width: 230,
//     renderCell: (params) => {
//       return (
//         <div className="cellWithImg">
//           {/* <img
//             className="cellImg"
//             src={params.row.img || "https://images.pexels.com/photos/14667172/pexels-photo-14667172.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
//             alt="avatar"
//           /> */}
//           {params.row.name}
//         </div>
//       );
//     },
//   },
//   {
//     field: "username",
//     headerName: "Username",
//     width: 130,
//   },

//   {
//     field: "email",
//     headerName: "Email",
//     width: 100,
//   },
//   {
//     field: "isAdmin",
//     headerName: "Admin",
//     width: 100,
//   },
//   {
//     field: "password",
//     headerName: "Password",
//     width: 100,
//   }
// ];

//!

// export const destersColumns = [
//   //{ field: "_id", headerName: "ID", width: 70 },
//   {
//     field: "date",
//     headerName: "تاريخ السداد",
//     width: 200,
//   }, {
//     field: "rest_money",
//     headerName: "المبلغ المستحق",
//     width: 230,
//   },
//   {
//     field: "money",
//     headerName: "المبلغ المدفوع",
//     width: 230,
//   },
//   {
//     field: "products",
//     headerName: "المنتجات",
//     width: 250,
//   },
//   {
//     field: "name",
//     headerName: "عميل التصريف",
//     width: 200,
//     renderCell: (params) => {
//       return (
//         <div className="cellWithImg">
//           {/* <img
//             className="cellImg"
//             src={params.row.img || "https://images.pexels.com/photos/14667172/pexels-photo-14667172.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
//             alt="avatar"
//           /> */}
//           {params.row.name}
//         </div>
//       );
//     },
//   },
// ];

//!
export const employerColumns = [
  // { field: "_id", headerName: "ID", width: 70 },
  {
    field: "phone",
    headerName: "الهاتف",
    width: 150,
  },
  {
    field: "location",
    headerName: "الموقع",
    width: 150,
  }, {
    field: "personal",
    headerName: "منصرف شخصي",
    width: 150,
  },
  {
    field: "comercial",
    headerName: "منصرف تجاري",
    width: 150,
  },

  {
    field: "job",
    headerName: "الوظيفة",
    width: 150,
  },

  {
    field: "name",
    headerName: "اسم الموظف",
    width: 200,
    
  },
];

//!
export const productColumns = [
  //{ field: "_id", headerName: "ID", width: 70 },


  {
    field: "desc",
    headerName: "ملحوظات",
    width: 250,
  },


  {
    field: "ex_Date",
    headerName: "تاريخ الانتهاء",
    width: 120,
  },
  {
    field: "pro_Date",
    headerName: "تاريخ الانتاج",
    width: 120,
  },

  {
    field: "patch",
    headerName: "الدفعة",
    width: 50,
  },

  {
    field: "price",
    headerName: "سعر الوحدة",
    width: 120,
  },
  {
    field: "name",
    headerName: "الصنف",
    width: 180,
  },

];



// export const hotelColumns = [
//   { field: "_id", headerName: "ID", width: 200 },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 150,
//   },
//   {
//     field: "type",
//     headerName: "Type",
//     width: 70,
//   },
//   {
//     field: "title",
//     headerName: "Title",
//     width: 100,
//   },
//   {
//     field: "city",
//     headerName: "City",
//     width: 100,
//   }
// ];

// export const roomColumns = [
//   { field: "_id", headerName: "ID", width: 70 },
//   {
//     field: "title",
//     headerName: "Title",
//     width: 230,
//   },
//   {
//     field: "desc",
//     headerName: "Description",
//     width: 100,
//   },
//   {
//     field: "price",
//     headerName: "Price",
//     width: 100,
//   },
//   {
//     field: "maxPeople",
//     headerName: "Max People",
//     width: 100,
//   }
// ];
