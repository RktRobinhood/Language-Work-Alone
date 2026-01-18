import { Station, StationId, Puzzle } from './types';

export const STATIONS: Record<StationId, Station> = {
  [StationId.RELATIVITY]: {
    id: StationId.RELATIVITY,
    title: "Shelter Navigation",
    coreIdea: "Your brain's GPS depends on your words.",
    youtubeId: "RKK7wGAYP6k",
    x: 10, y: 30,
    rewardTool: "Compass of Relativity",
    neighbors: [StationId.ACQUISITION, StationId.CREE, StationId.POLITENESS],
    lessonPlan: "Explore linguistic relativity and how spatial directions (cardinal vs relative) change cognitive performance.",
    reading: `BROADCAST LOG 702: In some vaults, they don't say 'Left' or 'Right'. They only use cardinal directions like 'North' or 'East'. This changes how they see the world. 

    If your language doesn't have a word for a color, you actually find it harder to distinguish that color from others. This is the heart of TOK Language study: Does language describe reality, or does it construct it?`,
    mcqs: [
      { question: "How do cardinal direction speakers stay oriented in the dark?", options: ["Luck", "Mental magnetic tracking", "They count steps", "Flashlights"], answerIndex: 1 },
      { question: "What does the 'Bridge' study tell us about gendered nouns?", options: ["Nothing", "Language assigns human traits to objects", "German is harder", "Bridges are dangerous"], answerIndex: 1 },
      { question: "In TOK, Linguistic Relativity suggests language is:", options: ["A tool", "A mirror", "A framework", "Irrelevant"], answerIndex: 2 }
    ],
    deliverablePrompt: "DIARY ENTRY: Your vault just deleted the word 'Fear'. How would you explain a danger to a child without that word? Does the child still feel afraid?"
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "The Breathing World",
    coreIdea: "Is the wasteland an 'It' or a 'Who'?",
    youtubeId: "yB2S_S-kS30",
    x: 35, y: 55,
    rewardTool: "Animacy Lens",
    benefitFromTool: "Compass of Relativity",
    neighbors: [StationId.RELATIVITY, StationId.ENDANGERED, StationId.POLITENESS],
    lessonPlan: "Analyze the 'Grammar of Animacy' and how treating nature as a person vs an object changes ethics.",
    reading: `NATURE LOG: Many Indigenous languages use 'Who' for mountains and trees, not 'It'. If you call a tree 'It', you can chop it down. If you call it 'Grandmother', your relationship changes.

    TOK Question: How does our grammar change our ethical responsibility to the environment? Is knowledge objective if it's tied to respect?`,
    mcqs: [
      { question: "How does English categorize most natural objects?", options: ["People", "Inanimate things", "Spirits", "Action words"], answerIndex: 1 },
      { question: "Animacy suggests that language can:", options: ["Make us rich", "Determine moral relationships", "Fix climate", "Only describe humans"], answerIndex: 1 },
      { question: "Which TOK concept does this align with?", options: ["Math", "Linguistic Relativity and Ethics", "Objectivity", "Memory"], answerIndex: 1 }
    ],
    deliverablePrompt: "RESTORATION PLAN: Describe your water filter as if it were a living person. Does this make you more likely to protect it?"
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "Technical Walls",
    coreIdea: "Words as gatekeepers between shelters.",
    youtubeId: "8iXat9_oOxs",
    x: 55, y: 15,
    rewardTool: "Technical Decryptor",
    neighbors: [StationId.ACQUISITION, StationId.METAPHOR, StationId.NEWS_PEAK],
    lessonPlan: "Identify how specialized language creates exclusivity and power dynamics in communities of knowers.",
    reading: `OVERSEER MEMO: The Engineers are using words like 'Asymptotic' to keep Scavengers from understanding the filters. 

    Jargon allows experts to talk fast, but it creates an Out Group. This is an ethical problem in the distribution of knowledge.`,
    mcqs: [
      { question: "What is the primary ethical problem with jargon?", options: ["Spelling", "Exclusion from knowledge", "Cost", "Science"], answerIndex: 1 },
      { question: "When is jargon actually good?", options: ["When it's confusing", "Precision for experts", "Poetry", "Never"], answerIndex: 1 },
      { question: "Which TOK Knower category uses Jargon most?", options: ["Beginners", "Communities of Knowers", "Individual Knowers", "Presidents"], answerIndex: 1 }
    ],
    deliverablePrompt: "EXPERT LOG: Explain a complex hobby (like gaming or coding) to a survivor without using any specialized words. Why is it so difficult?"
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Ministry of Truth",
    coreIdea: "Control the dictionary, control the mind.",
    youtubeId: "52N6p63pveU",
    x: 80, y: 25,
    rewardTool: "Censorship Bypass",
    benefitFromTool: "Technical Decryptor",
    neighbors: [StationId.JARGON, StationId.TRANSLATION, StationId.HUMOR],
    lessonPlan: "Examine Orwellian Newspeak and euphemisms. How does limiting vocabulary limit human thought?",
    reading: `ARCHIVE 1984: If you don't have the word 'Freedom', can you even imagine being free? Euphemisms are soft words for hard truths.

    Example: We don't say 'Rations cut'. We say 'Nutrient Efficiency Re-alignment'. If we control the words, we control the reality.`,
    mcqs: [
      { question: "What is the goal of Newspeak?", options: ["Poetry", "Making thought impossible", "Teaching", "Selling books"], answerIndex: 1 },
      { question: "What is 'Collateral Damage' a euphemism for?", options: ["Gifts", "Accidental deaths", "Houses", "Cars"], answerIndex: 1 },
      { question: "How does this affect Shared Knowledge?", options: ["Clearer", "Manipulates moral compass", "No effect", "Facts"], answerIndex: 1 }
    ],
    deliverablePrompt: "CENSORSHIP TASK: The Overseer wants to rename 'Exile' to something positive. Propose a name and explain how it hides the terrifying reality."
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "Born to Talk",
    coreIdea: "Is language a chip or a skill?",
    youtubeId: "7Cgpfw4z8cw",
    x: 5, y: 15,
    rewardTool: "Universal Key",
    neighbors: [StationId.RELATIVITY, StationId.JARGON],
    lessonPlan: "Discuss Universal Grammar vs Empiricism. Is the ability to speak innate or learned from the vault environment?",
    reading: `MEDICAL LOG: Children learn to talk without being taught. Chomsky argues we have a 'Language Acquisition Device'—a mental circuit board.

    If a child is never spoken to, they never learn. Is language biological or social? This defining mystery affects how we understand the 'Human Knower'.`,
    mcqs: [
      { question: "What is Chomsky's Universal Grammar?", options: ["A book", "Hard-wired learning ability", "English only", "A program"], answerIndex: 1 },
      { question: "What is the Critical Period?", options: ["Lunch", "Childhood learning window", "Old age", "War"], answerIndex: 1 },
      { question: "Language Acquisition is a mystery of:", options: ["Math", "The nature of the knower", "History", "Physics"], answerIndex: 1 }
    ],
    deliverablePrompt: "NURSERY PLAN: If a child grows up hearing only robot beeps, will they develop language? Defend your answer using TOK concepts."
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "Lost in Frequency",
    coreIdea: "Perfect translation is a myth.",
    youtubeId: "vN-L9_T_yW0",
    x: 85, y: 5,
    rewardTool: "Nuance Filter",
    benefitFromTool: "Censorship Bypass",
    neighbors: [StationId.NEWS_PEAK, StationId.ORAL_TRADITION],
    lessonPlan: "Analyze the gap between denotation and connotation. Why are some words 'untranslatable'?",
    reading: `COMMUNICATIONS: Words have connotations (feelings) not just denotations (definitions). 

    An AI can translate 'House', but misses the feeling of 'Sanctuary'. Knowledge is tied to the flavor of the word. Is a thought the same if you change the language?`,
    mcqs: [
      { question: "What is 'Denotation'?", options: ["Feelings", "Literal definition", "A bomb", "Whispering"], answerIndex: 1 },
      { question: "Can there be a perfect translation?", options: ["Yes", "No, culture differs", "AI only", "Poetry"], answerIndex: 1 },
      { question: "Indeterminacy of Translation suggests:", options: ["Easy", "Multiple correct ways", "Illegal", "Fixed facts"], answerIndex: 1 }
    ],
    deliverablePrompt: "GLOSSARY: The word 'Hope' translates to 'Unlikely Probability' in Technical. What human knowledge is lost in this shift?"
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Last Singers",
    coreIdea: "Knowledge in song, not servers.",
    youtubeId: "fSPlmpxf6H0",
    x: 90, y: 85,
    rewardTool: "Mnemonic Rhythm",
    benefitFromTool: "Nuance Filter",
    neighbors: [StationId.TRANSLATION, StationId.ENDANGERED],
    lessonPlan: "Compare oral traditions to written history. How does melody and social performance protect knowledge from corruption?",
    reading: `DATA CORRUPTION: The servers are dead. All we have left are songs. 

    Oral tradition uses rhythm and community to store data perfectly for thousands of years. Literacy lets us store facts externally, but we lose the 'Living Relationship'.`,
    mcqs: [
      { question: "How do oral cultures prevent data loss?", options: ["Sand writing", "Rhyme and song", "They don't", "Stone"], answerIndex: 1 },
      { question: "What is 'Externalization' of knowledge?", options: ["Screaming", "Books/Computers", "Talking", "Thinking"], answerIndex: 1 },
      { question: "Benefit of Orality:", options: ["Faster", "Social context and identity", "Objective", "Cheaper"], answerIndex: 1 }
    ],
    deliverablePrompt: "MNEMONIC: Create a 4-line rhyming poem to teach a dweller how to survive a radiation storm. Why is rhyme safer than a manual?"
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "Silent Echoes",
    coreIdea: "A dying language is a burning library.",
    youtubeId: "qV3N5K_K7qE",
    x: 70, y: 75,
    rewardTool: "Archive Key",
    benefitFromTool: "Animacy Lens",
    neighbors: [StationId.CREE, StationId.ORAL_TRADITION, StationId.HUMOR],
    lessonPlan: "Examine how traditional ecological knowledge is lost when languages vanish. Discuss linguistic imperialism.",
    reading: `ARCHIVE 404: 50% of languages are gone. With them, medicinal knowledge of wasteland plants is lost. 

    Some languages have 20 words for 'Sand'. These are data points for survival. To lose the language is to lose the knowledge.`,
    mcqs: [
      { question: "Why is linguistic diversity important?", options: ["Sounds nice", "Encodes different solutions", "Law", "Isn't"], answerIndex: 1 },
      { question: "What is Linguistic Imperialism?", options: ["Learning", "One language erasing others", "Loudness", "Big words"], answerIndex: 1 },
      { question: "In TOK, language loss is a loss of:", options: ["Letters", "Shared Human Knowledge", "Money", "Paper"], answerIndex: 1 }
    ],
    deliverablePrompt: "PRESERVATION: You found a diary in a language only 1 person speaks. Why should we spend energy saving it instead of teaching them ours?"
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "Vault Etiquette",
    coreIdea: "Hierarchy in greetings.",
    youtubeId: "CAnvY-7O-6M",
    x: 25, y: 55,
    rewardTool: "Etiquette Manual",
    benefitFromTool: "Animacy Lens",
    neighbors: [StationId.CREE, StationId.METAPHOR, StationId.RELATIVITY],
    lessonPlan: "Explore Face Theory and honorifics. How does language maintain or challenge social power in the vault?",
    reading: `SOCIAL LOG: Some languages use different words based on age. Politeness help us navigate conflict. 

    Language isn't just for facts; it's for managing relationships. If we stop being polite, does our community fall apart?`,
    mcqs: [
      { question: "What does 'Face' mean in linguistics?", options: ["Head", "Public image/esteem", "Mask", "Nothing"], answerIndex: 1 },
      { question: "How does Indirectness function?", options: ["Waste", "Saves face for requests", "Lying", "Poets"], answerIndex: 1 },
      { question: "Is politeness 'Objective'?", options: ["Yes", "Culturally situated", "Maybe", "Vault only"], answerIndex: 1 }
    ],
    deliverablePrompt: "PROTOCOL: Design a 'Neutral' greeting for all dwellers. How does this change how the Overseer communicates orders?"
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "Cognitive Maps",
    coreIdea: "Metaphors are how we process reality.",
    youtubeId: "hP0_idXWj60",
    x: 35, y: 10,
    rewardTool: "Map Overlay",
    benefitFromTool: "Etiquette Manual",
    neighbors: [StationId.POLITENESS, StationId.JARGON, StationId.AI_MT],
    lessonPlan: "Analyze how metaphors frame abstract concepts like time, illness, and knowledge. Identify hidden biases.",
    reading: `LOG 101: We say 'Time is money'. In the vault, we say 'Time is oxygen'. If you waste time, you choke the community. 

    Metaphors are 'Mental Models'. They explain abstract things through concrete ones. But metaphors also hide things. If time is oxygen, can you 'save' it?`,
    mcqs: [
      { question: "Why use metaphors in science?", options: ["Beauty", "Explain complex through familiar", "Hide truth", "Math lack"], answerIndex: 1 },
      { question: "Danger of 'War' metaphor in medicine?", options: ["Loud", "Frames death as defeat", "Saves lives", "None"], answerIndex: 1 },
      { question: "Metaphors are a WOK through:", options: ["Senses", "Reason and Language", "Faith", "Memory"], answerIndex: 1 }
    ],
    deliverablePrompt: "METAPHOR SWAP: Describe 'Learning' using a 'War' metaphor, then a 'Gardening' metaphor. How does the feeling of knowledge change?"
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "The Broken Chip",
    coreIdea: "Machine bias is human bias.",
    youtubeId: "fMlzZpM0Hsg",
    x: 15, y: 88,
    rewardTool: "Diagnostic Patch",
    benefitFromTool: "Map Overlay",
    neighbors: [StationId.METAPHOR, StationId.HUMOR],
    lessonPlan: "Investigate algorithmic bias in translation. Who is responsible for 'Machine Truth'?",
    reading: `TECHNICAL REPORT: The translator says 'Doctor' is always 'He'. AI calculates probability from old world data.

    If the old world was biased, the AI will be too. This is the Ethics of AI. Who is responsible for the machine's version of truth?`,
    mcqs: [
      { question: "Where does AI bias come from?", options: ["Evil robots", "Human training data", "Magic", "Electricity"], answerIndex: 1 },
      { question: "What is 'Semantic Flattening'?", options: ["Paper", "AI choosing the common word and losing nuance", "Typing", "Vowels"], answerIndex: 1 },
      { question: "In TOK, AI translation is:", options: ["Authority", "Neutral", "Mediated interpretation", "Pure fact"], answerIndex: 2 }
    ],
    deliverablePrompt: "PATCH LOG: You find an AI that only speaks in 'Corporate Marketing'. How would it describe a starving survivor? Why is this a dangerous distortion?"
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Glitch",
    coreIdea: "Humor requires shared context.",
    youtubeId: "K_GIsbMv1K0",
    x: 65, y: 45,
    rewardTool: "Irony Detector",
    benefitFromTool: "Diagnostic Patch",
    neighbors: [StationId.AI_MT, StationId.ENDANGERED, StationId.NEWS_PEAK],
    lessonPlan: "Analyze the mechanics of irony. Why is humor a boundary marker for communities of knowers?",
    reading: `RECREATION LOG: Why is a joke hard to translate? It relies on 'Incongruity' (surprises). 

    If a machine doesn't understand Irony, it can't understand human truth. Humor marks the boundary of a 'Community of Knowers'. To get the joke, you have to be 'us'.`,
    mcqs: [
      { question: "What is Incongruity Theory?", options: ["Same", "Gap between expectation and reality", "Math", "Bad"], answerIndex: 1 },
      { question: "Why is irony hard for AI?", options: ["Power", "Requires understanding opposite meaning", "Fast", "No mouth"], answerIndex: 1 },
      { question: "In TOK, humor is a way to:", options: ["Hide facts", "Test shared cultural boundaries", "Forget", "Win"], answerIndex: 1 }
    ],
    deliverablePrompt: "COMEDY SET: Write a short 'Vault Joke' only dwellers would get. Why would a surface survivor find it confusing?"
  }
};

export const UPGRADES = [
  { id: 'rad_mask', name: 'Radiation Mask', cost: 400, desc: 'Eliminates one incorrect answer in Knowledge Checks.', icon: '😷' },
  { id: 'pip_boy', name: 'Pip-Boy Update', cost: 800, desc: 'Increases XP yield by 15% per node.', icon: '📟' },
  { id: 'stim_pack', name: 'Stimpak', cost: 200, desc: 'Restores 15 integrity points.', icon: '💉' }
];

export const PUZZLES: Puzzle[] = [
  { id: 'p1', type: 'anagram', prompt: "UNSCRAMBLE THE KEY: 'A-G-N-U-A-G-E-L'", solution: "language", reward: "100 XP" },
  { id: 'p2', type: 'pattern', prompt: "SEQUENCE: Sound -> Syllable -> Word -> ?", solution: "sentence", reward: "100 XP" },
  { id: 'p3', type: 'match', prompt: "ANALOGY: Newspeak is to Control as Jargon is to ?", solution: "exclusion", reward: "100 XP" },
  { id: 'p4', type: 'anagram', prompt: "UNSCRAMBLE: 'K-N-O-W-L-E-D-G-E'", solution: "knowledge", reward: "100 XP" }
];