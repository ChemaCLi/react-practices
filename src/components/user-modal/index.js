import { Modal, Form, Input } from "antd"
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
      throw e
    } finally {
      setSaving(false)
    }
  }

  const closeModal = () => {
    form.resetFields()
    onCancel && onCancel()
    reset()
  }

  return (
    <Modal
      visible={visible}
      onOk={handleOnOk}
      onCancel={closeModal}
      okButtonProps={{ disabled: (saving || loading) }}
      cancelButtonProps={{ disabled: (saving || loading) }}
      title={selectedItem ? "Editar usuario" : "Crear usuario"}
      {...props}>
      <Form
        form={form}
        layout="vertical">
        <Form.Item
          rules={[{ required: true }]}
          label="Nombre"
          name="name">
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Email"
          name="email">
          <Input placeholder="Email" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
