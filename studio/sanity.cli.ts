import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'z3grtien',
    dataset: 'production',
  },
  studioHost: 'tischlerei-mehlhorn',
  deployment: {
    appId: 'qn0bh6p0x8apolrznbhylrxv',
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: '../web/app/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
})
