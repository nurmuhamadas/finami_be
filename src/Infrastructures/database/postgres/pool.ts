import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Pool } = require('pg')

const pool = new Pool()

export default pool
