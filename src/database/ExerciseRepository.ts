// src/database/ExerciseRepository.ts

import type Exercise from '../types/Exercise'
import pool from './Database'
export class ExerciseRepository {
  private readonly tableName = 'exercise_tbl'
  private readonly setTableName = 'set_tbl'

  public async findAll (): Promise<Exercise[]> {
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

  public async findById (id: number): Promise<Exercise | undefined> {
    const client = await pool.connect()
    try {
      const query = {
        text: `SELECT * FROM ${this.tableName} WHERE exercise_id = $1`,
        values: [id]
      }
      const result = await client.query(query)
      return result.rows[0]
    } finally {
      client.release()
    }
  }

  public async insert (exercise: Exercise): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const query = {
        text: `INSERT INTO ${this.tableName}(training_day_id, exercise_lib_id, exercise_order) VALUES($1, $2, $3)`,
        values: [exercise.trainingDayId, exercise.exerciseLibId, exercise.exerciseOrder]
      }
      await client.query(query)
      await client.query('COMMIT')
    } catch (e) {
      console.error(e)
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}
