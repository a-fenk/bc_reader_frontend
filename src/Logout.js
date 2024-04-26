import {
  Navigate,
} from "react-router-dom";


const Logout = () => {
  localStorage.removeItem("id");
  return <Navigate to='/'  />
};

export {Logout}