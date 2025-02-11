import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true, // Allow public registration
    update: ({ req: { user } }: { req: { user: User | null } }) => Boolean(user),
    delete: ({ req: { user } }: { req: { user: User | null } }) => Boolean(user),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      minLength: 2,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      minLength: 2,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      minLength: 6,
      admin: {
        hidden: true, // Hide password field in admin UI
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
} 