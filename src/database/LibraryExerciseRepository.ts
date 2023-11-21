import pool from './Database'
import type LibraryExercise from '../types/LibraryExercise'
import { type MuscleGroup } from '../types/MuscleGroup'

export class LibraryExerciseRepository {
  async insert (libraryExercise: LibraryExercise): Promise<void> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const query = {
        text: 'INSERT INTO exercise_library_tbl(name, description, muscle_group) VALUES($1, $2, $3)',
        values: [libraryExercise.name, libraryExercise.description, libraryExercise.muscleGroup]
      }
      console.log(query)
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

  async findAll (): Promise<LibraryExercise[]> {
    const client = await pool.connect()
    try {
      const query = {
        text: 'SELECT * FROM exercise_library_tbl'
      }
      const result = await client.query(query)
      return checkEmptyResults(result.rows)
    } finally {
      client.release()
    }
  }

  async findByMuscleGroup (muscleGroup: MuscleGroup): Promise<LibraryExercise[]> {
    const client = await pool.connect()
    try {
      const query = {
        text: 'SELECT * FROM exercise_library_tbl WHERE muscle_group = $1',
        values: [muscleGroup]
      }
      const result = await client.query(query)
      return checkEmptyResults(result.rows)
    } finally {
      client.release()
    }
  }

  async findNameContains (str: string): Promise<LibraryExercise[]> {
    const client = await pool.connect()
    try {
      const query = {
        text: 'SELECT * FROM exercise_library_tbl WHERE name LIKE $1',
        values: [`%${str}%`]
      }
      const result = await client.query(query)
      return checkEmptyResults(result.rows)
    } finally {
      client.release()
    }
  }
}

function checkEmptyResults (arr: LibraryExercise[]): LibraryExercise[] {
  if (arr.length === 0) {
    console.warn('[LibraryExerciseRepository]: No library exercises found, returning empty array')
    return []
  }
  return arr
}
