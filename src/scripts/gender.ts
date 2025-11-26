import { otherTables } from '../ids.ts'
import rollTable from './roll-table.ts'

export const genders: Gender[] = ['Feminine', 'Masculine']

export const isGender = (candidate: unknown): candidate is Gender => {
  if (typeof candidate !== 'string') return false
  return genders.includes(candidate as Gender)
}

const pickGender = async (): Promise<Gender> => {
  const drawn = await rollTable(otherTables.genders, { displayChat: false })
  const name = drawn?.name
  return isGender(name) ? name : 'Masculine'
}

export default pickGender
