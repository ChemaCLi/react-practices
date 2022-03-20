import React from "react"
import { List } from "antd"
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
      loading={loading}
      dataSource={users ?? []}
      renderItem={(user) =>
        <div key={user.id}>
          <span>
            <BigHead
              style={{ width: "80px", heigth: "80px" }}
              {...getRandomBigheadOptions()} />
            {user.name} - {user.email} -
            <button onClick={() => onSelectItem && onSelectItem(user)}>
              Editar
            </button>
            <button onClick={() => onDeleteItem && onDeleteItem(user.id)}>
              Eliminar
            </button>
          </span>
        </div>
      } />
  )
}
