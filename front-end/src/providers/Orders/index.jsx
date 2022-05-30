import { createContext, useCallback, useState } from "react";
import api from "../../services/api.js"

export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const [Orders, setOrders] = useState([])
  const getOrders = useCallback(() => {
    api
    .get("/orders")
    .then((res) => setOrders(res.data.orders))
    .catch((err) => console.log(err))
  })
  
  
  const postOrder = (newOrder) => {
    const orderData = {
      contact_name: newOrder.contactName,
      contact_phone: newOrder.contactPhone,
      real_estate_agency: newOrder.agency,
      order_description: newOrder.description,
      company: newOrder.company,
      category: { name: newOrder.category },
      deadline: newOrder.deadline
    }

    api
      .post("/orders", orderData)
      .then(() => getOrders())
      .catch((err) => console.log(err))
  }

  const patchOrder = (updatedOrder, id) => {
    const orderData = {
      contact_name: updatedOrder.contactName,
      contact_phone: updatedOrder.contactPhone,
      real_estate_agency: updatedOrder.agency,
      order_description: updatedOrder.description,
      company: updatedOrder.company,
      category: { name: updatedOrder.category },
      deadline: updatedOrder.deadline
    }

    api
      .patch(`/orders/${id}`, orderData)
      .then(() => getOrders())
      .catch((err) => console.log(err))
  }
  
  return (
    <OrderContext.Provider value={{ getOrders, Orders, postOrder, patchOrder }} >
      {children}
    </OrderContext.Provider>
  )

}