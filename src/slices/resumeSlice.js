import { createSlice } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import default_array from '../data/default.json';
import default_history from '../data/default_history.json';

export const resumeSlice = createSlice({
  name: 'resumeo-data',
  initialState: {
    data: window.localStorage.getItem('resumeo-data') ? JSON.parse(window.localStorage.getItem('resumeo-data')) : {},
    historyStack: default_history,
    newStack: default_history
  },
  reducers: {
    init: (state, action) => {
      const date = new Date();
      if(!state.data[action.payload.id])
      {
        state.data[action.payload.id] = {...default_array, 
          created_at: JSON.stringify(date),
        };
        
        state.data[action.payload.id].name = "Untitled " + Object.keys(state.data).length;
        window.localStorage.setItem('resumeo-data', JSON.stringify(state.data));
      }
      state.data[action.payload.id]["opened_at"] = JSON.stringify(date);
    },
    addArray: (state, action) => {
      state.historyStack[action.payload.lang].push(JSON.stringify({id: action.payload.id, data: state.data[action.payload.id][action.payload.lang]}));
      console.log(JSON.stringify(state.historyStack));
      state.data[action.payload.id][action.payload.lang][action.payload.field].unshift({id: v4()});
      window.localStorage.setItem('resumeo-data', JSON.stringify(state.data));
    },
    writeArray: (state, action) => {
      state.historyStack[action.payload.lang].push(JSON.stringify({id: action.payload.id, data: state.data[action.payload.id][action.payload.lang]}));
      state.data[action.payload.id][action.payload.lang][action.payload.field][action.payload.position][action.payload.key] = action.payload.value;
      window.localStorage.setItem('resumeo-data', JSON.stringify(state.data));
    },
    deleteArray: (state, action) => {
      state.historyStack[action.payload.lang].push(JSON.stringify({id: action.payload.id, data: state.data[action.payload.id][action.payload.lang]}));
      state.data[action.payload.id][action.payload.lang][action.payload.field].splice(action.payload.position, 1);
      window.localStorage.setItem('resumeo-data', JSON.stringify(state.data));
    },
    write: (state, action) => {
      state.data[action.payload.id][action.payload.lang][action.payload.field] = action.payload.value;
      window.localStorage.setItem('resumeo-data', JSON.stringify(state.data));
    },
    scrollImage: (state, action) => {
      state.data[action.payload.id][action.payload.lang].picture[action.payload.direction] = action.payload.value;
    },
    save: (state, action) => {
      state.historyStack[action.payload.lang].push(JSON.stringify({id: action.payload.id, data: state.data[action.payload.id][action.payload.lang]}));
    },
    undo: (state, action) => {
      if(state.historyStack[action.payload.lang].length == 0) return;
      const new_data = JSON.parse(state.historyStack[action.payload.lang].pop());
      state.newStack[action.payload.lang].push(JSON.stringify({id: new_data.id, data: state.data[new_data.id][action.payload.lang]}))
      state.data[new_data.id][action.payload.lang] = {...new_data.data};
      
      window.localStorage.setItem('resumeo-data', JSON.stringify(state.data));
    },
    redo: (state, action) => {
      if(state.newStack[action.payload.lang].length == 0) return;
      const new_data = JSON.parse(state.newStack[action.payload.lang].pop());
      state.historyStack[action.payload.lang].push(JSON.stringify({id: new_data.id, data: state.data[new_data.id][action.payload.lang]}))
      state.data[new_data.id][action.payload.lang] = {...new_data.data};
      
      window.localStorage.setItem('resumeo-data', JSON.stringify(state.data));
    }
  }
})

export const { write, writeArray, addArray, deleteArray, init, undo, redo, save, scrollImage } = resumeSlice.actions

export default resumeSlice.reducer