import { CollectionConfig } from 'payload/types'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'updatedAt'],
    group: 'Conteúdo',
    description: 'Gerenciar artigos e publicações do blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
      admin: {
        description: 'Digite o título do artigo',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Data',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Selecione a data de publicação',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        {
          label: 'Cuidados com Gatos',
          value: 'cuidados-gatos',
        },
        {
          label: 'Cuidados com Cães',
          value: 'cuidados-caes',
        },
        {
          label: 'Saúde Pet',
          value: 'saude-pet',
        },
        {
          label: 'Nutrição Pet',
          value: 'nutricao-pet',
        },
      ],
      admin: {
        description: 'Selecione a categoria do artigo',
      },
    },
    {
      name: 'imageUrl',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Imagem',
      admin: {
        description: 'Faça upload de uma imagem para o artigo',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conteúdo',
      admin: {
        description: 'Digite o conteúdo do artigo',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'URL Amigável',
      admin: {
        position: 'sidebar',
        description: 'URL amigável para o artigo (gerada automaticamente do título)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase()
                .replace(/[áàãâä]/g, 'a')
                .replace(/[éèêë]/g, 'e')
                .replace(/[íìîï]/g, 'i')
                .replace(/[óòõôö]/g, 'o')
                .replace(/[úùûü]/g, 'u')
                .replace(/[ç]/g, 'c')
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}

export default Posts
