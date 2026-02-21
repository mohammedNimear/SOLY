// import { createContext, useReducer } from "react";
// import DarkModeReducer from "./darkModeReducer";

// const INITIAL_STATE = {
//   darkMode: false,
// };

// export const DarkModeContext = createContext(INITIAL_STATE);

// export const DarkModeContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

//   return (
//     <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };



import { createContext, useReducer, useEffect } from "react";
import DarkModeReducer from "./darkModeReducer";

// قراءة القيمة المحفوظة من localStorage
const getInitialDarkMode = () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  // إذا كان هناك قيمة محفوظة، استخدمها، وإلا استخدم false
  return savedDarkMode ? JSON.parse(savedDarkMode) : false;
};

const INITIAL_STATE = {
  darkMode: getInitialDarkMode(),
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  // تطبيق الكلاس على body عند تغير الحالة
  useEffect(() => {
    if (state.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [state.darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
