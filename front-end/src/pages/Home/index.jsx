import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import EnhancedTable from "../../components/Table";
import { OrderContext } from "../../providers/Orders";
import { Container } from "./styles";

const Home = () => {
  const { Orders, getOrders } = useContext(OrderContext)
  const [modalType, setModalType] = useState('add')
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState()

  useEffect(() => {
    getOrders()
  }, [currentOrder])

  return (
    <Container>
      <Button text="Add New Order" onClick={() => setOpen(!open)}/>
      <EnhancedTable 
        rows={Orders} 
        setType={setModalType} 
        setOpen={setOpen} 
        setCurrentOrder={setCurrentOrder} 
      />
      <Modal 
        modalType={modalType} 
        open={open} 
        setOpen={setOpen} 
        currentOrder={currentOrder}
        setModalType={setModalType}
      />
    </Container>
  )
}

export default Home;