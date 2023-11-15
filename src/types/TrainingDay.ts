// trainingDayModel.ts

import type Exercise from './Exercise'

export default interface TrainingDay {
  trainingDayId?: number
  date: Date
  createdAt?: Date
  updatedAt?: Date
  exercises?: Exercise[]
}
