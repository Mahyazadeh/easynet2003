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
    {
  name: 'slug',
  type: 'text',
  required: false, // Inizia con false per evitare problemi di migrazione (poi lo metti true dopo)
  unique: true,    // Impedisce slug duplicati
  index: true,     // Migliora le performance delle query
  label: 'Slug (URL)',
  admin: {
    description: 'Parte finale dell\'URL (es. its-maria-gaetana-agnesi). Verrà generato automaticamente dal titolo se lasciato vuoto.',
    position: 'sidebar', // Lo mette nel sidebar dell'admin per comodità
  },
  hooks: {
    beforeChange: [
      // Hook per generare slug automaticamente dal title
      async ({ value, data, originalDoc, req: { payload } }) => {
        if (value) return value; // Se l'utente ha inserito manualmente, lo tiene

        const title = data?.title || originalDoc?.title;
        if (!title) return '';

        let baseSlug = title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        let slug = baseSlug;
        let counter = 1;

        // Controlla unicità (aggiunge -2, -3 se necessario)
        while (true) {
          const existing = await payload.find({
            collection: 'page-with-sections',
            where: {
              slug: { equals: slug },
              ...(originalDoc?.id ? { id: { not_equals: originalDoc.id } } : {}),
            },
            limit: 1,
          });

          if (existing.docs.length === 0) break;
          slug = `${baseSlug}-${counter++}`;
        }

        return slug;
      },
    ],
  },
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: false,
      label: 'YouTube Video URL',
      admin: {
        description:
          "Inserisci l'URL del video YouTube",
      },
    },
    {
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
