import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
    group: 'Conteúdo',
    description: 'Gerenciar perguntas frequentes',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }: { req: { user: User | null } }) => Boolean(user),
    update: ({ req: { user } }: { req: { user: User | null } }) => Boolean(user),
    delete: ({ req: { user } }: { req: { user: User | null } }) => Boolean(user),
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Pergunta',
      admin: {
        description: 'Digite a pergunta frequente',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Resposta',
      admin: {
        description: 'Digite a resposta para a pergunta',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'geral',
      label: 'Categoria',
      options: [
        {
          label: 'Geral',
          value: 'geral',
        },
        {
          label: 'Serviços',
          value: 'servicos',
        },
        {
          label: 'Preços',
          value: 'precos',
        },
        {
          label: 'Técnico',
          value: 'tecnico',
        },
        {
          label: 'Privacidade & Segurança',
          value: 'privacidade',
        },
      ],
      admin: {
        description: 'Selecione a categoria da pergunta',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Ordem',
      admin: {
        position: 'sidebar',
        description:
          'Use este campo para controlar a ordem de exibição das FAQs (números menores aparecem primeiro)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Ativo',
      admin: {
        position: 'sidebar',
        description: 'Use isto para ocultar temporariamente uma FAQ sem excluí-la',
      },
    },
  ],
  timestamps: true,
}
