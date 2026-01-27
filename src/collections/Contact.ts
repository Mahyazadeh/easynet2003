import type { CollectionConfig  } from 'payload'

export const Contact: CollectionConfig  = {
  slug: 'contact',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contattaci',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'Contattaci',
    },
     {
      name: 'description',
      type: 'text',
    },

    {
      name: 'sedeLegale',
      type: 'group',
      label: 'Sede Legale',
      fields: [
        {
          name: 'address',
          type: 'text',
          required: true,
          defaultValue: 'Via Guglielmo Calderini, 68, 00196 Roma RM',
        },
        {
          name: 'phone1',
          type: 'text',
          defaultValue: '+39 (06) 8076438',
        },
        {
          name: 'phone2',
          type: 'text',
          defaultValue: '+39 (06) 80669000',
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@easynet2003.it',
        },      
      ],
    },

    {
      name: 'sedeSecondaria',
      type: 'array',
      label: 'Sede Secondaria',
      fields: [
        {
          name: 'address',
          type: 'text',
          required: true,
          defaultValue: 'indirizzio',
        },
      ],
    },

    {
      name: 'intro',
      type: 'richText',
      label: 'Testo introduttivo',
    },
    {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Section Image',
        },
  ],
}