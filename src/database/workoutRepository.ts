// workoutRepository.ts

import { type Pool } from 'pg'

export class WorkoutRepository {

  constructor (private readonly dbPool: Pool) { }
}
