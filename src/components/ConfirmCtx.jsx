import { createContext, useState } from "react"
import Confirm from "./Confirm"

const ConfirmCtx = createContext(null)
ConfirmCtx.displayName = "ConfirmCtx"

const ConfirmProvider = ({ message: initialMessage, ...props }) => {
  const [energised, setEnergised] = useState(false)
  const [providedOnChoose, setProvidedOnChoose] = useState(null)
  const [message, setMessage] = useState(null)

  const openModal = ({ message, onChoose }) => {
    if (energised) {
      throw new Error("only one consumer can open the modal at once")
    }
    setProvidedOnChoose(() => onChoose)
    setMessage(message)
    setEnergised(true)
  }

  const closeModal = () => {
    setEnergised(false)
  }

  return (
    <ConfirmCtx.Provider value={{ openModal, closeModal }}>
      <Confirm
        energised={energised}
        message={message ?? initialMessage}
        onChoose={providedOnChoose}
      />
      {props.children}
    </ConfirmCtx.Provider>
  )
}

export { ConfirmCtx, ConfirmProvider }
