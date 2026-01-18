
import { Station, StationId, Puzzle } from './types.ts';

export const UPGRADES = [
  { id: 'rad_mask', name: 'Logic Shield', desc: 'Halves integrity loss from wrong answers.', cost: 400, icon: '🛡️' },
  { id: 'pip_boy', name: 'Neural Uplink', desc: 'Increases XP yield by 25%.', cost: 800, icon: '🧠' },
  { id: 'fuel_cell', name: 'Hyper-Fuel', desc: 'Drastically reduces travel cost.', cost: 600, icon: '⚡' },
  { id: 'mre_pack', name: 'Synapse MRE', desc: 'Gain +1 Ration after every node.', cost: 500, icon: '🍱' }
];

export const PUZZLES: Puzzle[] = [
  { id: 'p1', type: 'tok-concept', prompt: "TERM: This is the specific focus of TOK; it asks how we know what we know.", solution: "knowledge question", reward: { fuel: 25, xp: 100 } },
  { id: 'p2', type: 'fallacy', prompt: "FALLACY: 'Everyone believes it, so it must be true.'", solution: "ad populum", reward: { rations: 5, xp: 150 } },
  { id: 'p3', type: 'logic', prompt: "SYLLOGISM: All languages are systems. English is a language. Therefore, English is a ___.", solution: "system", reward: { xp: 200, integrity: 15 } },
  { id: 'p4', type: 'tok-concept', prompt: "CONCEPT: The shared knowledge within a specific profession or field.", solution: "community of knowers", reward: { fuel: 10, rations: 2 } }
];

export const STATIONS: Record<StationId, Station> = {
  [StationId.RELATIVITY]: {
    id: StationId.RELATIVITY,
    title: "Sapir-Whorf Shelter",
    coreIdea: "Linguistic Determinism vs Relativity.",
    readingSource: "Benjamin Lee Whorf",
    reading: "The grammar of each language is not merely a reproducing instrument for voicing ideas but rather is itself the shaper of ideas. We dissect nature along lines laid down by our native languages. The world is presented in a kaleidoscopic flux of impressions which has to be organized by our minds—and this means largely by the linguistic systems in our minds.",
    youtubeId: "RKK7wGAYP6k",
    x: 12, y: 15,
    fuelCost: 8, rationCost: 2,
    neighbors: [StationId.ACQUISITION, StationId.CREE],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Examine how linguistic structures act as filters for sensory perception.",
    mcqs: [
      { question: "Strong Linguistic Determinism suggests:", options: ["Language influences thought", "Language controls thought entirely", "Thought controls language", "Language is irrelevant"], answerIndex: 1 },
      { question: "If a language lacks a word for 'Blue', speakers might:", options: ["Be colorblind", "Categorize it with Green", "Never see the sky", "Invent a word instantly"], answerIndex: 1 },
      { question: "Linguistic Relativity is 'weaker' because it says:", options: ["Language determines all", "Language only influences tendencies", "Translation is impossible", "Grammar is fake"], answerIndex: 1 }
    ],
    deliverablePrompt: "How would 'Time' be perceived if your language only used verbs (happening) rather than nouns (durations)?"
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "The Animacy Grove",
    coreIdea: "Grammar as an Ethical Framework.",
    readingSource: "Robin Wall Kimmerer",
    reading: "In English, a bay is a noun, it is a thing. In Potawatomi, 'to be a bay' is a verb. The water is alive, it is an action, it is a being. When we turn the living world into a collection of 'its', we grant ourselves permission to exploit. Grammar is the first step in objectification.",
    youtubeId: "yB2S_S-kS30",
    x: 35, y: 22,
    fuelCost: 12, rationCost: 3,
    neighbors: [StationId.RELATIVITY, StationId.POLITENESS, StationId.ENDANGERED],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Evaluate the ethical implications of grammatical categorization.",
    mcqs: [
      { question: "Objectification in language involves:", options: ["Using too many verbs", "Treating living beings as 'it'", "Speaking loudly", "Writing poetry"], answerIndex: 1 },
      { question: "Verb-based languages for nature suggest:", options: ["Static world", "A world in constant process/being", "Scientific precision", "Confusion"], answerIndex: 1 },
      { question: "How does 'Animacy' affect knowledge?", options: ["It doesn't", "It determines our moral responsibility to the known", "It makes math harder", "It changes spelling"], answerIndex: 1 }
    ],
    deliverablePrompt: "Argue how changing 'The Forest' from an 'it' to a 'they' changes a scientist's research methodology."
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "Metaphoric Junction",
    coreIdea: "Conceptual Metaphor Theory.",
    readingSource: "Lakoff & Johnson",
    reading: "Metaphor is pervasive in everyday life, not just in language but in thought and action. Our ordinary conceptual system, in terms of which we both think and act, is fundamentally metaphorical in nature. For example: 'Argument is War'.",
    youtubeId: "hP0_idXWj60",
    x: 55, y: 10,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.JARGON, StationId.AI_MT, StationId.POLITENESS],
    scaffoldType: 'concept-map',
    lessonPlan: "Map how metaphors structure abstract reasoning in the Natural Sciences vs Human Sciences.",
    mcqs: [
      { question: "Why use 'Argument is War'?", options: ["It's poetic", "It structures how we attack/defend positions", "Arguments are violent", "It saves time"], answerIndex: 1 },
      { question: "If 'Argument is Dance', the goal is:", options: ["Winning", "Balance and beauty", "Speed", "Silence"], answerIndex: 1 },
      { question: "Metaphors map ___ to ___.", options: ["Abstract to Concrete", "Concrete to Abstract", "Words to Sounds", "English to French"], answerIndex: 1 }
    ],
    deliverablePrompt: "Identify a metaphor used in Economics (e.g. 'The Invisible Hand') and explain what it hides about the 'real' world."
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Control Tower 1984",
    coreIdea: "Language and Power.",
    readingSource: "George Orwell",
    reading: "Don’t you see that the whole aim of Newspeak is to narrow the range of thought? In the end we shall make thoughtcrime literally impossible, because there will be no words in which to express it. Every year fewer and fewer words, and the range of consciousness always a little smaller.",
    youtubeId: "ovS_W9_8k5s",
    x: 80, y: 15,
    fuelCost: 15, rationCost: 4,
    neighbors: [StationId.JARGON, StationId.POLITENESS],
    scaffoldType: 'claim-counter',
    lessonPlan: "Analyze the relationship between vocabulary size and cognitive range.",
    mcqs: [
      { question: "The goal of Newspeak is to:", options: ["Expand knowledge", "Restrict thought", "Improve poetry", "Unify the world"], answerIndex: 1 },
      { question: "Thoughtcrime becomes impossible because:", options: ["People are happy", "Words for dissent are removed", "Cameras are everywhere", "Everyone is logical"], answerIndex: 1 },
      { question: "Reducing language complexity leads to:", options: ["Higher efficiency", "Narrower consciousness", "Clearer laws", "Better art"], answerIndex: 1 }
    ],
    deliverablePrompt: "'Language is the ultimate tool of social control.' Present your case."
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "The Silent Archive",
    coreIdea: "Language Extinction and Knowledge Loss.",
    reading: "When a language dies, we lose a unique way of seeing the world. Traditional ecological knowledge, stored only in that specific tongue, vanishes. It is not just words we lose, but a database of human experience.",
    x: 50, y: 40,
    fuelCost: 10, rationCost: 3,
    neighbors: [StationId.CREE, StationId.ORAL_TRADITION],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Examine the link between cultural diversity and epistemic richness.",
    mcqs: [
      { question: "Why does language death matter for knowledge?", options: ["Burning a library", "It doesn't", "It improves grammar", "It makes travel easier"], answerIndex: 0 },
      { question: "Most 'endangered' languages are:", options: ["Written down", "Oral traditions", "Only used by AI", "Invented recently"], answerIndex: 1 },
      { question: "How much knowledge is lost with a language?", options: ["None", "Minimal", "A unique conceptual world", "Just some synonyms"], answerIndex: 2 }
    ],
    deliverablePrompt: "Evaluate the moral obligation of the global community to fund the preservation of indigenous languages."
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "Silicon Translator",
    coreIdea: "Algorithmic Bias in Translation.",
    reading: "Machine translation often defaults to stereotypes. If a language is gender-neutral, AI might translate 'The doctor' as 'He' and 'The nurse' as 'She' based on statistical patterns in training data, reinforcing social biases.",
    x: 70, y: 50,
    fuelCost: 14, rationCost: 2,
    neighbors: [StationId.METAPHOR, StationId.TRANSLATION],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Analyze how data-driven knowledge reflects societal prejudices.",
    mcqs: [
      { question: "Algorithmic bias occurs because:", options: ["Robots are lazy", "Math is evil", "Training data reflects human bias", "AI is sentient"], answerIndex: 2 },
      { question: "Statistical translation relies on:", options: ["Pattern recognition", "Understanding meaning", "A magic dictionary", "Manual input"], answerIndex: 0 },
      { question: "A 'neutral' translation is difficult because:", options: ["Language is inherently loaded", "Computers hate humans", "Grammar is hard", "Data is missing"], answerIndex: 0 }
    ],
    deliverablePrompt: "Can a machine ever 'know' a language if it only processes statistical probabilities of words?"
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "The Tower of Babel",
    coreIdea: "Professional Jargon and Exclusivity.",
    reading: "Jargon serves two roles: precision within a community and exclusion of those outside it. It creates a 'community of knowers' but can also act as a barrier to the democratization of knowledge.",
    x: 85, y: 35,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.METAPHOR, StationId.NEWS_PEAK],
    scaffoldType: 'concept-map',
    lessonPlan: "Distinguish between specialized terminology and unnecessary obfuscation.",
    mcqs: [
      { question: "Jargon is most useful for:", options: ["Confusion", "Efficiency within a field", "Showing off", "Hiding secrets"], answerIndex: 1 },
      { question: "A 'community of knowers' is defined by:", options: ["Shared location", "Age", "Shared language/paradigm", "Shared bank account"], answerIndex: 2 },
      { question: "When jargon is used to exclude, it is:", options: ["Elitist", "Standard", "Academic", "Helpful"], answerIndex: 0 }
    ],
    deliverablePrompt: "Identify a term from TOK (like 'Knowledge Framework') and explain how it helps or hinders a student's understanding."
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "Honorific Hall",
    coreIdea: "Social Hierarchy in Language.",
    reading: "Many languages (like Japanese or Korean) have mandatory honorifics. You cannot speak without defining your social relationship to the listener. This embeds hierarchy into the very structure of thought.",
    x: 60, y: 25,
    fuelCost: 8, rationCost: 2,
    neighbors: [StationId.CREE, StationId.METAPHOR, StationId.NEWS_PEAK],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Reflect on how egalitarian vs hierarchical languages shape social interactions.",
    mcqs: [
      { question: "Honorifics are used to:", options: ["Be loud", "Express social status", "Correct spelling", "Hide meaning"], answerIndex: 1 },
      { question: "In hierarchical languages, a 'neutral' sentence is:", options: ["Mandatory", "Common", "Often impossible", "English-only"], answerIndex: 2 },
      { question: "Social structures are reflected in:", options: ["Alphabet size", "Paper weight", "Verbal conjugation", "Ink color"], answerIndex: 2 }
    ],
    deliverablePrompt: "How would classroom dynamics change if your language required different verb endings for teachers vs students?"
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Pun-derdome",
    coreIdea: "Untranslatability and Culture.",
    reading: "Humor is often the most difficult thing to translate because it relies on cultural context, wordplay, and shared assumptions. A joke that is funny in one language often falls flat in another.",
    x: 20, y: 70,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.TRANSLATION, StationId.ACQUISITION],
    scaffoldType: 'concept-map',
    lessonPlan: "Evaluate what humor reveals about the boundaries of a linguistic community.",
    mcqs: [
      { question: "Why is humor hard to translate?", options: ["Words are too long", "Translators have no soul", "It relies on specific cultural frames", "It isn't"], answerIndex: 2 },
      { question: "A 'pun' relies on:", options: ["Logic", "Linguistic ambiguity", "Loudness", "Grammar"], answerIndex: 1 },
      { question: "Understanding a joke usually implies:", options: ["High IQ", "Being a comedian", "Knowing the language only", "Being part of the cultural community"], answerIndex: 3 }
    ],
    deliverablePrompt: "Explain why 'Lost in Translation' is a valid epistemic problem when studying literature."
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "The Bridge of Sighs",
    coreIdea: "Translation as Interpretation.",
    reading: "To translate is to interpret. No two words in different languages have exactly the same semantic field. The translator must make choices that inevitably alter the original meaning.",
    x: 40, y: 80,
    fuelCost: 12, rationCost: 3,
    neighbors: [StationId.AI_MT, StationId.HUMOR, StationId.ORAL_TRADITION],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Compare translations of the same text to identify shifts in meaning.",
    mcqs: [
      { question: "Perfect translation is:", options: ["A science", "Easy", "Only for computers", "Theoretically impossible"], answerIndex: 3 },
      { question: "A translator is also:", options: ["An interpreter", "A spy", "An author", "A machine"], answerIndex: 0 },
      { question: "Semantic fields are:", options: ["Types of grammar", "The range of meanings for a word", "Internet browsers", "Farms"], answerIndex: 1 }
    ],
    deliverablePrompt: "Analyze how a religious text's meaning changes when moved from its original language to English."
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "The Cradle of Logic",
    coreIdea: "First Language Acquisition.",
    reading: "How do children learn language? Is it an innate 'Universal Grammar' (Chomsky) or is it entirely learned through social interaction (Skinner)? This debate shapes our view of the human mind.",
    x: 10, y: 45,
    fuelCost: 8, rationCost: 2,
    neighbors: [StationId.RELATIVITY, StationId.HUMOR],
    scaffoldType: 'claim-counter',
    lessonPlan: "Evaluate the 'Nature vs Nurture' debate in linguistic development.",
    mcqs: [
      { question: "Chomsky's 'Universal Grammar' suggests language is:", options: ["Useless", "Cultural", "Learned", "Innate"], answerIndex: 3 },
      { question: "The 'Critical Period' refers to:", options: ["History class", "Old age", "The window for easy language learning", "Exam time"], answerIndex: 2 },
      { question: "Skinner's view relies on:", options: ["Biology", "Reinforcement and social cues", "Luck", "Genetics"], answerIndex: 1 }
    ],
    deliverablePrompt: "'Humans are biologically programmed for language.' Present your Claim and Counter-claim."
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Echo Chamber",
    coreIdea: "Oral vs Written Knowledge.",
    reading: "Oral traditions rely on memory, rhythm, and repetition. Knowledge is dynamic and tied to the speaker. Written knowledge is static and detached. How does the medium change the message?",
    x: 25, y: 90,
    fuelCost: 15, rationCost: 5,
    neighbors: [StationId.ENDANGERED, StationId.TRANSLATION],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Contrast the verification methods of oral history with written historiography.",
    mcqs: [
      { question: "Oral traditions rely on:", options: ["Computers", "Paper", "Silence", "Mnemonics and community"], answerIndex: 3 },
      { question: "Written knowledge is often seen as:", options: ["Fixed/Static", "Fluid", "Short-lived", "Unreliable"], answerIndex: 0 },
      { question: "Verifiability in oral cultures comes from:", options: ["Footnotes", "DNA", "Community consensus and performance", "The government"], answerIndex: 2 }
    ],
    deliverablePrompt: "How would our understanding of History change if all books disappeared and we only had stories?"
  }
};
