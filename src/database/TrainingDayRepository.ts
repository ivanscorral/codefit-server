import { type Pool } from 'pg'
import type TrainingDay from '../types/TrainingDay'

export default class TrainingDayRepository {
  constructor (private readonly pool: Pool) { }

  async findAll (): Promise<TrainingDay[]> {
    const client = await this.pool.connect()
    try {
      const query = {
        text: 'SELECT * FROM training_day_tbl'
      }
      const result = await client.query(query)
      return result.rows
    } finally {
      client.release()
    }
  }

  async insert (trainingDay: TrainingDay): Promise<number> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const query = {
        text: 'INSERT INTO training_day_tbl(date) VALUES($1) RETURNING training_day_id',
        values: [trainingDay.date]
      }
      const result = await client.query(query)
      await client.query('COMMIT')
      return result.rows[0].training_day_id
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}
