
import { Station, StationId, Puzzle } from './types';

export const UPGRADES = [
  { id: 'rad_mask', name: 'Radiation Mask', desc: 'Ignore first wrong answer in validations.', cost: 400, icon: '🎭' },
  { id: 'pip_boy', name: 'PIP-BOY 3000', desc: 'Increases XP yield by 15%.', cost: 800, icon: '📟' },
  { id: 'fuel_cell', name: 'Atomic Fuel Cell', desc: 'Reduces travel fuel consumption by 50%.', cost: 600, icon: '⚡' },
  { id: 'mre_pack', name: 'Vault MRE Pack', desc: 'Nodes cost 1 fewer ration to explore.', cost: 500, icon: '🍱' }
];

export const PUZZLES: Puzzle[] = [
  { id: 'p1', type: 'anagram', prompt: "UNSCRAMBLE: 'A-G-N-U-A-G-E-L'", solution: "language", reward: { fuel: 20, xp: 50 } },
  { id: 'p2', type: 'pattern', prompt: "SEQUENCE: Sound -> Syllable -> Word -> ?", solution: "sentence", reward: { rations: 5, xp: 50 } },
  { id: 'p3', type: 'match', prompt: "ANALOGY: Newspeak is to Control as Jargon is to ?", solution: "exclusion", reward: { xp: 200, integrity: 10 } }
];

export const STATIONS: Record<StationId, Station> = {
  [StationId.RELATIVITY]: {
    id: StationId.RELATIVITY,
    title: "Sapir-Whorf Shelter",
    coreIdea: "Language isn't a window, it's the frame.",
    readingSource: "Lera Boroditsky, 'How Language Shapes Thought'",
    reading: "In some languages, directions are cardinal (North/South) rather than relative (Left/Right). This forces speakers to maintain constant spatial awareness. Their mind structures space—and therefore navigation and memory—completely differently than relative speakers. Language is a cognitive tool that determines which data points your brain prioritizes.",
    youtubeId: "RKK7wGAYP6k",
    x: 10, y: 30,
    fuelCost: 10, rationCost: 2,
    rewardTool: "Compass of Relativity",
    neighbors: [StationId.ACQUISITION, StationId.CREE, StationId.POLITENESS],
    lessonPlan: "Analyze the influence of linguistic structure on spatial cognition and memory.",
    mcqs: [
      { question: "How do cardinal-direction speakers orient themselves?", options: ["By lucky guess", "Constant mental compass tracking", "Looking at the sun only", "They don't"], answerIndex: 1 },
      { question: "What does this tell us about knowledge?", options: ["Knowledge is universal", "Language mediates the way we perceive reality", "Math is the only truth", "Grammar is irrelevant"], answerIndex: 1 },
      { question: "Linguistic Relativity suggests:", options: ["Language is a mirror", "Language is a tool/framework", "Translation is perfect", "All brains are identical"], answerIndex: 1 }
    ],
    deliverablePrompt: "DIARY ENTRY: Your vault just deleted the word 'Yesterday'. How do you explain history to a child now?"
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "The Living Grammar",
    coreIdea: "The Grammar of Animacy.",
    readingSource: "Robin Wall Kimmerer, 'Braiding Sweetgrass'",
    reading: "In many Indigenous languages like Potawatomi, nouns for natural objects like trees and berries are 'animate'—conjugated like people. In English, they are 'it'. This shift from person to object changes the ethical responsibility of the knower. If a tree is a 'who', you cannot easily treat it as mere commodity.",
    youtubeId: "yB2S_S-kS30",
    x: 30, y: 55,
    fuelCost: 15, rationCost: 3,
    rewardTool: "Animacy Lens",
    neighbors: [StationId.RELATIVITY, StationId.ENDANGERED, StationId.POLITENESS],
    lessonPlan: "Examine how grammar defines the relationship between the knower and the natural world.",
    mcqs: [
      { question: "What does 'Animacy' mean in this context?", options: ["Moving quickly", "Treating objects as living beings/subjects", "Drawing cartoons", "Loud speaking"], answerIndex: 1 },
      { question: "How does English categorize a bay?", options: ["As a 'who'", "As an 'it' (object)", "As a spirit", "As a verb"], answerIndex: 1 },
      { question: "Shifting to animate grammar changes:", options: ["Speed of speech", "Ethical relationship to nature", "Price of wood", "Nothing"], answerIndex: 1 }
    ],
    deliverablePrompt: "ETHICS LOG: Describe your water filter as a 'Who'. Does your care for it change?"
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "The Cognitive Map",
    coreIdea: "Metaphors we live by.",
    readingSource: "George Lakoff & Mark Johnson",
    reading: "We say 'Argument is War'. We attack points, defend positions, and win. If we saw 'Argument is Dance', the goal would be beauty and cooperation, not victory. Metaphor isn't just poetry; it's the primary way we understand abstract concepts like time, love, and logic.",
    youtubeId: "hP0_idXWj60",
    x: 35, y: 15,
    fuelCost: 10, rationCost: 2,
    rewardTool: "Map Overlay",
    neighbors: [StationId.POLITENESS, StationId.JARGON, StationId.AI_MT],
    lessonPlan: "Identify how metaphorical framing shapes reasoning and behavior.",
    mcqs: [
      { question: "Why is 'Time is Money' a metaphor?", options: ["They look alike", "It maps value/scarcity to duration", "Time is paper", "It isn't"], answerIndex: 1 },
      { question: "A 'War' metaphor in medicine can lead to:", options: ["Better health", "Seeing death as 'defeat' or 'failure'", "Cheaper drugs", "More doctors"], answerIndex: 1 },
      { question: "Metaphors help us understand:", options: ["Nothing", "Abstract through concrete", "Concrete through abstract", "Colors"], answerIndex: 1 }
    ],
    deliverablePrompt: "METAPHOR SWAP: Explain 'Knowledge' using a 'Building' metaphor vs a 'Flowing Water' metaphor."
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "The Ministry Archives",
    coreIdea: "Limiting vocabulary limits thought.",
    readingSource: "George Orwell, '1984'",
    reading: "The goal of Newspeak was to make thoughtcrime impossible by removing words like 'freedom' and 'rebellion'. If the concept doesn't have a label, can the mind truly conceive of it? By shrinking the dictionary, the state shrinks the range of human consciousness.",
    youtubeId: "52N6p63pveU",
    x: 80, y: 25,
    fuelCost: 25, rationCost: 4,
    rewardTool: "Censorship Bypass",
    neighbors: [StationId.JARGON, StationId.TRANSLATION, StationId.HUMOR],
    lessonPlan: "Investigate the relationship between vocabulary size and the capacity for critical thinking.",
    mcqs: [
      { question: "What is a 'euphemism'?", options: ["A loud word", "A soft word used to hide a harsh reality", "A new word", "A spell"], answerIndex: 1 },
      { question: "Shrinking language aims to:", options: ["Save paper", "Make thought easier", "Limit the range of consciousness", "Help kids"], answerIndex: 2 },
      { question: "In TOK, Newspeak represents:", options: ["Fun slang", "Language as a tool for power/control", "Good grammar", "Literacy"], answerIndex: 1 }
    ],
    deliverablePrompt: "CENSORSHIP TASK: The Overseer calls a starvation 'Nutrient Efficiency'. What truth is lost?"
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "The Frequency Gap",
    coreIdea: "Lost in Translation.",
    readingSource: "W.V.O. Quine, 'Word and Object'",
    reading: "The 'Indeterminacy of Translation' suggests that we can never be 100% sure we've captured the exact nuance of a word from another culture. We translate 'House' to 'Casa', but the cultural baggage of a home differs. Knowledge is culturally situated and flavor-dependent.",
    youtubeId: "vN-L9_T_yW0",
    x: 85, y: 5,
    fuelCost: 20, rationCost: 3,
    rewardTool: "Nuance Filter",
    neighbors: [StationId.NEWS_PEAK, StationId.ORAL_TRADITION],
    lessonPlan: "Evaluate the limits of translation in preserving meaning across cultures.",
    mcqs: [
      { question: "What is 'Indeterminacy'?", options: ["Perfect clarity", "Inability to perfectly map one word to another", "Fast typing", "A type of radio"], answerIndex: 1 },
      { question: "Is a perfect translation possible?", options: ["Yes, for science", "Rarely, due to connotation and context", "Only for AI", "Always"], answerIndex: 1 },
      { question: "Why does it matter for TOK?", options: ["Grammar tests", "Knowledge changes when the frame changes", "Money", "History"], answerIndex: 1 }
    ],
    deliverablePrompt: "GLOSSARY: The word 'Hope' translates to 'Unlikely Probability'. What is lost?"
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Songline Echo",
    coreIdea: "Knowledge in the song, not the script.",
    readingSource: "Lynne Kelly, 'The Memory Code'",
    reading: "Oral cultures used 'Songlines' and rhythm to store massive amounts of data—biological, historical, and navigational—for thousands of years without a single book. In the wasteland, if the servers fail, only the songs remain. Literacy is an external storage; orality is a living relationship.",
    youtubeId: "fSPlmpxf6H0",
    x: 90, y: 85,
    fuelCost: 30, rationCost: 5,
    rewardTool: "Mnemonic Rhythm",
    neighbors: [StationId.TRANSLATION, StationId.ENDANGERED],
    lessonPlan: "Compare the reliability and social function of oral vs written knowledge storage.",
    mcqs: [
      { question: "How do oral cultures store facts?", options: ["Drawing in sand", "Rhyme, song, and place-association", "They don't", "Tape recorders"], answerIndex: 1 },
      { question: "What is the benefit of a songline?", options: ["Entertainment", "Data integrity over generations", "It's loud", "It's fast"], answerIndex: 1 },
      { question: "Written knowledge is often:", options: ["More social", "Externalized from the knower", "Temporary", "Useless"], answerIndex: 1 }
    ],
    deliverablePrompt: "MNEMONIC: Create a 4-line rhyme to teach someone how to filter water. Why is this safer than a book?"
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "Silent Libraries",
    coreIdea: "Losing a language is losing a database.",
    readingSource: "Wade Davis, 'Wayfinders'",
    reading: "Every language is an old-growth forest of the mind. When a language dies, we lose traditional ecological knowledge (TEK)—the names and uses of thousands of plants that may not exist in any other database. Linguistic diversity is a survival strategy for the human species.",
    youtubeId: "qV3N5K_K7qE",
    x: 70, y: 75,
    fuelCost: 15, rationCost: 3,
    rewardTool: "Archive Key",
    neighbors: [StationId.CREE, StationId.ORAL_TRADITION, StationId.HUMOR],
    lessonPlan: "Assess the consequences of linguistic extinction on shared human knowledge.",
    mcqs: [
      { question: "What is TEK?", options: ["Tech equipment", "Traditional Ecological Knowledge", "Total Energy", "Talk"], answerIndex: 1 },
      { question: "When a language dies, we lose:", options: ["Letters", "A unique way of solving human problems", "Sound", "Dictionaries"], answerIndex: 1 },
      { question: "Linguistic Imperialism is:", options: ["Learning languages", "One language erasing others", "Big words", "Royalty"], answerIndex: 1 }
    ],
    deliverablePrompt: "PRESERVATION: You found a plant diary in a dead language. Why should we save it?"
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "Technical Barriers",
    coreIdea: "Jargon as a gatekeeper.",
    readingSource: "Academic Sociology of Knowledge",
    reading: "Specialized language (jargon) allows experts to communicate precisely, but it also creates 'out-groups'. If you don't speak 'Medical' or 'Legal', you are barred from the knowledge required to defend your life. Jargon is both a tool for efficiency and a wall for exclusion.",
    youtubeId: "8iXat9_oOxs",
    x: 55, y: 15,
    fuelCost: 12, rationCost: 2,
    rewardTool: "Technical Decryptor",
    neighbors: [StationId.ACQUISITION, StationId.METAPHOR, StationId.NEWS_PEAK],
    lessonPlan: "Analyze the ethical implications of specialized language in professional communities.",
    mcqs: [
      { question: "Primary benefit of jargon?", options: ["Confusing others", "Precision among experts", "Cool names", "Money"], answerIndex: 1 },
      { question: "Primary ethical drawback?", options: ["Spelling", "Exclusion from essential knowledge", "It's slow", "None"], answerIndex: 1 },
      { question: "Communities of Knowers use jargon to:", options: ["Hide", "Define boundaries and status", "Play games", "Rest"], answerIndex: 1 }
    ],
    deliverablePrompt: "EXPERT LOG: Explain how a car works to a child without using 'Engine' or 'Piston'."
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "The Etiquette Vault",
    coreIdea: "Language as a social regulator.",
    readingSource: "Brown & Levinson, 'Politeness Theory'",
    reading: "Politeness isn't just 'niceness'; it's 'Face Management'. We use indirect language to save the other person's self-esteem. In a high-stakes vault environment, these linguistic cues prevent social collapse and maintain hierarchy. Knowledge of how to speak is knowledge of how to survive others.",
    youtubeId: "CAnvY-7O-6M",
    x: 25, y: 55,
    fuelCost: 10, rationCost: 2,
    rewardTool: "Etiquette Manual",
    neighbors: [StationId.CREE, StationId.METAPHOR, StationId.RELATIVITY],
    lessonPlan: "Explore how linguistic norms regulate social interactions and power dynamics.",
    mcqs: [
      { question: "What is 'Face' in linguistics?", options: ["Head", "Social self-esteem and standing", "A mask", "Nothing"], answerIndex: 1 },
      { question: "Indirectness helps to:", options: ["Waste time", "Mitigate social friction", "Lie", "Be funny"], answerIndex: 1 },
      { question: "Politeness is:", options: ["Universal", "Culturally specific", "Natural", "Useless"], answerIndex: 1 }
    ],
    deliverablePrompt: "PROTOCOL: The Overseer is angry. Write a 2-sentence request for food that saves his 'Face'."
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "The Silent Nursery",
    coreIdea: "Is language biological or social?",
    readingSource: "Noam Chomsky vs B.F. Skinner",
    reading: "Are we born with a 'Universal Grammar' chip, or is language just a habit we learn from the vault? The 'Critical Period' suggests if we don't hear words by age 7, we may never fully learn. Is language a part of our biology or a product of our environment?",
    youtubeId: "7Cgpfw4z8cw",
    x: 5, y: 15,
    fuelCost: 8, rationCost: 1,
    rewardTool: "Universal Key",
    neighbors: [StationId.RELATIVITY, StationId.JARGON],
    lessonPlan: "Debate the 'Nature vs Nurture' arguments in language development.",
    mcqs: [
      { question: "Chomsky's 'LAD' stands for:", options: ["Late Adult Development", "Language Acquisition Device", "Logic and Data", "Little Apple Door"], answerIndex: 1 },
      { question: "The Critical Period implies:", options: ["Learning is easy", "There is a window for brain development", "Old people are smarter", "No learning"], answerIndex: 1 },
      { question: "Is language hardware or software?", options: ["Hardware only", "Software only", "Likely hardware with social software", "Neither"], answerIndex: 2 }
    ],
    deliverablePrompt: "NURSERY PLAN: If a child grows up hearing only robot beeps, will they talk? Why?"
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "The Broken Algorithm",
    coreIdea: "Machine bias in translation.",
    readingSource: "Ethical AI Research",
    reading: "AI translation isn't neutral. It learns from human data. If the dataset is biased (e.g., 'Doctor' usually maps to 'He'), the AI reinforces that bias as 'fact'. When we rely on machines to mediate our knowledge, we inherit their hidden distortions.",
    youtubeId: "fMlzZpM0Hsg",
    x: 15, y: 88,
    fuelCost: 20, rationCost: 2,
    rewardTool: "Diagnostic Patch",
    neighbors: [StationId.METAPHOR, StationId.HUMOR],
    lessonPlan: "Investigate the ethical responsibility of designers in algorithmic knowledge mediation.",
    mcqs: [
      { question: "Where does AI bias come from?", options: ["Evil robots", "Human datasets", "Math", "Electricity"], answerIndex: 1 },
      { question: "Semantic Flattening is:", options: ["Writing on paper", "Losing nuance in favor of common words", "Typing fast", "Silence"], answerIndex: 1 },
      { question: "AI 'truth' is actually:", options: ["Objective", "A mathematical probability based on past data", "Magic", "Perfect"], answerIndex: 1 }
    ],
    deliverablePrompt: "PATCH LOG: You find an AI that hates the word 'Friend'. How does it describe a survivor?"
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Glitch Node",
    coreIdea: "Irony as a boundary marker.",
    readingSource: "Henri Bergson, 'Laughter'",
    reading: "Humor is a tool for social cohesion. To 'get' a joke, you must share the same cultural context and knowledge. Irony requires knowing both the literal meaning and the intended opposite. It is the ultimate test of a 'Community of Knowers'.",
    youtubeId: "K_GIsbMv1K0",
    x: 65, y: 45,
    fuelCost: 12, rationCost: 2,
    rewardTool: "Irony Detector",
    neighbors: [StationId.AI_MT, StationId.ENDANGERED, StationId.NEWS_PEAK],
    lessonPlan: "Analyze how humor defines the boundaries of specific knowledge communities.",
    mcqs: [
      { question: "What is Incongruity Theory?", options: ["Same thing", "Gap between expectation and reality", "Loudness", "Math"], answerIndex: 1 },
      { question: "Why is irony hard for AI?", options: ["Too fast", "Requires multi-layered context/intent", "No mouth", "No ears"], answerIndex: 1 },
      { question: "Humor acts as a:", options: ["Wall", "Boundary marker for 'in-groups'", "Lie", "Distraction"], answerIndex: 1 }
    ],
    deliverablePrompt: "COMEDY SET: Write a joke only a vault survivor would find funny. Why?"
  }
};
