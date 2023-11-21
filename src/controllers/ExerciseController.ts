// src/controllers/ExerciseController.ts
import { Request, Response } from 'express'
import { Exercise } from '../types/Exercise'
import { ExerciseRepository } from '../database/ExerciseRepository'

export class ExerciseController {
  private readonly exerciseRepository: ExerciseRepository

  constructor () {
    this.exerciseRepository = new ExerciseRepository()
  }
}
