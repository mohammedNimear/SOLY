import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};


const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
      case "LOGIN_SUCCESS":
        return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
      case "LOGOUT":
        localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        error: null,
      };
      default:
        return state;
      }
    };
    
  export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //keep user login in case refresh is needed
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  const login = async (credentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res =await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials, {
        withCredentials: true,
      });
      const userData = res.data.details || res.data || res.data.user; // تأكد من الحصول على بيانات المستخدم بشكل صحيح
      
      if(!userData) {
        throw new Error("فشل في الحصول على بيانات المستخدم");
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      return res.data;

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", 
                  payload: err.response.data.message || "خطأ في تسجيل الدخول"
       });
      throw err;
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
