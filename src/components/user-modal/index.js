import { Modal, Form, Input } from "antd"
import { useEffect, useState } from "react"

export const UserModal = ({
  visible,
  onCancel,
  onEditUser,
  onCreateUser,
  selectedItem = null,
  ...props
}) => {
  const [loading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form] = Form.useForm()

  const handleOnOk = async () => {
    setSaving(true)
    try {
      await form.validateFields()
      const { name, email } = form.getFieldsValue()

      if (selectedItem)
        onEditUser && await onEditUser({ ...selectedItem, name, email })
      else
        onCreateUser && await onCreateUser({ name, email })

      handleOnCancel()
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      setSaving(false)
    }
  }

  const handleOnCancel = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  useEffect(() => {
    if (selectedItem) return form.setFieldsValue(selectedItem)
  }, [selectedItem, form])

  return (
    <Modal
      visible={visible}
      onOk={handleOnOk}
      onCancel={handleOnCancel}
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
