import ids from '../ids.ts'
import rollTable from './roll-table.ts'

export const nationalities: Nationality[] = ['Spanish', 'British', 'French', 'Dutch']

export const isNationality = (candidate: unknown): candidate is Nationality => {
  if (typeof candidate !== 'string') return false
  return nationalities.includes(candidate as Nationality)
}

const pickNationality = async (): Promise<Nationality> => {
  const drawn = await rollTable(ids.nationality)
  const name = drawn?.name
  return isNationality(name) ? name : 'Spanish'
}

export default pickNationality
