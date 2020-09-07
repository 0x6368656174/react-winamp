import { createSelector, createSlice } from '@reduxjs/toolkit';

interface State {
  state: 'played' | 'stopped' | 'paused';
  showTimeLeft: boolean;
  duration: number;
  position: number;
  volume: number;
  balance: number;
  currentSongNumber: number;
  playlist: string[];
  audioNames: string[];
  freq: number[];
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    state: 'stopped',
    showTimeLeft: false,
    duration: 0,
    position: 0,
    volume: 0.8,
    balance: 0,
    currentSongNumber: 0,
    playlist: [process.env.PUBLIC_URL + '/songs/llama.mp3'],
    audioNames: ["DJ Mike Llama - Llama Whippin' Intro"],
    freq: [],
  } as State,
  reducers: {
    play: (state) => {
      if (state.state === 'played') {
        state.position = 0;
      } else {
        state.state = 'played';
      }
    },
    stop: (state) => {
      state.state = 'stopped';
      state.position = 0;
      state.freq = [];
    },
    pause: (state) => {
      state.state = 'paused';
    },
    durationChanged: (state, action) => {
      state.duration = action.payload;
    },
    positionChanged: (state, action) => {
      state.position = action.payload;
    },
    showTimeLeftToggled: (state) => {
      state.showTimeLeft = !state.showTimeLeft;
    },
    volumeChanged: (state, action) => {
      state.volume = action.payload;
    },
    balanceChanged: (state, action) => {
      state.balance = action.payload;
    },
    freqChanged: (state, action) => {
      state.freq = action.payload;
    },
  },
});

export const {
  play,
  stop,
  pause,
  positionChanged,
  showTimeLeftToggled,
  volumeChanged,
  balanceChanged,
  durationChanged,
  freqChanged,
} = appSlice.actions;

export const selectApp = (state: { app: State }) => state.app;
export const selectState = createSelector([selectApp], (state) => state.state);
export const selectDuration = createSelector([selectApp], (state) => state.duration);
export const selectPosition = createSelector([selectApp], (state) => state.position);
export const selectVolume = createSelector([selectApp], (state) => state.volume);
export const selectBalance = createSelector([selectApp], (state) => state.balance);
export const selectShowTimeLeft = createSelector([selectApp], (state) => state.showTimeLeft);
export const selectCurrentSongNumber = createSelector(
  [selectApp],
  (state) => state.currentSongNumber
);
export const selectPlaylist = createSelector([selectApp], (state) => state.playlist);
export const selectCurrentSong = createSelector(
  [selectPlaylist, selectCurrentSongNumber],
  (playlist, currentSongNumber) => {
    return playlist[currentSongNumber];
  }
);

export const selectAudioNames = createSelector([selectApp], (state) => state.audioNames);
export const selectCurrentSongName = createSelector(
  [selectAudioNames, selectCurrentSongNumber],
  (audioNames, currentSongNumber) => {
    return currentSongNumber + 1 + '. ' + audioNames[currentSongNumber];
  }
);
export const selectFreq = createSelector([selectApp], (state) => state.freq);

export default appSlice.reducer;
