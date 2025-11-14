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
    },
  ],
}
