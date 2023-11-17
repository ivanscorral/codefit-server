// LibraryExerciseController.ts

import { type Request, type Response } from 'express'

import { LibraryExerciseRepository } from '../database/LibraryExerciseRepository'

export class LibraryExerciseController {
    
    public async addLibraryExercise (req: Request, res: Response): Promise<void> {
        const libraryExercise = req.body
        const libraryExerciseRepository = new LibraryExerciseRepository()
        await libraryExerciseRepository.insert(libraryExercise)
        res.sendStatus(201)
    }
    
}
