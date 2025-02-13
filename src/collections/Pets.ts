import type { CollectionConfig } from 'payload'

export const Pets: CollectionConfig = {
  slug: 'pets',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'breed', 'owner'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome do Pet',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Tipo de Animal',
      options: [
        { label: 'Cachorro', value: 'dog' },
        { label: 'Gato', value: 'cat' },
        { label: 'Outro', value: 'other' },
      ],
    },
    {
      name: 'breed',
      type: 'text',
      required: true,
      label: 'Raça',
    },
    {
      name: 'age',
      type: 'number',
      required: true,
      min: 0,
      max: 30,
      label: 'Idade',
    },
    {
      name: 'weight',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      label: 'Peso (kg)',
    },
    {
      name: 'medicalHistory',
      type: 'textarea',
      label: 'Histórico Médico',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      label: 'Proprietário',
    },
  ],
} 