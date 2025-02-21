import { CollectionConfig, Access, FieldHook } from 'payload/types'

interface User {
  id: string
  role?: string
}

interface AccessArgs {
  req: {
    user: User | null
  }
}

interface AppointmentBeforeChangeHookArgs {
  req: {
    user: User | null
  }
  operation: 'create' | 'update'
  originalDoc?: {
    owner: string
  }
  data: {
    owner: string
  }
}

interface CreatedAtHookArgs {
  operation: 'create' | 'update'
}

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
    read: ({ req }: AccessArgs) => {
      const user = req.user
      
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
    create: ({ req }: AccessArgs) => {
      const user = req.user
      // Only authenticated users can create appointments
      return Boolean(user)
    },
    update: ({ req }: AccessArgs) => {
      const user = req.user
      
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
    delete: ({ req }: AccessArgs) => {
      const user = req.user
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
          ({ req, operation, originalDoc, data }: AppointmentBeforeChangeHookArgs) => {
            const user = req.user

            // If user is admin, allow them to set any owner
            if (user?.role === 'admin') {
              return data.owner // Return the selected owner
            }

            // For regular users on create, set owner to current user
            if (operation === 'create') {
              return user?.id
            }

            // For regular users on update, prevent changing owner
            if (operation === 'update' && originalDoc) {
              return originalDoc.owner // Keep the original owner
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
          ({ operation }: CreatedAtHookArgs) => {
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