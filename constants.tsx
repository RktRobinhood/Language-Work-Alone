
import { Station, StationId, Puzzle } from './types';

export const STATIONS: Record<StationId, Station> = {
  [StationId.RELATIVITY]: {
    id: StationId.RELATIVITY,
    title: "Linguistic Relativity",
    coreIdea: "Language as a cognitive framework for reality.",
    youtubeId: "16u3v_2K6-4", // Reliable TED-Ed
    x: 15, y: 25,
    reading: `TOK Method: Comparative Observation. Language serves as an active lens. Speakers of different languages attend to different details—spatial orientation, gender, or time—shaping habitual patterns of thought.`,
    mcqs: [
      { question: "How do Kuuk Thaayorre speakers stay oriented?", options: ["GPS", "Landmarks", "Cardinal Directions", "The Sun"], answerIndex: 2 },
      { question: "German speakers often describe 'feminine' objects as:", options: ["Heavy", "Elegant", "Brittle", "Loud"], answerIndex: 1 },
      { question: "Relativity implies language:", options: ["Is a set of labels", "Has no effect", "Directs attention", "Is innate"], answerIndex: 2 }
    ],
    deliverablePrompt: "Provide a concrete example of how your language 'nudges' you to notice details others might ignore."
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "Framing & Metaphor",
    coreIdea: "Metaphors as cognitive structures in knowledge production.",
    youtubeId: "6H8M3P7yPsc",
    x: 45, y: 15,
    reading: `TOK Method: Conceptual Analysis. Metaphor is the tool by which we understand abstract concepts through concrete experiences. Framing an issue (e.g., 'War on Drugs') imports specific conflict-based logics into policy.`,
    mcqs: [
      { question: "What happened when crime was framed as a 'beast'?", options: ["Social reform favored", "Enforcement favored", "Crime ignored", "Panic ensued"], answerIndex: 1 },
      { question: "A metaphor's 'source domain' is:", options: ["The abstract idea", "The concrete experience used", "The speaker", "The dictionary"], answerIndex: 1 },
      { question: "Why is framing key in TOK?", options: ["It's pretty", "It hides/shows solutions", "It's easy to remember", "It proves facts"], answerIndex: 1 }
    ],
    deliverablePrompt: "Identify a metaphor in recent news. What solutions does it make feel 'obvious'?"
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "AI Translation Bias",
    coreIdea: "Ethics of algorithms: algorithmic prejudice.",
    youtubeId: "fMlzZpM0Hsg",
    x: 75, y: 20,
    reading: `TOK Ethic: Fairness & Representation. AI reflects human patterns. In translation, this results in 'defaults'—stereotypical gender roles assigned to neutral words.`,
    mcqs: [
      { question: "Why is AI translation biased?", options: ["Hardware error", "Reflects human data", "Hard-coded", "Random chance"], answerIndex: 1 },
      { question: "Semantic flattening is:", options: ["Easier reading", "Loss of cultural nuance", "Faster speeds", "Removing grammar"], answerIndex: 1 },
      { question: "Which languages are most at risk?", options: ["Global ones", "Low-resource ones", "Math ones", "Dead ones"], answerIndex: 1 }
    ],
    deliverablePrompt: "Propose an audit for a translation tool. What inputs would reveal bias?"
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "Epistemic Loss",
    coreIdea: "Language death as the destruction of a knowledge archive.",
    youtubeId: "SIs_s868lC0", // Updated to a more reliable embed
    x: 85, y: 45,
    reading: `TOK Ethic: Preservation. Every language is a unique archive. Endangered languages contain local ecological classifications that dominant ones lack.`,
    mcqs: [
      { question: "What is lost when a language dies?", options: ["Old stories only", "Ways of knowing the world", "Nothing", "Dictionaries"], answerIndex: 1 },
      { question: "A 'living archive' is:", options: ["A plant library", "A native speaker", "A database", "A museum"], answerIndex: 1 },
      { question: "Why is translation often insufficient?", options: ["Too expensive", "Concepts are tied to context", "Illegal", "Unpopular"], answerIndex: 1 }
    ],
    deliverablePrompt: "If knowledge is documented in English, is it saved or transformed?"
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "Relational Animacy",
    coreIdea: "Grammar as an ethical framework for nature.",
    youtubeId: "3vV8D-nK6p0",
    x: 65, y: 75,
    reading: `TOK Method: Linguistic Analysis. Indigenous languages often treat the natural world as animate (who) rather than inanimate (it), changing perception of ethical responsibility.`,
    mcqs: [
      { question: "English typically treats a river as:", options: ["A person", "An object ('it')", "A family member", "A spirit"], answerIndex: 1 },
      { question: "Animacy in Potawatomi applies to:", options: ["Only humans", "Living things like trees", "All nouns", "Only verbs"], answerIndex: 1 },
      { question: "The ethical shift is toward:", options: ["Harder grammar", "Mutual respect", "Exploitation", "Complexity"], answerIndex: 1 }
    ],
    deliverablePrompt: "How would Science change if we treated natural resources as animate?"
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "The Power of Jargon",
    coreIdea: "Precision tool or social barrier?",
    youtubeId: "8iXat9_oOxs",
    x: 35, y: 85,
    reading: `TOK Method: Terminology. Jargon provides precision but also excludes outsiders, raising questions about accessibility of knowledge.`,
    mcqs: [
      { question: "Primary benefit of jargon?", options: ["Status", "Expert precision", "Secrecy", "Speed"], answerIndex: 1 },
      { question: "How does jargon gatekeep?", options: ["Charging money", "Inaccessibility", "Invisible ink", "Special rooms"], answerIndex: 1 },
      { question: "Why be suspicious of jargon?", options: ["Too easy", "Hiding lack of evidence", "Too fast", "Too objective"], answerIndex: 1 }
    ],
    deliverablePrompt: "Analyze one piece of jargon from your studies. Does it clarify or obscure?"
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "Linguistic Politeness",
    coreIdea: "Social navigation vs literal truth.",
    youtubeId: "zS8_K_XU318",
    x: 10, y: 55,
    reading: `TOK Ethic: Social Responsibility. Politeness navigates social hierarchies and manages 'face'—the public self-image people wish to maintain.`,
    mcqs: [
      { question: "Positive Face is:", options: ["Smiling", "Desire to be included", "Desire for space", "Bluntness"], answerIndex: 1 },
      { question: "Indirect requests save:", options: ["Negative face", "Time", "Money", "Grammar"], answerIndex: 0 },
      { question: "Politeness in knowledge can:", options: ["Simplify truth", "Prioritize harmony", "Remove subjectivity", "Fix errors"], answerIndex: 1 }
    ],
    deliverablePrompt: "Describe a situation where an indirect request saved face."
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Logic of Taboo",
    coreIdea: "Ethics of boundaries.",
    youtubeId: "5_6E9PshbUo",
    x: 25, y: 50,
    reading: `TOK Method: Boundary Analysis. Taboos map cultural value. What a society forbids tells us what they SACRED or TERRIFIED of.`,
    mcqs: [
      { question: "Strong language taps into:", options: ["Vocabulary", "Deep brain circuits", "Annoyance", "Grammar"], answerIndex: 1 },
      { question: "Taboos differ because of:", options: ["Random luck", "Cultural values", "Language length", "Nothing"], answerIndex: 1 },
      { question: "Taboo study reveals:", options: ["Rudeness", "Hidden boundaries", "Grammar loss", "Science only"], answerIndex: 1 }
    ],
    deliverablePrompt: "Compare two taboo topics. What do they reveal about those cultures?"
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "Untranslatability",
    coreIdea: "Meaning vs Labels.",
    youtubeId: "7X07p6mSxy8",
    x: 55, y: 40,
    reading: `TOK Method: Translation. Concepts like 'Saudade' raise questions: Is the thought inaccessible, or just the word?`,
    mcqs: [
      { question: "Untranslatability suggests:", options: ["Meaning is easy", "Meaning is tied to context", "Words don't matter", "All same"], answerIndex: 1 },
      { question: "An 'efficient label' is:", options: ["A sticker", "A dense concept-word", "A long sentence", "Code"], answerIndex: 1 },
      { question: "Faithful translation values:", options: ["Rhyme", "Intent/Meaning", "Length", "Alphabet"], answerIndex: 1 }
    ],
    deliverablePrompt: "Find an untranslatable word. Does a non-speaker understand the knowledge it encodes?"
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Political Newspeak",
    coreIdea: "Ethics of Manipulation.",
    youtubeId: "52N6p63pveU",
    x: 30, y: 5,
    reading: `TOK Ethic: Manipulation. Orwell's Newspeak explores how narrowing language narrows thought. Euphemisms obscure moral knowledge.`,
    mcqs: [
      { question: "Goal of Newspeak?", options: ["Beauty", "Limit range of thought", "Expand vocabulary", "Research"], answerIndex: 1 },
      { question: "A euphemism is:", options: ["Noise", "A mild substitute", "Scientific", "Foreign"], answerIndex: 1 },
      { question: "Framing affects the audience's:", options: ["Objectivity", "Ethical response", "Speed", "Facts"], answerIndex: 1 }
    ],
    deliverablePrompt: "Identify a modern euphemism. What knowledge is it design to hide?"
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "Orality vs Literacy",
    coreIdea: "Methods of knowledge storage.",
    youtubeId: "fSPlmpxf6H0",
    x: 90, y: 10,
    reading: `TOK Method: Transmission. Oral cultures rely on memory and performance. Literacy allows external storage but may lose context.`,
    mcqs: [
      { question: "Accuracy in oral tradition is via:", options: ["Luck", "Rhythm and Community", "Secret writing", "Tablets"], answerIndex: 1 },
      { question: "Literacy advantage is:", options: ["Fun", "External storage", "Total accuracy", "Singing"], answerIndex: 1 },
      { question: "What is often lost in writing?", options: ["Math", "Social context/performance", "Dates", "Names"], answerIndex: 1 }
    ],
    deliverablePrompt: "Describe something you learned purely orally. How would writing it down change it?"
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "Language Acquisition",
    coreIdea: "Methods: Innate vs Learned.",
    youtubeId: "7Cgpfw4z8cw",
    x: 5, y: 90,
    reading: `TOK Method: Psychology. Chomsky argued for Universal Grammar—an innate blueprint, suggesting basic knowledge structures are biological.`,
    mcqs: [
      { question: "Universal Grammar implies:", options: ["Scratch learning", "Innate structures", "Identity", "School only"], answerIndex: 1 },
      { question: "The 'Critical Period' is:", options: ["Age 50", "Childhood window", "Library time", "Exams"], answerIndex: 1 },
      { question: "Chomsky leans toward:", options: ["Empiricism", "Nativism", "Relativism", "Logic"], answerIndex: 1 }
    ],
    deliverablePrompt: "If language is innate, do we all share common knowledge boundaries?"
  }
};

export const UPGRADES = [
  { id: 'logic_probe', name: 'Logic Probe', cost: 500, desc: 'Eliminates 1 wrong MCQ choice.', icon: '⚡' },
  { id: 'signal_boost', name: 'Signal Booster', cost: 1000, desc: 'Increases XP gain by 20%.', icon: '📡' },
  { id: 'data_integrity', name: 'Repair Protocol', cost: 300, desc: 'Instantly restore 20% Integrity.', icon: '🛠️' }
];

export const PUZZLES: Puzzle[] = [
  { id: 'p1', type: 'cipher', prompt: "DECODE: 'K_OWLEDGE'", solution: "knowledge" },
  { id: 'p2', type: 'pattern', prompt: "NEXT IN SEQUENCE: Word, Sentence, Paragraph, ?", solution: "chapter" }
];
