import pickNationality from './nationality.ts'
import pickGender from './gender.ts'
import generateGivenName from './given.ts'
import generateSurname from './surname.ts'

const jeanable = ['Baptiste', 'Paul', 'Pierre', 'Louis', 'Claude', 'François',
  'Jacques', 'Charles', 'Michel', 'Joseph', 'Marc', 'Luc', 'Philippe',
  'Christophe', 'René', 'Antoine', 'Gabriel']

const check = (threshold: number = 0.5): boolean => Math.random() < threshold

const generateDutchPatronym = async (gender: Gender): Promise<string> => {
  const father = await generateGivenName('Dutch', 'Masculine')
  const suffix = gender === 'Feminine' ? 'dochter' : 'zoon'
  return `${father}s${suffix}`
}

const generateSpanishSurname = async (): Promise<string> => {
  const surname = await generateSurname('Spanish')
  return check(0.7)
    ? surname
    : `${surname}-${await generateSurname('Spanish')}`
}

const generateFullSpanishSurname = async (): Promise<string> => {
  const father = await generateSpanishSurname()
  const mother = await generateSpanishSurname()
  return `${father} y ${mother}`
}

const generateName = async (
  nationality?: Nationality,
  gender?: Gender
): Promise<string> => {
  const n = nationality ?? await pickNationality()
  const g = gender ?? await pickGender()

  let given = await generateGivenName(n, g)
  let surname = n === 'Spanish'
    ? await generateFullSpanishSurname()
    :await generateSurname(n)

  if (n === 'French' && jeanable.includes(given) && check()) given = `Jean-${given}`
  if (n === 'Dutch' && check()) surname = await generateDutchPatronym(g)

  return `${given} ${surname}`.replace(/<[^>]*>/g, '')
}

export default generateName
