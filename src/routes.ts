import express from 'express'
import { LibraryExerciseController } from './routes/LibraryExerciseController'
const router = express.Router()

const libraryExerciseController = new LibraryExerciseController()

router.post('/library-exercises', (req, res, next) => {
  libraryExerciseController.addLibraryExercise(req, res).catch(next)
})

export default router
