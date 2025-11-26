import { shipNames } from '../ids.ts'
import pickNationality from './nationality.ts'
import rollTable from './roll-table.ts'
import whisperMessage from './whisper.ts'
import {localize} from './wrapper.ts'
import {MODULE_ID} from './settings.ts'

const getType = (options?: GenerateShipNameOptions): 'Merchant' | 'Naval' => {
  return options?.naval === true ? 'Naval' : 'Merchant'
}

const generateBaseShipName = async (
  nationality: Nationality,
  type: 'Naval' | 'Merchant' | 'Religious',
  fallback: string = 'Ranger'
): Promise<string> => {
  const drawn = await rollTable(shipNames[nationality][type], { displayChat: false })
  return drawn?.description ?? fallback
}

const generateSpanishShipName = async (options?: GenerateShipNameOptions): Promise<SpanishShipName> => {
  return {
    religious: await generateBaseShipName('Spanish', 'Religious', 'Santa Maria'),
    secular: await generateBaseShipName('Spanish', getType(options), 'Real Felipe')
  }
}

const generateShipName = async (options?: GenerateShipNameOptions): Promise<string | SpanishShipName> => {
  const n = options?.nation ?? await pickNationality()
  const name = n === 'Spanish'
    ? await generateSpanishShipName(options)
    : await generateBaseShipName(n, getType(options))

  if (options?.whisper) {
    const flavor = localize(`${MODULE_ID}.message.flavor.ship`, { nation: n })
    const str = typeof name === 'string'
      ? name
      : `${name.religious} (${name.secular})`
    await whisperMessage(options.whisper, flavor, str)
  }

  return name
}

export default generateShipName
