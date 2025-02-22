import type { CollectionConfig } from 'payload'

export const Pets: CollectionConfig = {
  slug: 'pets',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'breed', 'owner'],
    group: 'Conteúdo',
    description: 'Gerenciar cadastro de pets',
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
      admin: {
        description: 'Digite o nome do pet',
      },
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
      admin: {
        description: 'Selecione o tipo de animal',
      },
    },
    {
      name: 'breed',
      type: 'text',
      required: true,
      label: 'Raça',
      admin: {
        description: 'Digite a raça do pet',
      },
    },
    {
      name: 'age',
      type: 'number',
      required: true,
      min: 0,
      max: 30,
      label: 'Idade',
      admin: {
        description: 'Digite a idade do pet (em anos)',
      },
    },
    {
      name: 'weight',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      label: 'Peso (kg)',
      admin: {
        description: 'Digite o peso do pet em quilogramas',
      },
    },
    {
      name: 'medicalHistory',
      type: 'textarea',
      label: 'Histórico Médico',
      admin: {
        description: 'Informações sobre o histórico médico do pet',
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      label: 'Proprietário',
      admin: {
        description: 'Selecione o proprietário do pet',
        useAsTitle: 'email',
      },
      filterOptions: {
        role: {
          equals: 'cliente'
        }
      },
    },
  ],
} 