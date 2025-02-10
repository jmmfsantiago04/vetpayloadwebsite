import { CollectionConfig } from 'payload/types'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Cat Care',
          value: 'Cat Care',
        },
        {
          label: 'Dog Care',
          value: 'Dog Care',
        },
        {
          label: 'Pet Health',
          value: 'Pet Health',
        },
        {
          label: 'Pet Nutrition',
          value: 'Pet Nutrition',
        },
      ],
    },
    {
      name: 'imageUrl',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/ /g, '-')
            }
            return value
          },
        ],
      },
    },
  ],
}

export default Posts
