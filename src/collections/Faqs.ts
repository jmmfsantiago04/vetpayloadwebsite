import { CollectionConfig } from 'payload/types'

const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        {
          label: 'General',
          value: 'general',
        },
        {
          label: 'Services',
          value: 'services',
        },
        {
          label: 'Pricing',
          value: 'pricing',
        },
        {
          label: 'Technical',
          value: 'technical',
        },
        {
          label: 'Privacy & Security',
          value: 'privacy',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description:
          'Use this field to control the display order of FAQs (lower numbers appear first)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Use this to temporarily hide a FAQ without deleting it',
      },
    },
  ],
  timestamps: true,
}

export default Faqs
