// LibraryExerciseController.ts

import { type Request, type Response } from 'express'
import type LibraryExercise from '../types/LibraryExercise'
import { LibraryExerciseRepository } from '../database/LibraryExerciseRepository'

export class LibraryExerciseController {
  async addLibraryExercise (req: Request, res: Response): Promise<Response> {
    try {
      // TODO: Add parameter validation
      const libraryExercise: LibraryExercise = {
        name: req.body.name,
        description: req.body.description,
        muscleGroup: req.body.muscleGroup
      }
      const libraryExerciseRepository: LibraryExerciseRepository = new LibraryExerciseRepository()
      await libraryExerciseRepository.insert(libraryExercise)
      return res.sendStatus(201)
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}
