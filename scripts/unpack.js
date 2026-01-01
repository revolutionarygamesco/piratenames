import { dirname, join, basename } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import module from '../src/module.json' with { type: 'json' }

const dir = dirname(fileURLToPath(import.meta.url))
const fvtt = `"${join(dir, '../node_modules/.bin/fvtt')}"`
const name = module.id

execSync(`${fvtt} package workon ${name} --type Module`)

for (const pack of module.packs) {
  execSync(`${fvtt} package unpack ${basename(pack.path)} --out "src/${pack.path}"`)
}
