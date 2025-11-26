import { givenNames } from '../ids.ts'
import pickNationality from './nationality.ts'
import pickGender from './gender.ts'
import rollTable from './roll-table.ts'

const generateGivenName = async (
  nationality?: Nationality,
  gender?: Gender
): Promise<string> => {
  const n = nationality ?? await pickNationality()
  const g = gender ?? await pickGender()
  const drawn = await rollTable(givenNames[n][g], { displayChat: false })
  return drawn?.description ?? 'John'
}

export default generateGivenName
