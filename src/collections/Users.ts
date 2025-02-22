import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['id', 'email', 'name', 'role'],
    group: 'Administração',
    description: 'Gerenciar usuários do sistema',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
      admin: {
        description: 'Nome completo do usuário',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'E-mail',
      admin: {
        description: 'Endereço de e-mail do usuário',
      },
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'cliente',
      required: true,
      options: [
        {
          label: 'Administrador',
          value: 'admin',
        },
        {
          label: 'Cliente',
          value: 'cliente',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Tipo de usuário no sistema',
      },
    },
  ],
}

export { Users }
