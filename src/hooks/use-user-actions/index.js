import { message, Modal } from "antd"

export const useUserActions = ({ UserService }) => {
  const onCreateUser = async ({ name, email, onCompleted }) => {
    const dismissLoader = message.loading("Guardando...")
    try {
      const newUser = await UserService.create({ name, email })
      message.success("Usuario guardado")
      onCompleted && onCompleted(newUser)
      return newUser
    } catch(e) {
      console.error(e)
      message.error(e.message)
    } finally {
      dismissLoader()
    }
  }

  const onEditUser = async ({ id, name, email, onCompleted }) => {
    const dismissLoader = message.loading("Guardando...")
    try {
      const updatedUser = await UserService.update({ name, email, id })
      message.success("Usuario actualizado")
      onCompleted && onCompleted(updatedUser)
      return updatedUser
    } catch(e) {
      console.error(e)
      message.error(e.message)
    } finally {
      dismissLoader()
    }
  }

  const onDeleteUser = async ({ id, onCompleted }) => {
    Modal.confirm({
      okText: "Sí",
      cancelText: "No",
      title: "¿Estás seguro de eliminar este usuario?",
      onOk: async () => {
        try {
          await UserService.deleteById({ id })
          message.success("Usuario eliminado")
          onCompleted && onCompleted()
        } catch(e) {
          console.error(e)
          message.error(e.message)
          throw e
        }
      }
    })
  }

  return {
    onEditUser,
    onCreateUser,
    onDeleteUser,
  }
}
