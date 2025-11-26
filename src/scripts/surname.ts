import { surnames } from '../ids.ts'
import pickNationality from './nationality.ts'
import rollTable from './roll-table.ts'

const generateSurname = async (
  nationality?: Nationality
): Promise<string> => {
  const n = nationality ?? await pickNationality()
  const drawn = await rollTable(surnames[n], { displayChat: false })
  return drawn?.description ?? 'Smith'
}

export default generateSurname
