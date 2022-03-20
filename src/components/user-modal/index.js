import { Modal, Form, Input, Typography } from "antd"
import { useEffect, useState } from "react"
import { useServiceLayer, useService } from "../../hooks"

export const UserModal = ({
  visible,
  onCancel,
  onEditUser,
  onCreateUser,
  selectedItem = null,
  ...props
}) => {
  const { UserService } = useServiceLayer()
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  const { data: user, loading, reset } = useService(
    UserService.getById,
    { id: selectedItem?.id },
    { shouldFetch: selectedItem?.id && visible}
  )

  useEffect(() => {
    if (user && !loading && visible) {
      return form.setFieldsValue({ ...user })
    }
  }, [form, user, visible, loading])

  const handleOnOk = async () => {
    setSaving(true)
    try {
      await form.validateFields()
      const { name, email } = form.getFieldsValue()

      if (selectedItem)
        onEditUser && await onEditUser({ ...selectedItem, name, email })
      else
        onCreateUser && await onCreateUser({ name, email })

      closeModal()
    } catch (e) {
      console.error(e)
      throw e // propagate error to the onEditUser or onCreateUser callbacks
    } finally {
      setSaving(false)
    }
  }

  const closeModal = () => {
    form.resetFields()
    onCancel && onCancel()
    reset()
  }

  const disableControls = saving || (selectedItem?.id && loading)

  return (
    <Modal
      {...props}
      visible={visible}
      onOk={handleOnOk}
      onCancel={closeModal}
      cancelText="Cerrar"
      okText={selectedItem ? "Guardar cambios" : "Crear usuario"}
      okButtonProps={{ disabled: disableControls }}
      cancelButtonProps={{ disabled: disableControls }}
      title={<ModalTitle
        loading={loading}
        selectedItem={selectedItem} />
      }>
      <Form
        form={form}
        layout="vertical">
        <Form.Item
          rules={[{ required: true }]}
          label="Nombre"
          name="name">
          <Input
            disabled={disableControls}
            placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Email"
          name="email">
          <Input
            disabled={disableControls}
            placeholder="Email" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ModalTitle = ({ selectedItem, loading }) => (
  <div style={{
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  }}>
    <div>
      {selectedItem ? "Editar usuario" : "Crear usuario"}
    </div>
    {(loading && selectedItem) && (
      <Typography.Text
        type="secondary"
        style={{ fontSize: "0.75rem" }}>
        cargando...
      </Typography.Text>
    )}
  </div>
)
