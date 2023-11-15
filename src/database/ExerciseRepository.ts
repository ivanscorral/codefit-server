// ExerciseRepository.ts

import { type Pool } from 'pg'

export class ExerciseRepository {
  constructor (private readonly dbPool: Pool) { }
}
