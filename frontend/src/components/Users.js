import * as React from 'react'
import { List, Datagrid, TextField, EmailField } from 'react-admin'
import MyUrlField from './MyUrlField'

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="telno" />
      <MyUrlField source="email" />
      <TextField source="employmentStatus" />
    </Datagrid>
  </List>
)



 /* name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    address: { type: String, required: true },
    telno: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    country: { type: String, required: true }, */