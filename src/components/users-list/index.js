import React from "react"
import { List, Button } from "antd"
import { BigHead } from "@bigheads/core"
import { getRandomBigheadOptions } from "../../utils"

/**
 * @param {object} props
 * @param {{id: string, name: string, email: string}[]} props.users
 * @returns 
 */
export const UsersList = ({
  users = [],
  loading = true,
  onSelectItem,
  onDeleteItem,
}) => {
  return (
    <List
      locale={{ emptyText: "No hay usuarios" }}
      loading={loading}
      dataSource={users ?? []}
      renderItem={(user) =>
        <List.Item
          key={user.id}
          actions={[
            <Button
              shape="round"
              type="link"
              key="edit-btn"
              onClick={() => onSelectItem && onSelectItem(user)}>
              Editar
            </Button>,
            <Button
              shape="round"
              type="danger"
              key="delete-btn"
              onClick={() => onDeleteItem && onDeleteItem(user.id)}>
              Eliminar
            </Button>
          ]}>
          <List.Item.Meta
            title={user.name}
            description={user.email}
            avatar={<BigHead
              style={{ width: "50px", heigth: "50px" }}
              {...getRandomBigheadOptions()} />} />
        </List.Item>
      } />
  )
}
