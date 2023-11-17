import type Set from '../types/Set'
import pool from './Database'

export class SetRepository {
  private readonly tableName = 'set_tbl'

  async insert (set: Set): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      // Get the highest set_order for the current exercise
      const maxOrderResult = await client.query(
        'SELECT MAX(set_order) as max_order FROM set_tbl WHERE exercise_id = $1',
        [set.exerciseId]
      )
      const maxOrder = maxOrderResult.rows[0]?.max_order !== undefined ? maxOrderResult.rows[0].max_order : 0

      const query = {
        text: `INSERT INTO ${this.tableName}(exercise_id, set_order, reps, weight) VALUES($1, $2, $3, $4)`,
        values: [set.exerciseId, maxOrder + 1, set.reps, set.weight]
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

  async findById (id: number): Promise<Set | undefined> {
    const client = await pool.connect()
    try {
      const query = {
        text: `SELECT * FROM ${this.tableName} WHERE set_id = $1`,
        values: [id]
      }
      const result = await client.query(query)
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async findAll (): Promise<Set[]> {
    const client = await pool.connect()
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
