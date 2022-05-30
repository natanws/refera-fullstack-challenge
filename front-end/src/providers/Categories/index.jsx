import { createContext, useState } from "react";
import api from "../../services/api";

export const CategoriesContext = createContext()

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const getCategories = () => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err))
  }
  
  return (
    <CategoriesContext.Provider value={{ categories, getCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}