
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
    difficultyDC: 10,
    readingSource: "Sapir & Whorf",
    reading: `The Sapir-Whorf hypothesis represents a cornerstone of linguistic anthropology, positing that the language we speak fundamentally shapes our cognitive processes. Edward Sapir argued that 'the real world is to a large extent unconsciously built up on the language habits of the group.' Benjamin Lee Whorf expanded this into what he termed 'Linguistic Relativity.'

A central example in Whorf’s work involves the Hopi language. He observed that Hopi lacks the 'tensed' structure prevalent in Standard Average European (SAE) languages. Instead of Past/Present/Future, Hopi grammar distinguishes between 'manifest' (what is or was) and 'unmanifest' (what is imagined or felt). Whorf argued this suggests a universe that is not a collection of static objects moving through time, but a dynamic, unfolding process.

Modern cognitive linguistics has moved away from 'Strong Determinism'—the idea that language acts as an unbreakable cage for thought. If that were true, translation would be impossible. However, 'Weak Relativity' remains supported. Research by Lera Boroditsky has shown that speakers of Kuuk Thaayorre (Australia) use cardinal directions (North, South) instead of relative terms (Left, Right). Even in windowless rooms, they know exactly where North is.

This raises a TOK question: To what extent does our linguistic framework act as a 'lens' that filters sensory data before it even reaches our conscious reasoning?`,
    x: 15, y: 15,
    neighbors: [StationId.ACQUISITION, StationId.CREE],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Analyze how your native language categorizes 'time'. Does it feel like a line or a cycle?",
    mcqs: [
      { question: "What is 'Strong Determinism'?", options: ["Language influences thought.", "Language dictates thought.", "Thought influences language.", "Thought and language are unrelated."], answerIndex: 1 }
    ],
    deliverablePrompt: "SOURCE TEXT (Linguistics Archive): 'The limits of my language mean the limits of my world.' (Wittgenstein). If you speak another language, translate this. Does your L1 version sound more like a cage or a horizon?",
    dilemma: [
      { text: "Prioritize Empirical Precision", effect: { dcMod: 0, rewardMod: 1.2, integrityMod: -5 }, flavor: "You focus on the hard data of navigation. DC stays 10. Reward up, Integrity down." },
      { text: "Embrace Philosophical Nuance", effect: { dcMod: 4, rewardMod: 1.5, integrityMod: 5 }, flavor: "You explore the deeper 'unmanifest' concepts. DC increases to 14. Massive rewards if successful." }
    ]
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "The Bridge of Logos",
    coreIdea: "Hermeneutics and the Epistemology of Translation.",
    difficultyDC: 12,
    readingSource: "Comparative Religious Studies",
    reading: `Translation is fundamentally an act of hermeneutics—the science of interpretation. To translate is not merely to find equivalents, but to negotiate between two distinct systems of meaning. This is most visible in foundational philosophical texts where a single word carries centuries of conceptual baggage.

Consider 'Logos' in Greek. It means Word, but also Reason, Proportion, and Plan. Translating it as 'Dào' in Chinese brings in notions of flow and mystery that differ from Greek rationalism. Similarly, 'Dharma' in Sanskrit is often 'Duty', but it really refers to 'the law that upholds the universe.'

SOURCE TEXTS:
1. Greek: 'En archē ēn ho Lógos.'
2. Chinese: 'Dào kě dào, fēi cháng Dào.' (Tao Te Ching)
3. Arabic: 'Iqra' bismi rabbika' (The command to read/proclaim)

For the multi-lingual knower, translation is an exercise in identifying 'semantic leaks.' No two words ever cover the exact same ground. The French 'ennui' is not just 'boredom'; it is a philosophical weariness. The Japanese 'mottainai' is a regret that an object's spirit was not respected.`,
    x: 45, y: 75,
    neighbors: [StationId.ORAL_TRADITION, StationId.HUMOR],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Select one of the source texts. Attempt to translate it into your L1.",
    mcqs: [
      { question: "What is 'Epistemic Flattening'?", options: ["Losing nuance in translation.", "Improving text speed.", "Making a map flat.", "Correcting grammar."], answerIndex: 0 }
    ],
    deliverablePrompt: "SOURCE TEXT: 'Dào kě dào, fēi cháng Dào.' Translate this. Does your version focus on 'Speaking' the path or 'Naming' the truth?",
    dilemma: [
      { text: "Literal Accuracy", effect: { dcMod: -2, rewardMod: 0.8, integrityMod: 0 }, flavor: "You stick to the dictionary. DC drops to 10, but reward is safer/lower." },
      { text: "Cultural Transposition", effect: { dcMod: 6, rewardMod: 2.0, integrityMod: 10 }, flavor: "You try to translate the 'feeling' (Qualia). High risk DC 18, but legendary rewards." }
    ]
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Control Tower 1984",
    coreIdea: "Linguistic Engineering and Power.",
    difficultyDC: 14,
    reading: "Newspeak was designed not to provide a medium of expression, but to make all other modes of thought impossible. By removing words like 'Justice' or 'Honor', the Party restricted the range of human consciousness. Modern 'Doublespeak' functions similarly—sanitizing reality through abstract labels.",
    x: 80, y: 25,
    neighbors: [StationId.JARGON, StationId.POLITENESS],
    scaffoldType: 'claim-counter',
    lessonPlan: "Identify modern terms used to sanitize reality (e.g., 'Enhanced Interrogation').",
    mcqs: [{ question: "Goal of Newspeak?", options: ["Speed.", "Thought restriction.", "Poetry.", "Spelling."], answerIndex: 1 }],
    deliverablePrompt: "How does the word 'Resource' as used in 'Human Resources' change how you perceive a worker versus using the word 'Person'?",
    dilemma: [
      { text: "Accept Official Framing", effect: { dcMod: -4, rewardMod: 0.5, integrityMod: -10 }, flavor: "You use the doublespeak. It's easy (DC 10), but your integrity takes a hit." },
      { text: "Subversive Deconstruction", effect: { dcMod: 4, rewardMod: 1.8, integrityMod: 15 }, flavor: "You tear the labels apart. Harder DC 18, but high integrity gain." }
    ]
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "The Animacy Grove",
    coreIdea: "Grammar as an Ethical Framework.",
    difficultyDC: 10,
    reading: "In English, we call a tree 'it'. In Potawatomi, the word for bay is a verb: 'to be a bay'. Robin Wall Kimmerer argues that treating nature as 'who' (a subject) instead of 'it' (an object) creates a moral relationship of reciprocity.",
    x: 40, y: 20,
    neighbors: [StationId.RELATIVITY, StationId.ENDANGERED],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Describe a plant using only verbs.",
    mcqs: [{ question: "A bay in Potawatomi is a:", options: ["Noun", "Verb", "Ghost", "Number"], answerIndex: 1 }],
    deliverablePrompt: "Does calling a dog 'it' make it easier to ignore its pain? Relate this to the scientific study of animals.",
    dilemma: [
      { text: "Scientific Neutrality", effect: { dcMod: 0, rewardMod: 1.0, integrityMod: -5 }, flavor: "Stick to 'It'. DC 10. Integrity drops slightly due to objectification." },
      { text: "Moral Relationality", effect: { dcMod: 2, rewardMod: 1.3, integrityMod: 10 }, flavor: "Adopt 'Who'. DC 12. Integrity boost for ethical alignment." }
    ]
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "Metaphoric Junction",
    coreIdea: "Conceptual Metaphor Theory.",
    difficultyDC: 11,
    reading: "Lakoff and Johnson argue we think in metaphors. 'Argument is War' leads to attacking and defending. 'Argument is Dance' would lead to coordination and aesthetics. Metaphors are not just speech; they are the framework of logic.",
    x: 65, y: 15,
    neighbors: [StationId.AI_MT, StationId.RELATIVITY],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Identify metaphors in Science (e.g., 'Genetic Code').",
    mcqs: [{ question: "Metaphors map ___ to ___.", options: ["Words/Sounds", "Concrete/Abstract", "Math/Logic", "Past/Future"], answerIndex: 1 }],
    deliverablePrompt: "Identify a metaphor in 'The Human Sciences'. How does it hide certain truths while highlighting others?",
    dilemma: [
      { text: "Literalism", effect: { dcMod: 2, rewardMod: 0.7, integrityMod: 0 }, flavor: "Reject metaphors. DC 13. Harder to understand, lower reward." },
      { text: "Poetic Synthesis", effect: { dcMod: -1, rewardMod: 1.4, integrityMod: 5 }, flavor: "Find new metaphors. DC 10. Better results." }
    ]
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "The Silent Archive",
    coreIdea: "Language Extinction and Knowledge Loss.",
    difficultyDC: 10,
    reading: "Every two weeks, a language dies. With it, an encyclopedia of traditional ecological knowledge vanishes. This is a 'Monoculture of the Mind.'",
    x: 55, y: 10,
    neighbors: [StationId.CREE, StationId.ORAL_TRADITION],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Investigate a case of language revitalization (e.g., Hebrew).",
    mcqs: [{ question: "What is TEK?", options: ["Tech knowledge.", "Indigenous environmental knowledge.", "Old books.", "Math code."], answerIndex: 1 }],
    deliverablePrompt: "Should the world spend billions to save a language spoken by 5 people? Justify using TOK concepts.",
    dilemma: [
      { text: "Utilitarian View", effect: { dcMod: -2, rewardMod: 0.8, integrityMod: -10 }, flavor: "Focus on global languages. DC 8, but loss of empathy." },
      { text: "Preservationist View", effect: { dcMod: 4, rewardMod: 1.5, integrityMod: 10 }, flavor: "Save the library. DC 14. High reward and integrity." }
    ]
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "Silicon Translator",
    coreIdea: "Algorithmic Bias.",
    difficultyDC: 15,
    reading: "AI models translate based on statistical probability, not meaning. This mirrors and amplifies societal biases (e.g., gendered professions in Turkish-to-English translation).",
    x: 85, y: 65,
    neighbors: [StationId.METAPHOR, StationId.TRANSLATION, StationId.JARGON],
    scaffoldType: 'claim-counter',
    lessonPlan: "Test an AI with gender-neutral pronouns.",
    mcqs: [{ question: "AI translation relies on:", options: ["Meaning.", "Statistics.", "Emotion.", "Grammar books."], answerIndex: 1 }],
    deliverablePrompt: "CLAIM: AI is more objective. COUNTER: Give an example of a bias encoded in a statistical 'truth'.",
    dilemma: [
      { text: "Automate Analysis", effect: { dcMod: -5, rewardMod: 0.6, integrityMod: -15 }, flavor: "Let the machine decide. Very easy DC 10, but integrity crashes." },
      { text: "Manual Verification", effect: { dcMod: 5, rewardMod: 2.0, integrityMod: 10 }, flavor: "Verify every word. Brutal DC 20, but huge data gain." }
    ]
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "The Professional Wall",
    coreIdea: "Jargon as a Gatekeeper.",
    difficultyDC: 12,
    reading: "Jargon allows experts to be precise, but it acts as a gatekeeper. It creates an 'Asymmetry of Knowledge' between the expert (Doctor/Lawyer) and the layperson.",
    x: 92, y: 40,
    neighbors: [StationId.NEWS_PEAK, StationId.AI_MT],
    scaffoldType: 'claim-counter',
    lessonPlan: "Translate jargon into plain English.",
    mcqs: [{ question: "Internal benefit of jargon?", options: ["Confusion.", "Precision.", "Ink saving.", "Status."], answerIndex: 1 }],
    deliverablePrompt: "Identify a term from TOK (e.g., 'Epistemology'). How is it a tool for you, but a wall for your parents?",
    dilemma: [
      { text: "Obfuscate to Impress", effect: { dcMod: -2, rewardMod: 1.2, integrityMod: -10 }, flavor: "Use big words. DC 10. Integrity loss for lack of clarity." },
      { text: "Translate for Public", effect: { dcMod: 3, rewardMod: 1.5, integrityMod: 15 }, flavor: "Break the wall. DC 15. Great integrity gain." }
    ]
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "Honorific Hall",
    coreIdea: "Social Hierarchy in Grammar.",
    difficultyDC: 11,
    reading: "In Japanese or Korean, you cannot speak without determining social status first. Politeness is not a choice; it is a grammatical requirement.",
    x: 75, y: 55,
    neighbors: [StationId.NEWS_PEAK, StationId.HUMOR],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Reflect on how you address your teachers in different languages.",
    mcqs: [{ question: "Keigo is used for:", options: ["Status.", "Food.", "Slang.", "Math."], answerIndex: 0 }],
    deliverablePrompt: "If you can't speak 'levelly' to a leader, does that make it harder to point out their mistakes?",
    dilemma: [
      { text: "Defer to Authority", effect: { dcMod: -3, rewardMod: 0.7, integrityMod: -5 }, flavor: "Play it safe. DC 8. Easy but boring." },
      { text: "Equalize Discourse", effect: { dcMod: 4, rewardMod: 1.6, integrityMod: 10 }, flavor: "Speak plainly. DC 15. Radical and rewarding." }
    ]
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Semantic Slip",
    coreIdea: "Humor and Untranslatability.",
    difficultyDC: 10,
    reading: "Humor is the 'Final Frontier' of translation. Puns rely on phonetic accidents. A joke reveals the boundaries of a culture—what is ridiculous or forbidden.",
    x: 65, y: 85,
    neighbors: [StationId.TRANSLATION, StationId.POLITENESS],
    scaffoldType: 'standard',
    lessonPlan: "Explain a pun to someone who doesn't speak your language.",
    mcqs: [{ question: "Puns rely on:", options: ["Logic.", "Homophony.", "Loudness.", "Grammar."], answerIndex: 1 }],
    deliverablePrompt: "Why is 'getting a joke' a sign of belonging to a 'Community of Knowers'?",
    dilemma: [
      { text: "Explain the Joke", effect: { dcMod: 5, rewardMod: 0.5, integrityMod: 0 }, flavor: "Kill the funny. DC 15. Boring but accurate." },
      { text: "Localize the Humor", effect: { dcMod: 0, rewardMod: 1.3, integrityMod: 5 }, flavor: "Write a new joke. DC 10. Effective and fun." }
    ]
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "The Tabula Rasa",
    coreIdea: "Language Acquisition.",
    difficultyDC: 10,
    reading: "Chomsky (Innate LAD) vs Skinner (Behavioral Learning). The 'Poverty of the Stimulus' suggests we are born with a blueprint for Universal Grammar.",
    x: 10, y: 55,
    neighbors: [StationId.RELATIVITY, StationId.ORAL_TRADITION],
    scaffoldType: 'claim-counter',
    lessonPlan: "Observe children's 'over-regularization' (e.g., 'I goed').",
    mcqs: [{ question: "Chomsky's LAD is:", options: ["A book.", "Innate biology.", "A computer.", "A teacher."], answerIndex: 1 }],
    deliverablePrompt: "Is language a cultural tool (like a house) or a biological instinct (like breathing)?",
    dilemma: [
      { text: "Nurture Focus", effect: { dcMod: 0, rewardMod: 1.0, integrityMod: 0 }, flavor: "Skinner path. DC 10." },
      { text: "Nature Focus", effect: { dcMod: 0, rewardMod: 1.0, integrityMod: 0 }, flavor: "Chomsky path. DC 10." }
    ]
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Living Archive",
    coreIdea: "Oral vs Written Knowledge.",
    difficultyDC: 13,
    reading: "Writing restructures consciousness. Oral knowledge is 'Homeostatic'—it remembers only what is relevant. Written knowledge allows for 'Decontextualized' archives.",
    x: 25, y: 90,
    neighbors: [StationId.TRANSLATION, StationId.ACQUISITION, StationId.ENDANGERED],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Compare a witness account to a written record.",
    mcqs: [{ question: "Oral cultures are homeostatic because:", options: ["Cold.", "Relevant memory.", "Writing.", "Fridges."], answerIndex: 1 }],
    deliverablePrompt: "How would your knowledge of history change if your only source was your grandmother's stories?",
    dilemma: [
      { text: "Transcribe to Text", effect: { dcMod: -2, rewardMod: 0.8, integrityMod: -5 }, flavor: "Freeze it. DC 11. Loss of 'lived' context." },
      { text: "Participate in Performance", effect: { dcMod: 4, rewardMod: 1.7, integrityMod: 15 }, flavor: "Live it. DC 17. High risk, high spirit." }
    ]
  }
};
