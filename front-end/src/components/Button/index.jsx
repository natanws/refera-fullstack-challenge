import {Button} from './styles'

const ButtonComponent = ({ text, onClick }) => {
  return(
    <Button onClick={onClick}>
      {text}
    </Button>
  )
}

export default ButtonComponent;