// exerciseModel.ts

import type LibraryExercise from './LibraryExercise'
import type TrainingSet from './Set'

export default interface Exercise {
  exerciseId?: number
  libExercise: LibraryExercise
  sets?: TrainingSet[]
  exerciseOrder: number
  createdAt?: Date
  updatedAt?: Date
}
