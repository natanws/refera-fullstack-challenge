import { CategoriesProvider } from "./Categories"
import { OrderProvider } from "./Orders"

const Providers = ({ children }) => {
  return (
    <OrderProvider>
      <CategoriesProvider>
        { children }
      </CategoriesProvider>
    </OrderProvider>
  )
}

export default Providers