// src/boards.ts
export const HOME_ID = "home";

export type Tile = {
  id: string;
  label: string;
  speak?: string;
  toBoardId?: string;
  color?: string; // optional tile background
  icon?: string;  // optional emoji for now (we’ll do real icons next)
};

export type Board = {
  id: string;
  title: string;
  tiles: Tile[];
};

export const CORE_TILES: Tile[] = [
  { id: "core-i", label: "I", speak: "i" },
  { id: "core-want", label: "want" },
  { id: "core-more", label: "more" },
  { id: "core-help", label: "help" },
  { id: "core-stop", label: "stop" },
  { id: "core-go", label: "go" },
  { id: "core-like", label: "like" },
  { id: "core-dont", label: "don’t" },
  { id: "core-yes", label: "yes" },
  { id: "core-no", label: "no" },
  { id: "core-what", label: "what" },
  { id: "core-not", label: "not" },
];

export const boards: Record<string, Board> = {
  [HOME_ID]: {
    id: HOME_ID,
    title: "Home",
    tiles: [
      { id: "cat-quick", label: "Quick", toBoardId: "quick", color: "#1f2f5c" },
      { id: "cat-feelings", label: "Feelings", toBoardId: "feelings", color: "#1f2f5c" },
      { id: "cat-needs", label: "Needs", toBoardId: "needs", color: "#1f2f5c" },
      { id: "cat-food", label: "Food/Drink", toBoardId: "food", color: "#1f2f5c" },
      { id: "cat-pain", label: "Pain", toBoardId: "pain", color: "#1f2f5c" },
    ],
  },

  quick: {
    id: "quick",
    title: "Quick",
    tiles: [
      { id: "home", label: "Home", toBoardId: HOME_ID },
      { id: "q1", label: "Hi" },
      { id: "q2", label: "Thank you" },
      { id: "q3", label: "Please" },
      { id: "q4", label: "Sorry" },
      { id: "q5", label: "I need help", speak: "I need help" },
    ],
  },

  feelings: {
    id: "feelings",
    title: "Feelings",
    tiles: [
      { id: "home", label: "Home", toBoardId: HOME_ID },
      { id: "f1", label: "Happy" },
      { id: "f2", label: "Sad" },
      { id: "f3", label: "Mad" },
      { id: "f4", label: "Scared" },
      { id: "f5", label: "Tired" },
    ],
  },

  needs: {
    id: "needs",
    title: "Needs",
    tiles: [
      { id: "home", label: "Home", toBoardId: HOME_ID },
      { id: "n1", label: "Bathroom", speak: "I need the bathroom" },
      { id: "n2", label: "Water", speak: "I want water" },
      { id: "n3", label: "Eat", speak: "I want to eat" },
      { id: "n4", label: "Break", speak: "I need a break" },
      { id: "n5", label: "Nurse", speak: "Please call the nurse" },
    ],
  },

  food: {
    id: "food",
    title: "Food / Drink",
    tiles: [
      { id: "home", label: "Home", toBoardId: HOME_ID },
      { id: "fd1", label: "Water" },
      { id: "fd2", label: "Juice" },
      { id: "fd3", label: "Coffee" },
      { id: "fd4", label: "Snack" },
      { id: "fd5", label: "Meal" },
    ],
  },

  pain: {
    id: "pain",
    title: "Pain",
    tiles: [
      { id: "home", label: "Home", toBoardId: HOME_ID },
      { id: "p1", label: "No pain", speak: "I have no pain" },
      { id: "p2", label: "A little", speak: "I have a little pain" },
      { id: "p3", label: "Medium", speak: "I have medium pain" },
      { id: "p4", label: "A lot", speak: "I have a lot of pain" },
      { id: "p5", label: "Worst", speak: "This is the worst pain" },
    ],
  },
};
