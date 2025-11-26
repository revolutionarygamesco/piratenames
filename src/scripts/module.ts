import { MODULE_ID } from './settings'

import rollTable from './roll-table.ts'
import generateGivenName from './given.ts'
import generateSurname from './surname.ts'
import generateName from './full.ts'
import generateShipName from './ship.ts'
import openGenerateNameDialog from './dialog.ts'

Hooks.once('init', async () => {
  const crawl = game.modules.get(MODULE_ID)
  if (!crawl) return

  crawl.api = {
    rollTable,
    generateGivenName,
    generateSurname,
    generateName,
    generateShipName,
    openGenerateNameDialog
  }
})
