export type TileAction =
  | { type: "say"; text: string }
  | { type: "open"; boardId: string }
  | { type: "back" }
  | { type: "clear" }
  | { type: "delete" };

export type Tile = {
  id: string;
  label: string;
  hint?: string;
  color?: string;
  action: TileAction;
};

export type Board = {
  id: string;
  title: string;
  tiles: Tile[];
};

const t = (id: string, label: string, action: TileAction, hint?: string, color?: string): Tile => ({
  id, label, action, hint, color
});

export const boards: Record<string, Board> = {
  home: {
    id: "home",
    title: "Home",
    tiles: [
      t("yes", "YES", { type: "say", text: "Yes" }, "affirm"),
      t("no", "NO", { type: "say", text: "No" }, "negate"),
      t("help", "HELP", { type: "say", text: "Help" }, "urgent"),
      t("bathroom", "BATHROOM", { type: "say", text: "I need the bathroom" }),
      t("pain", "PAIN", { type: "open", boardId: "pain" }, "scale"),
      t("feelings", "FEELINGS", { type: "open", boardId: "feelings" }, "emotions"),

      t("core", "CORE WORDS", { type: "open", boardId: "core" }, "high frequency"),
      t("people", "PEOPLE", { type: "open", boardId: "people" }),
      t("food", "FOOD", { type: "open", boardId: "food" }),
      t("places", "PLACES", { type: "open", boardId: "places" }),
      t("actions", "ACTIONS", { type: "open", boardId: "actions" }),
      t("questions", "QUESTIONS", { type: "open", boardId: "questions" })
    ]
  },

  core: {
    id: "core",
    title: "Core Words",
    tiles: [
      t("i", "I", { type: "say", text: "I" }),
      t("want", "WANT", { type: "say", text: "want" }),
      t("need", "NEED", { type: "say", text: "need" }),
      t("more", "MORE", { type: "say", text: "more" }),
      t("stop", "STOP", { type: "say", text: "stop" }),
      t("go", "GO", { type: "say", text: "go" }),
      t("like", "LIKE", { type: "say", text: "like" }),
      t("dont", "DON'T", { type: "say", text: "don't" }),
      t("can", "CAN", { type: "say", text: "can" }),
      t("cant", "CAN'T", { type: "say", text: "can't" }),
      t("please", "PLEASE", { type: "say", text: "please" }),
      t("thankyou", "THANK YOU", { type: "say", text: "thank you" })
    ]
  },

  questions: {
    id: "questions",
    title: "Questions",
    tiles: [
      t("what", "WHAT", { type: "say", text: "What" }),
      t("where", "WHERE", { type: "say", text: "Where" }),
      t("when", "WHEN", { type: "say", text: "When" }),
      t("who", "WHO", { type: "say", text: "Who" }),
      t("why", "WHY", { type: "say", text: "Why" }),
      t("how", "HOW", { type: "say", text: "How" }),
      t("canYouHelp", "CAN YOU HELP?", { type: "say", text: "Can you help me?" }),
      t("repeat", "PLEASE REPEAT", { type: "say", text: "Please repeat that" }),
      t("slower", "SLOWER", { type: "say", text: "Please speak slower" }),
      t("understand", "I DON'T UNDERSTAND", { type: "say", text: "I don't understand" }),
      t("yesNo", "YES OR NO", { type: "say", text: "Yes or no" }),
      t("backHome", "HOME", { type: "open", boardId: "home" })
    ]
  },

  pain: {
    id: "pain",
    title: "Pain",
    tiles: [
      t("p0", "0", { type: "say", text: "My pain is zero" }, "none"),
      t("p2", "2", { type: "say", text: "My pain is two" }),
      t("p4", "4", { type: "say", text: "My pain is four" }),
      t("p6", "6", { type: "say", text: "My pain is six" }),
      t("p8", "8", { type: "say", text: "My pain is eight" }),
      t("p10", "10", { type: "say", text: "My pain is ten" }, "worst"),
      t("wherePain", "WHERE HURTS", { type: "say", text: "It hurts here" }),
      t("medicine", "MEDICINE", { type: "say", text: "I need medicine" }),
      t("ice", "ICE", { type: "say", text: "I need ice" }),
      t("heat", "HEAT", { type: "say", text: "I need heat" }),
      t("rest", "REST", { type: "say", text: "I need to rest" }),
      t("callNurse", "CALL NURSE", { type: "say", text: "Please call the nurse" })
    ]
  },

  feelings: {
    id: "feelings",
    title: "Feelings",
    tiles: [
      t("happy", "HAPPY", { type: "say", text: "I feel happy" }),
      t("sad", "SAD", { type: "say", text: "I feel sad" }),
      t("angry", "ANGRY", { type: "say", text: "I feel angry" }),
      t("scared", "SCARED", { type: "say", text: "I feel scared" }),
      t("tired", "TIRED", { type: "say", text: "I feel tired" }),
      t("anxious", "ANXIOUS", { type: "say", text: "I feel anxious" }),
      t("confused", "CONFUSED", { type: "say", text: "I feel confused" }),
      t("okay", "OK", { type: "say", text: "I am okay" }),
      t("notOkay", "NOT OK", { type: "say", text: "I am not okay" }),
      t("calm", "CALM", { type: "say", text: "I want to be calm" }),
      t("frustrated", "FRUSTRATED", { type: "say", text: "I feel frustrated" }),
      t("backHome2", "HOME", { type: "open", boardId: "home" })
    ]
  },

  people: {
    id: "people",
    title: "People",
    tiles: [
      t("wife", "WIFE", { type: "say", text: "my wife" }),
      t("husband", "HUSBAND", { type: "say", text: "my husband" }),
      t("mom", "MOM", { type: "say", text: "my mom" }),
      t("dad", "DAD", { type: "say", text: "my dad" }),
      t("doctor", "DOCTOR", { type: "say", text: "doctor" }),
      t("nurse", "NURSE", { type: "say", text: "nurse" }),
      t("friend", "FRIEND", { type: "say", text: "my friend" }),
      t("family", "FAMILY", { type: "say", text: "my family" }),
      t("me", "ME", { type: "say", text: "me" }),
      t("you", "YOU", { type: "say", text: "you" }),
      t("we", "WE", { type: "say", text: "we" }),
      t("homePeople", "HOME", { type: "open", boardId: "home" })
    ]
  },

  food: {
    id: "food",
    title: "Food",
    tiles: [
      t("water", "WATER", { type: "say", text: "I want water" }),
      t("hungry", "HUNGRY", { type: "say", text: "I am hungry" }),
      t("thirsty", "THIRSTY", { type: "say", text: "I am thirsty" }),
      t("eat", "EAT", { type: "say", text: "I want to eat" }),
      t("drink", "DRINK", { type: "say", text: "I want to drink" }),
      t("coffee", "COFFEE", { type: "say", text: "I want coffee" }),
      t("tea", "TEA", { type: "say", text: "I want tea" }),
      t("snack", "SNACK", { type: "say", text: "I want a snack" }),
      t("breakfast", "BREAKFAST", { type: "say", text: "breakfast" }),
      t("lunch", "LUNCH", { type: "say", text: "lunch" }),
      t("dinner", "DINNER", { type: "say", text: "dinner" }),
      t("homeFood", "HOME", { type: "open", boardId: "home" })
    ]
  },

  places: {
    id: "places",
    title: "Places",
    tiles: [
      t("home", "HOME", { type: "say", text: "home" }),
      t("bathroom2", "BATHROOM", { type: "say", text: "bathroom" }),
      t("hospital", "HOSPITAL", { type: "say", text: "hospital" }),
      t("clinic", "CLINIC", { type: "say", text: "clinic" }),
      t("outside", "OUTSIDE", { type: "say", text: "outside" }),
      t("car", "CAR", { type: "say", text: "car" }),
      t("bed", "BED", { type: "say", text: "bed" }),
      t("kitchen", "KITCHEN", { type: "say", text: "kitchen" }),
      t("homePlaces", "HOME", { type: "open", boardId: "home" })
    ]
  },

  actions: {
    id: "actions",
    title: "Actions",
    tiles: [
      t("sit", "SIT", { type: "say", text: "sit" }),
      t("stand", "STAND", { type: "say", text: "stand" }),
      t("walk", "WALK", { type: "say", text: "walk" }),
      t("sleep", "SLEEP", { type: "say", text: "sleep" }),
      t("listen", "LISTEN", { type: "say", text: "listen" }),
      t("look", "LOOK", { type: "say", text: "look" }),
      t("read", "READ", { type: "say", text: "read" }),
      t("write", "WRITE", { type: "say", text: "write" }),
      t("call", "CALL", { type: "say", text: "call" }),
      t("homeActions", "HOME", { type: "open", boardId: "home" })
    ]
  }
};
