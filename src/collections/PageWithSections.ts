import type { CollectionConfig } from 'payload'

export const PageWithSections: CollectionConfig = {
  slug: 'page-with-sections',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      admin: {
        description:
          'This title is only used to identify the page in the admin panel, not displayed on the frontend.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Section Image',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          required: false,
          label: 'Section Title',
        },
        {
          name: 'sectionSubtitle',
          type: 'text',
          required: false,
          label: 'Section Subtitle',
        },
        {
          name: 'sectionContent',
          type: 'textarea',
          required: false,
          label: 'Section Content',
        },
      ],
    },
  ],
}
