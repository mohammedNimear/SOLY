// import "./widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// // import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// // import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

// const Widget = ({ type }) => {
//   let data;

  

//   //temporary
//   const amount = 100;
//   const diff = 20;

//   switch (type) {
//     // case "products":
//     //   data = {
//     //     title: "الاصناف",
//     //     isMoney: false,
//     //     isCretical: false,
//     //     link: "عرض الاصناف",
//     //     icon: (
//     //       <PersonOutlinedIcon
//     //         className="icon"
//     //         style={{
//     //           color: "crimson",
//     //           backgroundColor: "rgba(255, 0, 0, 0.2)",
//     //         }}
//     //       />
//     //     ),
//     //   };
//     //   break;
//     case "expire":
//       data = {
//         title: "الصلاحية الحرجة",
//         isMoney: false,
//                 isCretical: true,
//         link: " التفاصيل",
//         icon: (
//           <ShoppingCartOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(218, 165, 32, 0.2)",
//               color: "goldenrod",
//             }}
//           />
//         ),
//       };
//       break;
//     case "stock":
//       data = {
//         title: "الكمية الحرجة",
//         isMoney: false,
//         isCretical: true,
//         link: "التفاصيل",
//         icon: (
//           <ShoppingCartOutlinedIcon
//             className="icon"
//             style={{ backgroundColor: "rgba(0, 153, 255, 0.263)", color: "red" }}
//           />
//         ),
//       };
//       break;
//     case "dusters":
//       data = {
//         title: "التصريف",
//         isMoney: true,
//         isCretical: false,
//         link: "التفاصيل",
//         icon: (
//           <AccountBalanceWalletOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(128, 0, 128, 0.2)",
//               color: "purple",
//             }}
//           />
//         ),
//       };
//       break;
//     default:
//       break;
//   }

//   return (
//     <div className="widget">
    
//       <div className="right">
//         <div className="percentage positive">
//           <KeyboardArrowUpIcon />
//           {diff} %
//         </div>
//         {data.icon}
//       </div>  <div className="left">
//         <span className="title">{data.title}</span>
//         <span className="counter">
//           {data.isMoney && "$"} {amount}
          
//         </span>
//         <span className="link">{data.link}</span>
//       </div>
//     </div>
//   );
// };

// export default Widget;
