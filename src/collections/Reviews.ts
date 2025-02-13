import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'petType', 'isApproved'],
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
      label: 'Nome',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail',
    },
    {
      name: 'petType',
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
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Avaliação',
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Comentário',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      label: 'Aprovado',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
