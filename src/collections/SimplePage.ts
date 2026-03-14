import type { CollectionConfig } from 'payload'

export const SimplePage: CollectionConfig = {
  slug: 'simple-page',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Description',
    },   {
  name: 'seo',
  type: 'group',
  label: 'SEO Metadata',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      required: false,
      admin: {
        description: 'Titolo usato per SEO',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      required: false,
      admin: {
        description: 'Descrizione SEO ',
      },
      maxLength: 160,
    },
  ],
}
  ],
}
