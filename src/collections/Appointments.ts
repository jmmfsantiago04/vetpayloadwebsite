import { CollectionConfig } from 'payload/types'

const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'date',
    defaultColumns: ['date', 'time', 'pet', 'owner', 'status'],
    group: 'Content',
    listSearchableFields: ['date', 'time', 'status'],
    description: 'Gerenciar consultas veterinárias',
  },
  access: {
    read: ({ req }) => {
      const user = req.user as { id: string; role?: string } | null
      
      // Admin can read all appointments
      if (user?.role === 'admin') return true
      
      // Authenticated users can only read their own appointments
      if (user) {
        return {
          owner: {
            equals: user.id
          }
        }
      }
      
      // Non-authenticated users cannot read appointments
      return false
    },
    create: ({ req }) => {
      const user = req.user as { role?: string } | null
      // Only authenticated users can create appointments
      return Boolean(user)
    },
    update: ({ req }) => {
      const user = req.user as { id: string; role?: string } | null
      
      // Admin can update all appointments
      if (user?.role === 'admin') return true
      
      // Regular users can only update their own appointments
      if (user) {
        return {
          owner: {
            equals: user.id
          }
        }
      }
      
      return false
    },
    delete: ({ req }) => {
      const user = req.user as { role?: string } | null
      // Only admin can delete appointments
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
        description: 'Data da consulta',
        position: 'sidebar'
      },
    },
    {
      name: 'time',
      type: 'text',
      required: true,
      admin: {
        description: 'Horário da consulta (ex: 09:00)',
        position: 'sidebar'
      },
    },
    {
      name: 'pet',
      type: 'relationship',
      relationTo: 'pets',
      required: true,
      admin: {
        description: 'Selecione o pet para esta consulta'
      }
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Proprietário do pet',
        position: 'sidebar'
      },
      hooks: {
        beforeChange: [
          ({ req, operation }) => {
            if (operation === 'create') {
              return req.user.id
            }
          }
        ]
      }
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'scheduled',
      options: [
        {
          label: 'Agendada',
          value: 'scheduled',
        },
        {
          label: 'Confirmada',
          value: 'confirmed',
        },
        {
          label: 'Concluída',
          value: 'completed',
        },
        {
          label: 'Cancelada',
          value: 'cancelled',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Status atual da consulta'
      }
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Observações sobre a consulta',
        position: 'sidebar'
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Data de criação do agendamento'
      },
      hooks: {
        beforeChange: [
          ({ operation }) => {
            if (operation === 'create') {
              return new Date()
            }
          },
        ],
      },
    },
  ],
  timestamps: true,
}

export default Appointments 