import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CategoriesContext } from '../../providers/Categories';
import { InputAdornment, MenuItem } from '@mui/material';
import { OrderContext } from '../../providers/Orders';
import moment from 'moment';

export default function Modal({modalType, open, setOpen, currentOrder, setModalType}) {
  const { categories, getCategories } = React.useContext(CategoriesContext)
  const { postOrder, patchOrder } = React.useContext(OrderContext)
  const [contactName, setContactName] = React.useState()
  const [contactPhone, setContactPhone] = React.useState()
  const [agency, setAgency] = React.useState()
  const [description, setDescription] = React.useState()
  const [company, setCompany] = React.useState()
  const [category, setCategory] = React.useState()
  const [deadline, setDeadline] = React.useState()

  const editOrder = () => {
    setModalType('edit')
    setContactName(currentOrder.contact_name)
    setContactPhone(currentOrder.contact_phone)
    setAgency(currentOrder.real_estate_agency)
    setDescription(currentOrder.order_description)
    setCompany(currentOrder.company)
    setCategory(currentOrder.category.name)
    setDeadline(moment(currentOrder.deadline).format('yyyy-MM-DD'))
  }

  const handleClose = () => {
    setOpen(false)
    setModalType('add')
    setContactName('')
    setContactPhone('')
    setAgency('')
    setDescription('')
    setCompany('')
    setCategory('')
    setDeadline('')
  };

  const handleCreate = () => {
    const newOrder = {
      contactName,
      contactPhone,
      agency,
      description,
      company,
      category,
      deadline
    }
    postOrder(newOrder)
    handleClose()
  }

  const handleSave = () => {
    const updatedOrder = {
      contactName,
      contactPhone,
      agency,
      description,
      company,
      category,
      deadline
    }
    patchOrder(updatedOrder, currentOrder.id)
    handleClose()
  }

  React.useEffect(() => {
    getCategories()
  }, [modalType])
  

  return (
    <div>
      {modalType === 'add' ? (
        <Dialog open={open} onClose={handleClose} maxWidth="xl">
          <DialogTitle>New Order</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '90ch' }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Contact Name"
                type="text"
                fullWidth
                placeholder='Nome do contato'
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={contactName || ''}
                onChange={(e) => setContactName(e.target.value)}
              />
              <TextField
                margin="dense"
                id="phone"
                label="Contact Phone"
                placeholder='Telefone do contato'
                type="tel"
                fullWidth
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={contactPhone || ''}
                onChange={(e) => setContactPhone(e.target.value)}
                />
              <TextField
                margin="dense"
                id="agency"
                label="Real Estate Agency"
                placeholder='Imobiliaria'
                type="text"
                fullWidth
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={agency || ''}
                onChange={(e) => setAgency(e.target.value)}
                />
              <TextField
                margin="dense"
                id="description"
                label="Order Description"
                placeholder='Descrição da ordem de serviço'
                type="text"
                fullWidth
                sx={{ m: 1, width: '58ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                multiline
                rows={10}
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                />
              <TextField
                margin="dense"
                id="company"
                label="Company"
                placeholder='Empresa'
                type="text"
                fullWidth
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={company || ''}
                onChange={(e) => setCompany(e.target.value)}
                />
              <TextField
                margin="dense"
                id="company"
                label="Category"
                type="text"
                fullWidth
                select
                sx={{ m: 1, width: '28ch' }}
                value={category || ''}
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={category || ''}
                
                >
                {categories.map((currentCategory) => {return (
                  <MenuItem key={currentCategory.id} value={currentCategory.name}>{currentCategory.name}</MenuItem>
                  )
                })}

              </TextField>

              <TextField
                id="date"
                label="Deadline"
                type="date"
                value={deadline || ''}
                onChange={(e) => setDeadline(e.target.value)}
                sx={{ width: '28ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Create Order</Button>
          </DialogActions>
        </Dialog>
      ) : modalType === 'info' ? (
        <Dialog open={open} onClose={handleClose} maxWidth="xl">
          <DialogTitle>New Order</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '90ch' }}>
              <TextField
              variant="filled"
                autoFocus
                margin="dense"
                id="name"
                label="Contact Name"
                type="text"
                fullWidth
                placeholder='Nome do contato'
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={currentOrder.contact_name}
              />
              <TextField
              variant="filled"
                margin="dense"
                id="phone"
                label="Contact Phone"
                placeholder='Telefone do contato'
                type="tel"
                fullWidth
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={currentOrder.contact_phone}
                />
              <TextField
              variant="filled"
                margin="dense"
                id="agency"
                label="Real Estate Agency"
                placeholder='Imobiliaria'
                type="text"
                fullWidth
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={currentOrder.real_estate_agency}
                />
              <TextField
              variant="filled"
                margin="dense"
                id="description"
                label="Order Description"
                placeholder='Descrição da ordem de serviço'
                type="text"
                fullWidth
                sx={{ m: 1, width: '58ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                multiline
                rows={10}
                value={currentOrder.order_description}
                />
              <TextField
              variant="filled"
                margin="dense"
                id="company"
                label="Company"
                placeholder='Empresa'
                type="text"
                fullWidth
                sx={{ m: 1, width: '28ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>
                }}
                value={currentOrder.company}
                />
              <TextField
              variant="filled"
                margin="dense"
                id="company"
                label="Category"
                type="text"
                fullWidth
                sx={{ m: 1, width: '28ch' }}
                value={currentOrder.category.name}
                >
                {categories.map((currentCategory) => {return (
                  <MenuItem key={currentCategory.id} value={currentCategory.name}>{currentCategory.name}</MenuItem>
                  )
                })}

              </TextField>

              <TextField
              variant="filled"
                id="date"
                label="Deadline"
                value={moment(currentOrder.deadline).format('DD/MM/yyyy')}
                sx={{ width: '28ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={editOrder}>Edit</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>New Order</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '90ch' }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Contact Name"
              type="text"
              fullWidth
              placeholder='Nome do contato'
              sx={{ m: 1, width: '28ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>
              }}
              value={contactName || ''}
              onChange={(e) => setContactName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="phone"
              label="Contact Phone"
              placeholder='Telefone do contato'
              type="tel"
              fullWidth
              sx={{ m: 1, width: '28ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>
              }}
              value={contactPhone || ''}
              onChange={(e) => setContactPhone(e.target.value)}
              />
            <TextField
              margin="dense"
              id="agency"
              label="Real Estate Agency"
              placeholder='Imobiliaria'
              type="text"
              fullWidth
              sx={{ m: 1, width: '28ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>
              }}
              value={agency || ''}
              onChange={(e) => setAgency(e.target.value)}
              />
            <TextField
              margin="dense"
              id="description"
              label="Order Description"
              placeholder='Descrição da ordem de serviço'
              type="text"
              fullWidth
              sx={{ m: 1, width: '58ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>
              }}
              multiline
              rows={10}
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
              />
            <TextField
              margin="dense"
              id="company"
              label="Company"
              placeholder='Empresa'
              type="text"
              fullWidth
              sx={{ m: 1, width: '28ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>
              }}
              value={company || ''}
              onChange={(e) => setCompany(e.target.value)}
              />
            <TextField
              margin="dense"
              id="company"
              label="Category"
              type="text"
              fullWidth
              select
              sx={{ m: 1, width: '28ch' }}
              value={category || ''}
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category || ''}
              
              >
              {categories.map((currentCategory) => {return (
                <MenuItem key={currentCategory.id} value={currentCategory.name}>{currentCategory.name}</MenuItem>
                )
              })}

            </TextField>

            <TextField
              id="date"
              label="Deadline"
              type="date"
              value={deadline || ''}
              onChange={(e) => setDeadline(e.target.value)}
              sx={{ width: '28ch' }}
              InputLabelProps={{
                shrink: true,
              }}
              />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      )
      }
    </div>
  );
}
