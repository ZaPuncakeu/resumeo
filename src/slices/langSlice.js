import { createSlice } from '@reduxjs/toolkit'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
export const langSlice = createSlice({
  name: 'language',
  initialState: {
    lang: window.localStorage.getItem('resumeo-lang') ? window.localStorage.getItem('resumeo-lang') : 'en',
    text: !window.localStorage.getItem('resumeo-lang') || window.localStorage.getItem('resumeo-lang') == 'en' ? en : fr
  },
  reducers: {
    changeLanguage: (state, action) => {
        window.localStorage.setItem('resumeo-lang', action.payload)
        state.lang = action.payload;
        window.location.reload();
    }
  },
})

export const { changeLanguage } = langSlice.actions

export default langSlice.reducer