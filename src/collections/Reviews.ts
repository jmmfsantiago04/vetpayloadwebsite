import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'petType', 'isApproved'],
    group: 'Conteúdo',
    description: 'Gerenciar avaliações dos clientes',
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
      admin: {
        description: 'Nome do cliente que fez a avaliação',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail',
      admin: {
        description: 'E-mail do cliente',
      },
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
      admin: {
        description: 'Tipo de animal atendido',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Avaliação',
      admin: {
        description: 'Nota de 1 a 5 estrelas',
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      label: 'Comentário',
      admin: {
        description: 'Comentário do cliente sobre o atendimento',
      },
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      label: 'Aprovado',
      defaultValue: false,
      admin: {
        description: 'Marque para aprovar e exibir esta avaliação no site',
      },
    },
  ],
  timestamps: true,
}
