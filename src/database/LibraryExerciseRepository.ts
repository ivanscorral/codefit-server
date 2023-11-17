import pool from './Database'
import type LibraryExercise from '../types/LibraryExercise'
import { type MuscleGroup } from '../types/MuscleGroup'

export class LibraryExerciseRepository {
  async insert (libraryExercise: LibraryExercise): Promise<void> {
    const client = await pool.connect()
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
    const client = await pool.connect()
    try {
      const query = {
        text: 'SELECT * FROM library_exercise_tbl'
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
        text: 'SELECT * FROM library_exercise_tbl WHERE muscle_group = $1',
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
        text: 'SELECT * FROM library_exercise_tbl WHERE name LIKE $1',
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
