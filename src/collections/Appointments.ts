import { CollectionConfig, PayloadRequest } from 'payload/types'

interface User {
  role?: string
}

interface FilterData {
  user?: string;
}

const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'date',
    defaultColumns: ['date', 'time', 'user', 'pet', 'status'],
    group: 'Conteúdo',
    description: 'Agendar consultas para usuários e seus pets',
  },
  access: {
    // Only admin can create/read/update/delete appointments
    create: ({ req: { user } }: { req: PayloadRequest }) => (user as User)?.role === 'admin',
    read: ({ req: { user } }: { req: PayloadRequest }) => (user as User)?.role === 'admin',
    update: ({ req: { user } }: { req: PayloadRequest }) => (user as User)?.role === 'admin',
    delete: ({ req: { user } }: { req: PayloadRequest }) => (user as User)?.role === 'admin',
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
        description: 'Selecione a data da consulta',
      },
    },
    {
      name: 'time',
      type: 'select',
      required: true,
      options: [
        { label: '09:00', value: '09:00' },
        { label: '09:30', value: '09:30' },
        { label: '10:00', value: '10:00' },
        { label: '10:30', value: '10:30' },
        { label: '11:00', value: '11:00' },
        { label: '11:30', value: '11:30' },
        { label: '14:00', value: '14:00' },
        { label: '14:30', value: '14:30' },
        { label: '15:00', value: '15:00' },
        { label: '15:30', value: '15:30' },
        { label: '16:00', value: '16:00' },
        { label: '16:30', value: '16:30' },
        { label: '17:00', value: '17:00' },
        { label: '17:30', value: '17:30' },
      ],
      admin: {
        description: 'Selecione o horário da consulta',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      label: 'Cliente',
      admin: {
        description: 'Selecione o cliente',
      },
      filterOptions: {
        role: {
          equals: 'cliente'
        }
      },
    },
    {
      name: 'pet',
      type: 'relationship',
      relationTo: 'pets',
      required: true,
      hasMany: false,
      label: 'Pet',
      admin: {
        description: 'Selecione o pet',
      },
      // Filter pets based on selected user
      filterOptions: ({ data }: { data: FilterData }) => {
        if (data?.user) {
          return {
            owner: {
              equals: data.user
            }
          }
        }
        return null
      }
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'agendada',
      options: [
        {
          label: 'Agendada',
          value: 'agendada',
        },
        {
          label: 'Confirmada',
          value: 'confirmada',
        },
        {
          label: 'Concluída',
          value: 'concluida',
        },
        {
          label: 'Cancelada',
          value: 'cancelada',
        },
      ],
      admin: {
        description: 'Status atual da consulta'
      }
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Observações adicionais sobre a consulta',
      },
    },
  ],
  timestamps: true,
}

export default Appointments 