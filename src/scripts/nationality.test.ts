import pickNationality, { isNationality, nationalities } from './nationality.ts'

jest.mock('./wrapper.ts', () => ({
  fromUuid: jest.fn().mockResolvedValue({ draw: async () => { return { results: [{ name: 'Spanish' }] } } })
}))

describe('isNationality', () => {
  it.each([
    ['undefined', undefined],
    ['null', null],
    ['functions', () => {}],
    ['true', true],
    ['false', false],
    ['numbers', 42],
    ['a random string', 'German'],
    ['an array', []],
    ['an object', {}]
  ] as [string, any][])('rejects %s', (_desc: string, candidate: any) => {
    expect(isNationality(candidate)).toBe(false)
  })

  it.each(nationalities)('accepts %s', (nationality: Nationality) => {
    expect(isNationality(nationality)).toBe(true)
  })
})

describe('pickNationality', () => {
  it('picks a nationality', async () => {
    expect(await pickNationality()).toBe('Spanish')
  })
})
