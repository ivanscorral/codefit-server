import { type Pool } from 'pg'
import type LibraryExercise from '../types/LibraryExercise'
import { type MuscleGroup } from '../types/MuscleGroup'

export class LibraryExerciseRepository {
  constructor (private readonly pool: Pool) {}

  async insert (libraryExercise: LibraryExercise): Promise<void> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const query = {
        text: 'INSERT INTO library_exercise_tbl(name, description, muscle_group) VALUES($1, $2, $3)',
        values: [libraryExercise.name, libraryExercise.description, libraryExercise.muscleGroup]
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

  async findAll (): Promise<LibraryExercise[]> {
    const client = await this.pool.connect()
    const query = {
      text: 'SELECT * FROM library_exercise_tbl'
    }
    const result = await client.query(query)
    return result.rows
  }
  
  async findByMuscleGroup (muscleGroup: MuscleGroup): Promise<LibraryExercise[]> {
    const client = await this.pool.connect()
    const query = {
      text: 'SELECT * FROM library_exercise_tbl WHERE muscle_group = $1',
      values: [muscleGroup]
    }
    const result = await client.query(query)
    return result.rows
  }
}
