# Pirate Name Generator

![Latest Release](https://img.shields.io/github/v/release/revolutionarygamesco/piratenames?label=Latest+release&style=for-the-badge)
![Foundry Version](https://img.shields.io/badge/Foundry-v13-informational?label=Foundry+version&style=for-the-badge)
![Test Status](https://img.shields.io/github/actions/workflow/status/revolutionarygamesco/piratenames/test.yml?label=Test+status&style=for-the-badge)
![License](https://img.shields.io/github/license/revolutionarygamesco/piratenames?style=for-the-badge)

This module provides roll tables, API methods, and macros to generate common
Spanish, British, French, and Dutch names from the 18th century (the European
imperial powers present in the Caribbean during the Golden Age of Piracy).

## API

### `generateGivenName`

Rolls on the appropriate roll table to find a random given name that fits the
nationality and gender provided.

#### Signature

```typescript
type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'
type Gender = 'Masculine' | 'Feminine' // It was a less enlightend age.

interface GenerateGivenNameOptions {
  nation: Nationality
  gender: Gender
  whisper?: string[]
}

async (options: GenerateGivenNameOptions) => Promise<string>
```

#### Parameters

##### `options.nation`

Sets the nationality that the name should be taken from.

_Default:_ Roll on the _Nationalities_ roll table included in the module. This
reflects the relative dominance of each nation in the Caribbean during the
Golden Age of Piracy. Spanish is the most common, British second, with French
and Dutch less common.

#### `options.gender`

Sets the gender of the name to be generated.

_Default_: Roll on the _Name Genders_ roll table included in the module,
with equal chances of getting `Masculine` or `Feminine`.

#### `options.whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`

### `generateSurName`

Rolls on the appropriate roll table to find a random surname from the
nationality provided.

#### Signature

```typescript
type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'

interface GenerateSurameOptions {
  nation: Nationality
  whisper?: string[]
}

async (options: GenerateSurameOptions) => Promise<string>
```

#### Parameters

##### `options.nation`

Sets the nationality that the name should be taken from.

In Spanish, people use two surnames (from both their father and their mother).
While `generateName` returns a person’s full name using this rule, this method
returns just one surname.

_Default:_ Roll on the _Nationalities_ roll table included in the module. This
reflects the relative dominance of each nation in the Caribbean during the
Golden Age of Piracy. Spanish is the most common, British second, with French
and Dutch less common.

#### `options.whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`

### `generateName`

Generates a reasonable full name for the nationality and gender specified.

_Mostly_ this is a matter of calling `generateGivenName`, then
`generateSurname`, and concatenating the result. The exceptions are:

* For Spanish, we use the _Spanish Naming Structure_ roll table to select if
  the name has a single or composite given name. Etiher way, we use the
  standard double surname (`GIVEN_NAME` _y_ `GIVEN_NAME`).
* If a Spanish woman’s name is _María_, there’s a 50% chance that we roll
  on the _Spanish Feminine Marian Names_ table for an expanded name.
* In French, a number of masculine names can be preceded by _Jean_ to form a
  compound name (e.g., `Jean-Luc`, `Jean-Paul`). If one of these names is
  drawn, there’s a 50% chance that we prepend _Jean-_ to it.
* In Dutch, there’s a 50% chance that instead of drawing a surname, we create a
  patronymic by drawing a masculine given name and appending _szoon_ to
  masculine names or _sdochter_ to feminine names.

#### Signature

```typescript
type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'
type Gender = 'Masculine' | 'Feminine' // It was a less enlightend age.

interface GenerateNameOptions {
  nation: Nationality
  gender: Gender
  whisper?: string[]
}

async (options: GenerateNameOptions) => Promise<string>
```

#### Parameters

##### `options.nation`

Sets the nationality that the name should be taken from.

_Default:_ Roll on the _Nationalities_ roll table included in the module. This
reflects the relative dominance of each nation in the Caribbean during the
Golden Age of Piracy. Spanish is the most common, British second, with French
and Dutch less common.

#### `options.gender`

Sets the gender of the name to be generated.

_Default_: Roll on the _Name Genders_ roll table included in the module,
with equal chances of getting `Masculine` or `Feminine`.

#### `options.whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`