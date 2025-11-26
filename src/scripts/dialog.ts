import { MODULE_ID } from './settings.ts'
import { localize } from './wrapper.ts'
import { isNationality } from './nationality.ts'
import { isGender } from './gender.ts'
import generateName from './full.ts'
import generateShipName from './ship.ts'

const defaultOnComplete = async (nation: string, type: string) => {
  const n = isNationality(nation) ? nation : undefined
  const whisper = [game.user.id]

  if (type === 'Merchant') {
    await generateShipName({ nation: n, naval: false, whisper })
  } else if (type === 'Naval') {
    await generateShipName({ nation: n, naval: true, whisper })
  } else {
    const gender = isGender(type) ? type : undefined
    await generateName(n, gender, whisper)
  }
}

const openGenerateNameDialog = async (
  onComplete: (nation: string, type: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const title = localize(`${MODULE_ID}.dialog.title`)

  const nationalityOptions = ['Spanish', 'British', 'French', 'Dutch', 'Random'].map(nation => {
    const value = localize(`${MODULE_ID}.dialog.nationalities.options.${nation}`)
    return `<option value="${nation}">${value}</option>`
  }).join('\n')

  const typeOptions = ['Masculine', 'Feminine', 'Random', 'Merchant', 'Naval'].map(t => {
    const value = localize(`${MODULE_ID}.dialog.type.options.${t}`)
    return `<option value="${t}">${value}</option>`
  }).join('\n')

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-add-exploit`,
    window: { title },
    position: { width: 500 },
    content: `
        <label for="generate-name-dialog-nationality">
          ${localize(`${MODULE_ID}.dialog.nationalities.label`)}
        </label>
        <p class="hint">
          ${localize(`${MODULE_ID}.dialog.nationalities.hint`)}
        </p>
        <select name="nationality" id="generate-name-dialog-nationality">
          ${nationalityOptions}
        </select>
        
        <label for="generate-name-dialog-type">
          ${localize(`${MODULE_ID}.dialog.type.label`)}
        </label>
        <p class="hint">
          ${localize(`${MODULE_ID}.dialog.type.hint`)}
        </p>
        <select name="type" id="generate-name-dialog-type">
          ${typeOptions}
        </select>
      `,
    buttons: [
      {
        action: 'generate',
        label: localize(`${MODULE_ID}.dialog.actions.generate`),
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const nation: string | undefined = (coll.namedItem('nationality') as HTMLSelectElement).value
          const type: string | undefined = (coll.namedItem('type') as HTMLSelectElement).value
          await onComplete(nation, type)
        }
      },
      {
        action: 'cancel',
        label: localize(`${MODULE_ID}.dialog.actions.cancel`),
        callback: async () => {
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openGenerateNameDialog
