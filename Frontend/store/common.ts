import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import { HYDRATE } from 'next-redux-wrapper'

// Type for our state
export interface PlayListState {
  selectedList: any;
  lists: any[];
  loading: boolean;
}

// Initial state
const initialState: PlayListState = {
  selectedList: null,
  lists: [],
  loading: false
};

// Actual Slice
export const playListSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setSelectList(state, action) {
      state.selectedList = action.payload;
    },
    setLists(state, action) {
      state.lists = action.payload
    },
    addList(state, action) {
      state.lists = [
        ...state.lists,
        action.payload
      ]
    },
    setLoading(state, action) {
      state.loading = action.payload
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setSelectList, setLists, addList, setLoading } = playListSlice.actions;

export const selectedList = (state: AppState) => state.playlist.selectedList;
export const playLists = (state: AppState) => state.playlist.lists;
export const loading = (state: AppState) => state.playlist.loading;

export default playListSlice.reducer;
