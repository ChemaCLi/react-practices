import { Button } from "antd"
import { useRef } from "react"
import { ImperativeModal } from "../../contexts"
import { UserModal, UsersList, ContentContainer } from "../../components"
import { useService, useUserActions, useServiceLayer } from "../../hooks"
import { UserAddOutlined } from '@ant-design/icons';

export const UsersManagementPage = () => {
  const modalRef = useRef()
  const { UserService } = useServiceLayer()

  const { data: users, loading, refetch } = useService(UserService.getAll)

  const {
    onEditUser,
    onCreateUser,
    onDeleteUser,
  } = useUserActions({ UserService })

  const handleOnCreateUser = async ({ name, email }) => {
    await onCreateUser({ name, email, onCompleted: refetch })
  }

  const handleOnEditUser = async ({ id, name, email }) => {
    await onEditUser({ id, name, email, onCompleted: refetch })
  }

  const handleOnDeleteUser = async ({ id }) => {
    await onDeleteUser({ id, onCompleted: refetch })
  }

  return (
    <>
      <ImperativeModal
        ref={modalRef}
        modal={UserModal}
        modalProps={{
          onCreateUser: handleOnCreateUser,
          onEditUser: handleOnEditUser
        }} />
      <ContentContainer>
        <Button
          block
          shape="round"
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => modalRef.current?.openModal()}>
          Agregar usuario
        </Button>
        <UsersList
          users={users}
          loading={loading}
          onSelectItem={user => modalRef.current?.openModal(user)}
          onDeleteItem={id => handleOnDeleteUser({ id })} />
      </ContentContainer>
    </>
  )
}
