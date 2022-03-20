import { forwardRef, useImperativeHandle, useState } from "react"
import { ModalContext } from "./context"

export const ImperativeModal = forwardRef(({
  children,
  modalProps,
  modal: Modal
}, ref) => {
  const [state, setState] = useState({
    isModalOpen: false,
    selectedItem: null
  })

  const openModal = (selectedItem = null) => {
    setState(prev => ({
      ...prev,
      selectedItem,
      isModalOpen: true
    }))
  }

  const closeModal = () => {
    setState(prev => ({
      ...prev,
      isModalOpen: false,
      selectedItem: null
    }))
  }

  useImperativeHandle(
    ref,
    () => ({
      openModal,
      closeModal,
      ...state
    })
  )

  return (
    <ModalContext.Provider value={{ openModal }}>
      <Modal
        onCancel={closeModal}
        visible={state.isModalOpen}
        selectedItem={state.selectedItem}
        {...modalProps} />
      {children}
    </ModalContext.Provider>
  )
})