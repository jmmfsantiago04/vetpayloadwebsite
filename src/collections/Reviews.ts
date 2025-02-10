import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true, // Allow public submissions
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'petType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Dog',
          value: 'dog',
        },
        {
          label: 'Cat',
          value: 'cat',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Approve this review to make it visible on the website',
      },
    },
  ],
  timestamps: true,
}
