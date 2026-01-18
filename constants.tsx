
import { Station, StationId, Puzzle } from './types';

export const STATIONS: Record<StationId, Station> = {
  [StationId.RELATIVITY]: {
    id: StationId.RELATIVITY,
    title: "Shelter Navigation",
    coreIdea: "Your brain's GPS depends on your words.",
    youtubeId: "RKK7wGAYP6k",
    x: 15, y: 35,
    rewardTool: "Cardinal Compass",
    lessonPlan: "Explore how spatial language affects memory. Students will compare cardinal direction speakers to 'left/right' speakers.",
    reading: `BROADCAST LOG 702: Survivors in Vault 44 don't use 'left' or 'right'. They use cardinal directions (North, South, East, West) even inside the tunnels. Because of this, their spatial memory is 40% better than ours. This is Linguistic Relativity. 

    If your language doesn't have a word for a color, you actually find it harder to distinguish that color from others. 
    Think about it: If your vault had no words for 'Yesterday' or 'Tomorrow', how would you plan your food rations? You would live in a permanent present.`,
    mcqs: [
      { question: "How do cardinal-direction speakers find their way in the dark?", options: ["Luck", "They track the Earth's magnetic field mentally", "They count steps", "They use flashlights"], answerIndex: 1 },
      { question: "Language forces us to assign human traits to objects when:", options: ["We are lonely", "Our grammar uses gendered nouns", "We name them", "We are dreaming"], answerIndex: 1 },
      { question: "In TOK, Linguistic Relativity suggests language is:", options: ["A simple tool", "A mirror of reality", "A framework that shapes thought", "Irrelevant to truth"], answerIndex: 2 }
    ],
    deliverablePrompt: "DIARY ENTRY: Your vault just deleted the word 'FEAR'. Describe how you would explain a monster to a child using only other words. Does the child feel less afraid?"
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "Technical Walls",
    coreIdea: "Words as walls between shelters.",
    youtubeId: "8iXat9_oOxs",
    x: 55, y: 15,
    rewardTool: "Technical Decryptor",
    benefitFromTool: "Censorship Bypass",
    lessonPlan: "Analyze how specialized language (Jargon) creates in-groups and out-groups. Discuss the ethics of accessibility.",
    reading: `OVERSEER MEMO: The Engineers in Sector 7 are using words like 'asymptotic' and 'redundancy' to keep Scavengers from understanding how the oxygen filters work. 

    Jargon is a double-edged sword. It allows experts to talk fast and precisely, but it creates an In-Group and an Out-Group. 
    Example: Doctors use Latin so patients don't panic, but also so patients don't question the diagnosis. This raises an ethical question: When does precision become gatekeeping?`,
    mcqs: [
      { question: "What is the primary ethical problem with jargon?", options: ["It's hard to spell", "It excludes people from important knowledge", "It costs money", "It's too scientific"], answerIndex: 1 },
      { question: "When is jargon actually helpful?", options: ["When it's confusing", "When experts need to be 100% precise and fast", "When writing a poem", "Never"], answerIndex: 1 },
      { question: "Which TOK category is built on Jargon?", options: ["Beginners", "Communities of Knowers", "Individual Knowers", "Presidents"], answerIndex: 1 }
    ],
    deliverablePrompt: "RECOVERY LOG: Take a hobby you love (gaming, sports, art). List 3 jargon words. Now, explain that hobby to a survivor without using those words. Why is it harder?"
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Ministry of Truth",
    coreIdea: "Control the dictionary, control the mind.",
    youtubeId: "52N6p63pveU",
    x: 85, y: 25,
    rewardTool: "Censorship Bypass",
    lessonPlan: "Study euphemisms and Orwellian Newspeak. Discover how limiting vocabulary can limit the range of human thought.",
    reading: `ARCHIVE 1984: The most dangerous weapon isn't a nuke; it's the deletion of words. If you don't have the word 'Freedom', can you even imagine being free?

    Euphemisms are 'soft' words used to hide 'hard' truths. 
    Shelter Speak: We don't say 'The oxygen is low'. We say 'Atmospheric Optimization is in progress'. 
    We don't say 'Rations are cut'. We say 'Nutrient Efficiency Re-alignment'. If we control the words, we control the reaction.`,
    mcqs: [
      { question: "What is the goal of Newspeak?", options: ["Poetry", "Making thought impossible by removing words", "Teaching kids", "Selling books"], answerIndex: 1 },
      { question: "What is 'Collateral Damage' a euphemism for?", options: ["Free gifts", "Accidental deaths", "Building houses", "Fixing cars"], answerIndex: 1 },
      { question: "How does this affect Shared Knowledge?", options: ["It makes it clearer", "It manipulates the collective moral compass", "It has no effect", "It increases facts"], answerIndex: 1 }
    ],
    deliverablePrompt: "CENSORSHIP TASK: The Overseer wants to rename 'Exclusion from the Vault' to something that sounds positive. Propose a name and explain how it hides the terrifying reality."
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "The Breathing World",
    coreIdea: "Is the wasteland an 'It' or a 'Who'?",
    youtubeId: "yB2S_S-kS30",
    x: 45, y: 85,
    rewardTool: "Spirit Lens",
    benefitFromTool: "Cardinal Compass",
    lessonPlan: "Compare the English grammar of inanimate objects with Indigenous grammars of animacy. Discuss the ethical impact on environmental stewardship.",
    reading: `NATURE LOG: In the old world, people called a mountain 'It'. In many Indigenous languages, the word for mountain is more like a verb—'to be a mountain'. 

    This is the Grammar of Animacy. If you call a tree 'It', you can chop it down easily. If you call a tree 'That Grandmother', you treat it with respect.
    TOK Question: How does our grammar change our ethical responsibility to the world around us? If everything is alive, can we still own it?`,
    mcqs: [
      { question: "How does English categorize most natural objects?", options: ["People", "Inanimate things ('It')", "Spirits", "Action words"], answerIndex: 1 },
      { question: "Animacy suggests that language can:", options: ["Make us richer", "Determine our moral relationship with nature", "Fix global warming", "Only describe humans"], answerIndex: 1 },
      { question: "Which TOK concept does this most align with?", options: ["Objective Truth", "Linguistic Relativity & Ethics", "Math", "Memory"], answerIndex: 1 }
    ],
    deliverablePrompt: "RESTORATION PLAN: Write a 3-sentence description of your water filter, but treat it as a living person. Does this change how you feel about keeping it clean?"
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Last Singers",
    coreIdea: "Knowledge stored in song, not servers.",
    youtubeId: "fSPlmpxf6H0",
    x: 92, y: 88,
    rewardTool: "Mnemonic Charm",
    lessonPlan: "Examine how oral traditions store complex data through rhythm and performance. Compare this to the external storage of literacy.",
    reading: `VAULT DATA CORRUPTION: The servers are dead. Our books are dust. All we have left are the songs of the elders. 

    Oral tradition isn't just a game of telephone. It uses rhythm, melody, and community repetition to store knowledge perfectly for thousands of years. 
    While writing lets us store huge amounts of facts externally, we often lose the living relationship with the knowledge. Can you know something if it's only in a book?`,
    mcqs: [
      { question: "How do oral cultures prevent data loss?", options: ["Writing in sand", "Rhyme, song, and community repetition", "They don't", "Using stone tablets"], answerIndex: 1 },
      { question: "What is 'Externalization' of knowledge?", options: ["Screaming", "Storing knowledge in books instead of minds", "Talking to strangers", "Thinking outside"], answerIndex: 1 },
      { question: "Benefit of Orality:", options: ["It's faster", "Knowledge is tied to identity and social context", "It's always objective", "It's cheaper"], answerIndex: 1 }
    ],
    deliverablePrompt: "MNEMONIC TASK: Create a 4-line rhyming poem to teach a new dweller how to survive a radiation storm. Why is a rhyme better than a manual in a crisis?"
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "The Broken Chip",
    coreIdea: "The machine's bias is our bias.",
    youtubeId: "fMlzZpM0Hsg",
    x: 12, y: 88,
    benefitFromTool: "Technical Decryptor",
    lessonPlan: "Investigate algorithmic bias in translation. Discuss how AI reflects human prejudices and the ethics of 'automated truth'.",
    reading: `TECHNICAL REPORT: The Vault's auto-translator is malfunctioning. It translates 'Doctor' as 'He' and 'Nurse' as 'She' every single time. 

    AI doesn't think; it calculates probability based on the old world's data. If the old world was biased, the AI will be too. 
    This is the Ethics of AI. Who is responsible for the machine's version of truth? If the AI says it, do we believe it more?`,
    mcqs: [
      { question: "Where does AI bias come from?", options: ["Evil robots", "Human data used for training", "Magic", "Bad electricity"], answerIndex: 1 },
      { question: "What is 'Semantic Flattening'?", options: ["Making paper", "AI choosing the most common word and losing nuance", "Fast typing", "Deleting vowels"], answerIndex: 1 },
      { question: "In TOK, AI translation is a:", options: ["Final authority", "Neutral tool", "Mediated interpretation of human data", "Pure fact"], answerIndex: 2 }
    ],
    deliverablePrompt: "PATCH LOG: You find an AI that only speaks in Marketing words. How would it describe a starving survivor? Why is this a dangerous distortion of knowledge?"
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "Lost in Frequency",
    coreIdea: "Perfect translation is a myth.",
    youtubeId: "vN-L9_T_yW0",
    x: 75, y: 10,
    benefitFromTool: "Technical Decryptor",
    lessonPlan: "Analyze the gap between denotation and connotation. Explore why some concepts are untranslatable across cultures.",
    reading: `COMMUNICATIONS: 'Lost in translation' happens because words have connotations (feelings) not just denotations (dictionary definitions). 

    An AI can translate 'House' to 'Casa', but it might miss the feeling of 'Sanctuary' vs 'Structure'. Knowledge is tied to the specific flavor of the word. Is a thought the same if you change the language?`,
    mcqs: [
      { question: "What is 'Denotation'?", options: ["The emotional feeling of a word", "The literal dictionary definition", "A type of bomb", "Speaking quietly"], answerIndex: 1 },
      { question: "Can there be a perfect translation?", options: ["Yes, for math", "No, because cultural contexts are never identical", "Only with better AI", "Only for poems"], answerIndex: 1 },
      { question: "Indeterminacy of Translation suggests:", options: ["Translation is easy", "There are multiple 'correct' but different ways to translate any sentence", "Translation is illegal", "Facts are fixed"], answerIndex: 1 }
    ],
    deliverablePrompt: "GLOSSARY: The word 'HOPE' translates to 'UNLIKELY PROBABILITY' in the Vault Technical Manual. What human knowledge is lost in this technical translation?"
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "Born to Talk",
    coreIdea: "Is language a hard-wired chip or a learned skill?",
    youtubeId: "7Cgpfw4z8cw",
    x: 5, y: 15,
    lessonPlan: "Explore Chomsky's Universal Grammar vs Empiricist theories. Discuss the critical period for language development.",
    reading: `MEDICAL LOG: Children in the nursery learn to speak without being taught. Chomsky argues for a Language Acquisition Device—a mental circuit board for grammar. 

    But if a child is never spoken to, they never learn. Is language biological (Nature) or social (Nurture)? This mystery defines what it means to be a human knower.`,
    mcqs: [
      { question: "What is Chomsky's 'Universal Grammar'?", options: ["A grammar book for everyone", "The idea that the ability to learn grammar is hard-wired", "Speaking English only", "A computer program"], answerIndex: 1 },
      { question: "What is the 'Critical Period'?", options: ["Lunch time", "A window in childhood where language learning is easy", "Old age", "War time"], answerIndex: 1 },
      { question: "Linguistic Acquisition is a mystery of:", options: ["Math", "The nature of the human knower", "History", "Physics"], answerIndex: 1 }
    ],
    deliverablePrompt: "NURSERY EXPERIMENT: If a child grows up hearing only robot beeps, will they develop human language? Defend your answer using what you learned."
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "Cognitive Maps",
    coreIdea: "Metaphors are how we process the world.",
    youtubeId: "hP0_idXWj60",
    x: 35, y: 10,
    lessonPlan: "Analyze how metaphors frame our understanding of abstract concepts like time, illness, and knowledge itself.",
    reading: `LOG 101: We say 'Time is money' so we spend it. In the vault, we say 'Time is oxygen'. If you waste time, you are choking the community. Metaphors structure our reality.

    In TOK, metaphors are Mental Models. They allow us to understand abstract concepts in terms of concrete ones. But metaphors also hide things. If time is oxygen, does that mean we can't 'save' it?`,
    mcqs: [
      { question: "Why do we use metaphors in science?", options: ["To make it pretty", "To explain complex things using familiar concepts", "To hide the truth", "Because we lack math"], answerIndex: 1 },
      { question: "What is the danger of a 'War' metaphor in medicine?", options: ["It's too loud", "It frames patients as battlefields and death as defeat", "It saves lives", "No danger"], answerIndex: 1 },
      { question: "Metaphors are a Way of Knowing primarily through:", options: ["Sense Perception", "Reason & Language", "Faith", "Memory"], answerIndex: 1 }
    ],
    deliverablePrompt: "METAPHOR SWAP: Describe 'Learning' using a 'War' metaphor, then a 'Gardening' metaphor. How does the feeling of 'Knowledge' change?"
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "Silent Echoes",
    coreIdea: "When a language dies, a library burns.",
    youtubeId: "qV3N5K_K7qE",
    x: 70, y: 75,
    lessonPlan: "Examine the loss of traditional ecological knowledge when indigenous languages vanish. Discuss linguistic imperialism.",
    reading: `ARCHIVE 404: 50% of old world languages are gone. With them, unique medicinal knowledge of wasteland plants is lost. 

    Some languages have 20 words for 'Ice' or 'Sand'. These aren't just synonyms; they are technical data points for survival. To lose the language is to lose the data. Does the vault have a duty to save them?`,
    mcqs: [
      { question: "Why is linguistic diversity important?", options: ["It sounds nice", "Different languages encode different ways of solving problems", "It's required by law", "It isn't"], answerIndex: 1 },
      { question: "What is 'Linguistic Imperialism'?", options: ["Learning a new language", "One language replacing all others and erasing their knowledge", "Speaking loudly", "Using big words"], answerIndex: 1 },
      { question: "In TOK, language loss is a loss of:", options: ["Letters", "Shared Human Knowledge", "Money", "Paper"], answerIndex: 1 }
    ],
    deliverablePrompt: "PRESERVATION: You found a diary in a language only 1 person speaks. Why should we spend energy saving it instead of just teaching them our language?"
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "Vault Etiquette",
    coreIdea: "Hierarchy is encoded in how we speak.",
    youtubeId: "CAnvY-7O-6M",
    x: 25, y: 55,
    benefitFromTool: "Mnemonic Charm",
    lessonPlan: "Explore Face Theory and politeness strategies. Discuss how language maintains or challenges social hierarchies.",
    reading: `SOCIAL LOG: In some languages, you speak differently based on age and rank. In the Vault, we have lost these 'Honorifics'. 

    Politeness strategies help us navigate social conflict. Language isn't just for facts; it's for managing relationships and power. If we stop being polite, does our community fall apart?`,
    mcqs: [
      { question: "What does 'Face' mean in linguistics?", options: ["Your physical head", "The public image we try to protect in conversation", "A mask", "Nothing"], answerIndex: 1 },
      { question: "How does 'Indirectness' function?", options: ["It's a waste of time", "It allows people to save 'Face' while making requests", "It's always lying", "It's for poets"], answerIndex: 1 },
      { question: "Is politeness 'Objective Knowledge'?", options: ["Yes", "No, it's culturally situated", "Maybe", "Only in the vault"], answerIndex: 1 }
    ],
    deliverablePrompt: "PROTOCOL: Design a 'Neutral' greeting for all vault dwellers. How would this change how the Overseer communicates orders?"
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Glitch",
    coreIdea: "Humor requires shared knowledge.",
    youtubeId: "K_GIsbMv1K0",
    x: 65, y: 45,
    lessonPlan: "Analyze the mechanics of irony and humor. Explore why jokes are cultural boundary markers and difficult for AI to grasp.",
    reading: `RECREATION LOG: Why is a joke hard to translate? Humor relies on 'Incongruity' (surprises) and Shared Context. 

    If a machine doesn't understand 'Irony', it can't understand human truth. Humor is a boundary marker for Communities of Knowers. To get the joke, you have to be one of us.`,
    mcqs: [
      { question: "What is 'Incongruity Theory'?", options: ["Everything is the same", "Humor comes from the gap between expectation and reality", "Jokes are math", "Laughter is bad"], answerIndex: 1 },
      { question: "Why is irony difficult for AI?", options: ["Too much power", "It requires understanding that a speaker means the opposite", "It's too fast", "AI has no mouth"], answerIndex: 1 },
      { question: "In TOK, humor is a way to:", options: ["Hide facts", "Test the boundaries of shared cultural knowledge", "Forget reality", "Win arguments"], answerIndex: 1 }
    ],
    deliverablePrompt: "COMEDY SET: Write a short 'Vault Joke' that only someone living underground would understand. Why would a surface survivor find it confusing?"
  }
};

export const UPGRADES = [
  { id: 'rad_mask', name: 'Radiation Mask', cost: 400, desc: 'Hides one incorrect answer in MCQs.', icon: '😷' },
  { id: 'pip_boy', name: 'Pip-Boy Update', cost: 800, desc: 'Earn 15% more XP per node.', icon: '📟' },
  { id: 'stim_pack', name: 'Stimpak', cost: 200, desc: 'Restore 15 Integrity points.', icon: '💉' }
];

export const PUZZLES: Puzzle[] = [
  { id: 'p1', type: 'anagram', prompt: "UNSCRAMBLE THE KEY: 'A-G-N-U-A-G-E-L'", solution: "language", reward: "100 XP" },
  { id: 'p2', type: 'pattern', prompt: "SEQUENCE: Sound -> Syllable -> Word -> ?", solution: "sentence", reward: "100 XP" },
  { id: 'p3', type: 'match', prompt: "ANALOGY: Newspeak is to Control as Jargon is to ?", solution: "exclusion", reward: "100 XP" },
  { id: 'p4', type: 'anagram', prompt: "UNSCRAMBLE: 'K-N-O-W-L-E-D-G-E'", solution: "knowledge", reward: "100 XP" }
];
