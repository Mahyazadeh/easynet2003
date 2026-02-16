// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { HeroImage } from './collections/HeroImage'
import { Experience } from './collections/Experience'
import { BestPractice } from './collections/BestPractice'
import { PageWithSections } from './collections/PageWithSections'
import { SimplePage } from './collections/SimplePage'
import { Contact } from './collections/Contact'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta : {
      icons: [
        { 
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ]
    }
  },
  collections: [
    Users,
    Media,
    News,
    HeroImage,
    Experience,
    BestPractice,
    PageWithSections,
    SimplePage,
    Contact,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    afterSchemaInit: [
      ({ schema }) => {
        Object.values(schema.tables).forEach((table) => table.enableRLS())
        return schema
      },
    ],
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
})
