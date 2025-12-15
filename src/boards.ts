// src/boards.ts

export type Tile = {
  id: string;
  label: string;
  speak?: string;      // what gets spoken (defaults to label)
  toBoardId?: string;  // if set, tile navigates to another board
};

export type Board = {
  id: string;
  title: string;
  tiles: Tile[];
};

export const HOME_ID = "home";

export const boards: Record<string, Board> = {
  home: {
    id: "home",
    title: "Home",
    tiles: [
      { id: "i", label: "I", speak: "i" },
      { id: "my", label: "my"},
      { id: "have", label: "have"},
      { id: "want", label: "want" },
      { id: "help", label: "help" },
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
      { id: "more", label: "more" },
      { id: "allDone", label: "all done", speak: "all done" },

      { id: "needs", label: "Needs", toBoardId: "needs" },
      { id: "feelings", label: "Feelings", toBoardId: "feelings" },
      { id: "pain", label: "Pain", toBoardId: "pain" },
    ],
  },

  needs: {
    id: "needs",
    title: "Needs",
    tiles: [
      { id: "bathroom", label: "bathroom" },
      { id: "water", label: "water" },
      { id: "food", label: "food" },
      { id: "rest", label: "rest" },
      { id: "nurse", label: "call nurse", speak: "Please call the nurse." },
      { id: "homeBtn", label: "Home", toBoardId: "home" },
    ],
  },

  feelings: {
    id: "feelings",
    title: "Feelings",
    tiles: [
      { id: "happy", label: "happy" },
      { id: "sad", label: "sad" },
      { id: "angry", label: "angry" },
      { id: "scared", label: "scared" },
      { id: "tired", label: "tired" },
      { id: "homeBtn", label: "Home", toBoardId: "home" },
    ],
  },

  pain: {
    id: "pain",
    title: "Pain",
    tiles: [
      { id: "pain0", label: "0", speak: "I dont feel any pain." },
      { id: "pain1", label: "1", speak: "My pain level is at one." },
      { id: "pain2", label: "2", speak: "My pain level is at two." },
      { id: "pain3", label: "3", speak: "My pain level is at three." },
      { id: "pain4", label: "4", speak: "My pain level is at four." },
      { id: "pain5", label: "5", speak: "My pain level is at five."},
      { id: "pain6", label: "6", speak: "My pain level is at six." },
      { id: "pain7", label: "7", speak: "My pain level is at seven."},
      { id: "pain8", label: "8", speak: "My pain level is at eight." },
      { id: "pain9", label: "9", speak: "My pain level is at nine."},
      { id: "pain10", label: "10", speak: "It hurts so much. Level 10" },
      { id: "sharp", label: "Sharp", speak: "I have sharp pain."},
      {id: "pulse", label: "pulse", speak: "My pain is pulsating."},
      
      { id: "homeBtn", label: "Home", toBoardId: "home" },
    ],
  },
};
