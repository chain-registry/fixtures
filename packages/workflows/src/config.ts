import { join, resolve } from "path";


export const rootDir = resolve(join(__dirname, '/../../../'));
export const sourceDir = join(rootDir, '/repos/chain-registry')
export const registriesDir = join(rootDir, '/registries')