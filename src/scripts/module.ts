import { MODULE_ID } from './settings'

import rollTable from './roll-table.ts'
import generateGivenName from './given.ts'
import generateSurname from './surname.ts'

Hooks.once('init', async () => {
  const crawl = game.modules.get(MODULE_ID)
  if (!crawl) return

  crawl.api = {
    rollTable,
    generateGivenName,
    generateSurname
  }
})
