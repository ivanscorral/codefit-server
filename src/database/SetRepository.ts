import { type Set } from '../types/Set'
import { type Pool } from 'pg'

export class SetRepository {
  private readonly tableName = 'set_tbl'
  private readonly pool: Pool

  constructor (pool: Pool) {
    this.pool = pool
  }

  async insert (set: Set): Promise<void> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const query = {
        text: `INSERT INTO ${this.tableName}(set_order, weight, reps) VALUES($1, $2, $3)`,
        values: [set.id, set.name, set.exercises]
      }
      await client.query(query)
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }

  async findById (id: string): Promise<Set | undefined> {
    const client = await this.pool.connect()
    try {
      const query = {
        text: `SELECT * FROM ${this.tableName} WHERE id = $1`,
        values: [id]
      }
      const result = await client.query(query)
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async findAll (): Promise<Set[]> {
    const client = await this.pool.connect()
    try {
      const query = {
        text: `SELECT * FROM ${this.tableName}`
      }
      const result = await client.query(query)
      return result.rows
    } finally {
      client.release()
    }
  }
}
