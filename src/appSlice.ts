import { createSelector, createSlice } from '@reduxjs/toolkit';

interface File {
  path: string;
  name: string;
  duration: number;
}

const playlist: File[] = [
  {
    name: "DJ Mike Llama - Llama Whippin' Intro",
    path: process.env.PUBLIC_URL + '/songs/llama.mp3',
    duration: 5,
  },
  {
    name: 'Jay Z - 99 Problems',
    path: process.env.PUBLIC_URL + '/songs/jay-z_99-problems.mp3',
    duration: 234,
  },
  {
    name: 'Eminem & Dido — Stan',
    path: process.env.PUBLIC_URL + '/songs/eminem_stan.mp3',
    duration: 404,
  },
  {
    name: '50 Cent - In Da Club',
    path: process.env.PUBLIC_URL + '/songs/50-cent_in-da-club.mp3',
    duration: 193,
  },
  {
    name: 'Radiohead - Everything In Its Right Place',
    path: process.env.PUBLIC_URL + '/songs/radiohead_everything-in-its-right-place.mp3',
    duration: 251,
  },
  {
    name: 'Kanye West feat. Jamie Fox - Gold Digger',
    path: process.env.PUBLIC_URL + '/songs/kanye-west_gold-digger.mp3',
    duration: 289,
  },
  {
    name: 'Franz Ferdinand - Take Me Out',
    path: process.env.PUBLIC_URL + '/songs/franz-ferdinand_take-me-out.mp3',
    duration: 237,
  },
  {
    name: 'U2 — Moment Of Surrender',
    path: process.env.PUBLIC_URL + '/songs/u2_moment-of-surrender.mp3',
    duration: 444,
  },
  {
    name: 'Gorillaz - Clint Eastwood',
    path: process.env.PUBLIC_URL + '/songs/gorillaz_clint-eastwood.mp3',
    duration: 339,
  },
  {
    name: 'Britney Spears - Toxic',
    path: process.env.PUBLIC_URL + '/songs/britney-spears_toxic.mp3',
    duration: 245,
  },
  {
    name: 'Green Day - American Idiot',
    path: process.env.PUBLIC_URL + '/songs/green-day_american-idiot.mp3',
    duration: 174,
  },
  {
    name: 'Lady Gaga - Poker Face',
    path: process.env.PUBLIC_URL + '/songs/lady-gaga_poker-face.mp3',
    duration: 207,
  },
  {
    name: 'P!nk - Get The Party Started',
    path: process.env.PUBLIC_URL + '/songs/pink_get-the-party-started.mp3',
    duration: 191,
  },
  {
    name: 'Madonna - Hung Up',
    path: process.env.PUBLIC_URL + '/songs/madonna_hung-up.mp3',
    duration: 336,
  },
];

interface State {
  state: 'played' | 'stopped' | 'paused';
  showTimeLeft: boolean;
  duration: number;
  position: number;
  volume: number;
  balance: number;
  currentSongNumber: number;
  freq: number[];
  playlist: File[];
  shuffleEnabled: boolean;
  repeatEnabled: boolean;
  messageText: string;
  playlistVisible: boolean;
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
    freq: [],
    playlist,
    repeatEnabled: false,
    shuffleEnabled: false,
    messageText: '',
    playlistVisible: true,
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
      if (state.state === 'paused') {
        state.state = 'played';
      } else {
        state.state = 'paused';
      }
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

      if (state.messageText.startsWith('VOLUME')) {
        state.messageText = `VOLUME: ${Math.floor(state.volume * 100)}%`;
      }
    },
    balanceChanged: (state, action) => {
      state.balance = action.payload;

      if (state.messageText.startsWith('BALANCE')) {
        const value = Math.floor(Math.floor(state.balance));
        let balanceText = 'CENTER';
        if (value < 0) {
          balanceText = `${-1 * value}% LEFT`;
        } else if (value > 0) {
          balanceText = `${value}% RIGHT`;
        }
        state.messageText = `BALANCE: ${balanceText}`;
      }
    },
    freqChanged: (state, action) => {
      if (state.state !== 'stopped') {
        state.freq = action.payload;
      } else {
        state.freq = [];
      }
    },
    nextSong: (state, action) => {
      const nextSongNumber = getNextSong(
        state.playlist,
        state.currentSongNumber,
        state.shuffleEnabled,
        state.repeatEnabled,
        action.payload
      );

      if (nextSongNumber === undefined) {
        state.state = 'stopped';
      } else {
        state.currentSongNumber = nextSongNumber;
      }
    },
    currentSongChanged: (state, action) => {
      state.currentSongNumber = action.payload;
    },
    shuffleEnabledChanged: (state, action) => {
      state.shuffleEnabled = action.payload;
    },
    repeatEnabledChanged: (state, action) => {
      state.repeatEnabled = action.payload;
    },
    messageTextChanged: (state, action) => {
      state.messageText = action.payload;
    },
    playlistVisibleChanged: (state, action) => {
      state.playlistVisible = action.payload;
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
  nextSong,
  currentSongChanged,
  shuffleEnabledChanged,
  repeatEnabledChanged,
  messageTextChanged,
  playlistVisibleChanged,
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
export const selectTotalDuration = createSelector([selectPlaylist], (playlist) =>
  playlist.reduce((acc, file) => acc + file.duration, 0)
);

export const selectFreq = createSelector([selectApp], (state) => state.freq);

export const selectShuffleEnabled = createSelector([selectApp], (state) => state.shuffleEnabled);
export const selectRepeatEnabled = createSelector([selectApp], (state) => state.repeatEnabled);

export const selectMessageText = createSelector([selectApp], (state) => state.messageText);
export const selectPlaylistVisible = createSelector([selectApp], (state) => state.playlistVisible);

function getNextSong(
  playlist: State['playlist'],
  currentSongNumber: number,
  shuffleEnabled: boolean,
  repeatEnabled: boolean,
  increment: 1 | -1
) {
  if (selectPlaylist.length === 1) {
    if (repeatEnabled) {
      return 0;
    } else {
      return undefined;
    }
  }

  if (shuffleEnabled) {
    let next = currentSongNumber;
    while (next === currentSongNumber) {
      next = Math.floor(Math.random() * playlist.length);
    }

    return next;
  }

  if (increment > 0 && currentSongNumber !== playlist.length - 1) {
    return currentSongNumber + increment;
  } else if (increment < 0 && currentSongNumber !== 0) {
    return currentSongNumber + increment;
  }

  if (repeatEnabled) {
    return increment > 0 ? 0 : playlist.length - 1;
  }

  return undefined;
}

export default appSlice.reducer;
