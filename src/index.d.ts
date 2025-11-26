declare class ChatMessage {
  create(data?: any, operation?: any): Promise<any>
}

interface Collection<K, V> extends Map<K, V> {
  find(predicate: (value: V, key: K, collection: this) => boolean): V | undefined
  filter(predicate: (value: V, key: K, collection: this) => boolean): V[]
  map<T>(callback: (value: V, key: K, collection: this) => T): T[]
  some(predicate: (value: V, key: K, collection: this) => boolean): boolean
  every(predicate: (value: V, key: K, collection: this) => boolean): boolean
  reduce<T>(callback: (accumulator: T, value: V, key: K, collection: this) => T, initial: T): T
  getName(name: string): V | undefined
  contents: V[]
}

interface Module {
  api: Record<string, Function>
}

declare const Hooks: {
  on: (name: string, callback: (...args: any[]) => void) => number
  once: (name: string, callback: (...args: any[]) => void) => number
  off: (name: string, fn: number | Function) => void
}

declare const game: {
  i18n: {
    format: (key: string, data?: Record<string, any>) => string
    localize: (key: string) => string
  },
  modules: Collection<string, Module>
}

declare const foundry: {
  documents: {
    ChatMessage: ChatMessage
  }
}

type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'
type Gender = 'Masculine' | 'Feminine' // It was a less enlightened age.


interface RollTableResult {
  type?: string
  img?: string
  name?: string
  description?: string
}

interface RollTableOptions {
  displayChat?: boolean
  recursive?: boolean
  results?: any
  roll?: any
  rollMode?: string
}

interface GenerateShipNameOptions {
  nation: Nationality
  naval: boolean
  whisper?: string[]
}

interface SpanishShipName {
  religious: string
  secular: string
}
