// const DarkModeReducer = (state, action) => {
//   switch (action.type) {
//     case "LIGHT": {
//       return {
//         darkMode: false,
//       };
//     }
//     case "DARK": {
//       return {
//         darkMode: true,
//       };
//     }
//     case "TOGGLE": {
//       return {
//         darkMode: !state.darkMode,
//       };
//     }
//     default:
//       return state;
//   }
// };

const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT": {
      // حفظ في localStorage
      localStorage.setItem("darkMode", JSON.stringify(false));
      return {
        darkMode: false,
      };
    }
    case "DARK": {
      // حفظ في localStorage
      localStorage.setItem("darkMode", JSON.stringify(true));
      return {
        darkMode: true,
      };
    }
    case "TOGGLE": {
      // عكس القيمة الحالية وحفظها
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      return {
        darkMode: newDarkMode,
      };
    }
    default: {
      return state;
    }
  }
};

export default DarkModeReducer;
