import { configureStore } from '@reduxjs/toolkit'
import langSlice from './slices/langSlice'
import resumeSlice from './slices/resumeSlice'

export default configureStore({
    reducer: {
        lang: langSlice,
        resume: resumeSlice
    },
})