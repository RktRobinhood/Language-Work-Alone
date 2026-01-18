
import { Station, StationId, Puzzle } from './types.ts';

export const UPGRADES = [
  { id: 'rad_mask', name: 'Logic Shield', desc: 'Neural shielding that dampens cognitive dissonance.', cost: 400, icon: '🛡️' },
  { id: 'pip_boy', name: 'Neural Uplink', desc: 'Optimizes XP harvest from stabilized nodes.', cost: 800, icon: '🧠' },
  { id: 'fuel_cell', name: 'Hyper-Fuel', desc: 'Increases the efficiency of memory travel.', cost: 600, icon: '⚡' },
  { id: 'mre_pack', name: 'Synapse MRE', desc: 'Bio-nutrients to sustain deep conceptual dives.', cost: 500, icon: '🍱' }
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
    youtubeId: "RKK7wTHuXls",
    readingSource: "Edward Sapir & Benjamin Lee Whorf",
    reading: `The Sapir-Whorf hypothesis posits that the language we speak defines our cognitive architecture. Edward Sapir argued that language is not merely a vehicle for thought, but the very mold in which thought is cast. His student, Benjamin Lee Whorf, expanded this into 'Linguistic Relativity.' 

Consider the structure of time. In Standard Average European (SAE) languages, we treat time as a commodity—something we 'spend,' 'waste,' or 'save.' We divide it into discrete, countable units (seconds, minutes). Whorf observed that the Hopi language treats time as a duration, a continuity of 'getting later.' This grammatical difference, he argued, leads to a fundamentally different experience of reality. 

In TOK terms, we must ask: If our language lacks a word for a concept, does the concept truly exist for the speaker? This leads to the distinction between 'Strong Determinism' (language as a cage) and 'Weak Relativity' (language as a lens). While translation proves we can move between concepts, the effort required to translate a 'native' concept suggests that some knowledge is inherently tied to its linguistic vessel.`,
    x: 15, y: 15,
    neighbors: [StationId.ACQUISITION, StationId.CREE],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Explore how your native language categorizes emotions. Are there feelings you can name in one language that don't exist in another?",
    mcqs: [{ question: "What is 'Linguistic Determinism'?", options: ["Language influences thought.", "Language dictates thought.", "Thought influences language.", "Thought and language are identical."], answerIndex: 1 }],
    deliverablePrompt: "SOURCE: 'The limits of my language mean the limits of my world.' (Wittgenstein). How does learning a second language expand the boundaries of your 'world'?",
    dilemma: [
      { text: "Strict Determinism", effect: { dcMod: 2, rewardMod: 1.5, integrityMod: -10 }, flavor: "Accept that your thoughts are bound by your grammar. Harder DC, higher XP." },
      { text: "Linguistic Universalism", effect: { dcMod: -2, rewardMod: 0.8, integrityMod: 5 }, flavor: "Believe that thought precedes language. Safer DC, lower reward." }
    ]
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "The Animacy Grove",
    coreIdea: "Grammar as an Ethical Framework.",
    difficultyDC: 11,
    youtubeId: "mNf2L-vUuO4",
    reading: "In English, objects in the natural world (trees, rivers, bays) are typically 'it'. In many Indigenous languages, such as Potawatomi, the grammar of animacy is much broader. Robin Wall Kimmerer notes that in Potawatomi, to be a 'bay' is a verb. The bay is an active participant in reality, not a static object. By grammaticizing nature as alive, the language enforces an ethical relationship of reciprocity. If a tree is a 'who' rather than an 'it', the way we treat that tree—and the knowledge we derive from it—changes fundamentally. This raises a profound TOK question about the 'Community of Knowers': Is the natural world a member of our community, or merely a resource for it? This shift from 'it' to 'who' represents a fundamental reorientation of epistemic values and our responsibility as knowers within an ecosystem.",
    x: 40, y: 20,
    neighbors: [StationId.RELATIVITY, StationId.ENDANGERED],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Draft a description of a forest using only active verbs to describe the trees.",
    mcqs: [{ question: "In Potawatomi, 'bay' is a:", options: ["Noun", "Verb", "Preposition", "Adjective"], answerIndex: 1 }],
    deliverablePrompt: "How does the grammatical 'objectification' of the natural world in English contribute to ecological crises?",
    dilemma: [
      { text: "Scientific Objectivity", effect: { dcMod: -2, rewardMod: 0.7, integrityMod: -10 }, flavor: "Treat the grove as a data set. DC 9, but loss of empathy." },
      { text: "Ecological Reciprocity", effect: { dcMod: 4, rewardMod: 2.0, integrityMod: 15 }, flavor: "Treat the grove as a teacher. DC 15, high integrity." }
    ]
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "The Bridge of Logos",
    coreIdea: "Hermeneutics and Semantic Loss.",
    difficultyDC: 12,
    youtubeId: "7L_U0_q6A-w",
    reading: "Translation is not a mechanical mapping of word A to word B. It is an act of negotiation. Consider the Greek word 'Logos'—it can mean word, reason, proportion, or divine plan. When translated into Chinese as 'Dào', it inherits the connotations of 'The Path' and 'Flow'. The translator must choose which facet of meaning to preserve, often at the expense of others. This is 'Semantic Leakage.' In religious and legal texts, a single 'mistranslation' can change the course of history. TOK asks: Is 'perfect translation' an epistemological impossibility? Umberto Eco famously said that translation is 'the art of failure.' We must acknowledge that some nuances are structurally untranslatable because the culture that produced them is structurally unique in its perception of the world.",
    x: 45, y: 75,
    neighbors: [StationId.ORAL_TRADITION, StationId.HUMOR],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Find a poem in your first language and try to translate its *rhythm* rather than its words.",
    mcqs: [{ question: "What is 'Logos'?", options: ["Logic only", "A Greek island", "Word/Reason", "A brand name"], answerIndex: 2 }],
    deliverablePrompt: "Choose a word from your native language that has no direct English equivalent. How do you explain it to a 'stranger'?",
    dilemma: [
      { text: "Literal Accuracy", effect: { dcMod: 0, rewardMod: 1.0, integrityMod: 0 }, flavor: "Standard DC. Safe translation." },
      { text: "Cultural Resonance", effect: { dcMod: 4, rewardMod: 1.8, integrityMod: 10 }, flavor: "Attempt to translate the 'vibe'. DC 16, high reward." }
    ]
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Control Tower 1984",
    coreIdea: "Linguistic Engineering and Power.",
    difficultyDC: 14,
    youtubeId: "52S-v-F7i44",
    reading: "George Orwell's Newspeak was designed to diminish the range of thought by removing words. If you remove the word 'freedom', can you still conceive of it? Newspeak uses 'Doublespeak' to sanitize reality. In modern contexts, we see this in 'Enhanced Interrogation' (torture) or 'Collateral Damage' (civilian death). Language here is not used to communicate truth, but to control the framework of interpretation. It is a tool of power used by a community of knowers to exclude or manipulate others. The engineering of language leads to the engineering of the soul, limiting the very possibility of dissent by removing the vocabulary required for it.",
    x: 80, y: 25,
    neighbors: [StationId.JARGON, StationId.POLITENESS],
    scaffoldType: 'claim-counter',
    lessonPlan: "Analyze a political speech. Identify terms that 'sanitize' or 'obscure' the reality of the actions being described.",
    mcqs: [{ question: "Goal of Newspeak?", options: ["Efficiency", "Beauty", "Thought Control", "Education"], answerIndex: 2 }],
    deliverablePrompt: "Can power exist without the control of language? Justify with examples from history.",
    dilemma: [
      { text: "Accept Official Framing", effect: { dcMod: -4, rewardMod: 0.5, integrityMod: -15 }, flavor: "It's easy to follow the Party. DC 10, low integrity." },
      { text: "Linguistic Rebellion", effect: { dcMod: 5, rewardMod: 2.2, integrityMod: 15 }, flavor: "Define your own terms. DC 19, massive reward." }
    ]
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "The Tabula Rasa",
    coreIdea: "Innate vs Learned Language.",
    difficultyDC: 10,
    youtubeId: "3m0Vv5r-Tj4",
    reading: "Is language a biological instinct (Chomsky) or a learned behavior (Skinner)? Chomsky's Universal Grammar suggests we are born with a blueprint for language. Skinner argued language is learned through reinforcement. TOK asks: If language is innate, does that mean all humans share a basic logical framework? Or does the diversity of languages prove that our logic is purely cultural? The 'Poverty of the Stimulus' argument suggests children learn language too fast for it to be purely learned, implying a deep, evolutionary knowledge structure already exists within us.",
    x: 10, y: 55,
    neighbors: [StationId.RELATIVITY, StationId.ORAL_TRADITION],
    scaffoldType: 'claim-counter',
    lessonPlan: "Look at 'over-regularization' in children (e.g., saying 'goed' instead of 'went'). What does this reveal about logic?",
    mcqs: [{ question: "Skinner's theory relies on:", options: ["DNA", "Reinforcement", "Magic", "Math"], answerIndex: 1 }],
    deliverablePrompt: "Is language 'human-specific' knowledge? Compare with animal communication systems.",
    dilemma: [
      { text: "Behaviorist View", effect: { dcMod: 0, rewardMod: 1.0, integrityMod: 0 }, flavor: "Skinner path." },
      { text: "Nativist View", effect: { dcMod: 0, rewardMod: 1.0, integrityMod: 0 }, flavor: "Chomsky path." }
    ]
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "Metaphoric Junction",
    coreIdea: "Metaphors We Live By.",
    difficultyDC: 11,
    youtubeId: "Zf_u64Pst-A",
    reading: "Lakoff and Johnson argue that metaphors are not just poetic flourishes; they are cognitive tools. 'Argument is War' leads us to 'attack' claims and 'defend' positions. If we used the metaphor 'Argument is Dance', the goal would be coordination and aesthetics rather than victory. Metaphors structure our knowledge in the Natural and Human Sciences as well—think of the 'Genetic Code' or the 'Market Force'. Metaphor is how we understand the unknown by mapping it onto the known, but in doing so, we inevitably distort the reality of the new domain.",
    x: 65, y: 15,
    neighbors: [StationId.AI_MT, StationId.RELATIVITY],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Identify a metaphor in a science textbook. How does it simplify the truth? What does it hide?",
    mcqs: [{ question: "Argument is War is a:", options: ["Simile", "Conceptual Metaphor", "Logic error", "Truth"], answerIndex: 1 }],
    deliverablePrompt: "Describe TOK using a metaphor. How does your choice change how you view the subject?",
    dilemma: [
      { text: "Literalism", effect: { dcMod: 3, rewardMod: 0.5, integrityMod: 0 }, flavor: "Avoid all metaphors. DC 14." },
      { text: "Creative Synthesis", effect: { dcMod: -1, rewardMod: 1.2, integrityMod: 5 }, flavor: "Find new metaphors. DC 10." }
    ]
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Living Archive",
    coreIdea: "Orality vs Literacy.",
    difficultyDC: 13,
    reading: "Writing restructures consciousness. Walter Ong argues that oral cultures are 'Homeostatic'—they forget what is no longer relevant, maintaining a living, breathing archive of knowledge. Written cultures allow for decontextualized, static archives. This change affects how we view 'Truth'. In an oral culture, truth is what the community remembers; in a written culture, truth is what is recorded. Oral traditions prioritize the relationship between the speaker and the listener, making knowledge a shared event rather than a stored object.",
    x: 25, y: 90,
    neighbors: [StationId.TRANSLATION, StationId.ACQUISITION, StationId.ENDANGERED],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Compare a family story told by a grandparent to a written history of the same event.",
    mcqs: [{ question: "Oral cultures are:", options: ["Backward", "Homeostatic", "Forgotten", "Cold"], answerIndex: 1 }],
    deliverablePrompt: "How does the 'permanence' of the internet change our relationship with oral truth?",
    dilemma: [
      { text: "Transcribe Everything", effect: { dcMod: -2, rewardMod: 0.8, integrityMod: -10 }, flavor: "Freeze the oral into text. DC 11." },
      { text: "Perform the Memory", effect: { dcMod: 4, rewardMod: 1.8, integrityMod: 15 }, flavor: "Maintain the living word. DC 17." }
    ]
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "Silicon Translator",
    coreIdea: "Algorithmic Bias in Language.",
    difficultyDC: 15,
    youtubeId: "5899S6N6L_w",
    reading: "AI models are trained on human-produced text, which is laden with historical biases. When translating from gender-neutral languages (like Turkish) to gendered ones (like English), AI often defaults to stereotypes—translating 'O bir doktor' as 'He is a doctor' and 'O bir hemşire' as 'She is a nurse'. The AI does not 'know' the world; it knows the statistical probability of words. This raises a TOK concern: Is AI amplifying human prejudice under the guise of 'objective' data? Large Language Models (LLMs) simulate understanding through syntax, but lack the semantics of lived experience.",
    x: 85, y: 65,
    neighbors: [StationId.METAPHOR, StationId.TRANSLATION, StationId.JARGON],
    scaffoldType: 'claim-counter',
    lessonPlan: "Test a translation tool with gender-neutral pronouns. Document the results.",
    mcqs: [{ question: "AI 'knows' through:", options: ["Experience", "Statistics", "Spirit", "Logic"], answerIndex: 1 }],
    deliverablePrompt: "Should we trust AI to translate historical documents? Why or why not?",
    dilemma: [
      { text: "Automate All", effect: { dcMod: -5, rewardMod: 0.6, integrityMod: -20 }, flavor: "The machine is faster. DC 10." },
      { text: "Human Oversight", effect: { dcMod: 5, rewardMod: 2.5, integrityMod: 15 }, flavor: "Validate every output. DC 20." }
    ]
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "The Professional Wall",
    coreIdea: "Jargon as a Barrier to Knowledge.",
    difficultyDC: 12,
    reading: "Jargon allows for precision within a community of knowers, but it serves as a gatekeeper to those outside. Medical, legal, and academic jargon can obscure simple truths, creating an asymmetry of power. If you cannot speak the language of the expert, do you have access to their knowledge? TOK asks: Is jargon necessary for precision, or is it a tool for maintaining elite status? In the sciences, jargon is vital for eliminating ambiguity, but in the human sciences, it can often be used to hide a lack of empirical evidence behind a wall of complexity.",
    x: 92, y: 40,
    neighbors: [StationId.NEWS_PEAK, StationId.AI_MT],
    scaffoldType: 'claim-counter',
    lessonPlan: "Take a paragraph from a scientific paper and translate it into language a 10-year-old would understand.",
    mcqs: [{ question: "Internal benefit of jargon?", options: ["Confusion", "Precision", "Status", "Speed"], answerIndex: 1 }],
    deliverablePrompt: "Does 'simple language' always mean 'lesser knowledge'?",
    dilemma: [
      { text: "Obfuscate", effect: { dcMod: -2, rewardMod: 1.2, integrityMod: -10 }, flavor: "Sound smarter to gain funding. DC 10." },
      { text: "Democratize", effect: { dcMod: 3, rewardMod: 1.5, integrityMod: 10 }, flavor: "Be clear to be inclusive. DC 15." }
    ]
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "Honorific Hall",
    coreIdea: "Social Hierarchy and Grammar.",
    difficultyDC: 11,
    reading: "In languages like Japanese or Korean, you literally cannot speak without acknowledging the relative social status of the listener. Honorifics are built into the grammar. This forces the speaker to constantly evaluate hierarchy. Contrast this with 'egalitarian' languages. TOK asks: Does a language with deep honorifics make it harder for a society to be truly democratic? These linguistic 'respect' systems embed the social order into every utterance, making rebellion or equality difficult to even articulate.",
    x: 75, y: 55,
    neighbors: [StationId.NEWS_PEAK, StationId.HUMOR],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Research the use of 'T-V distinction' (tu/vous, tú/usted) in European languages. How does it change the 'vibe' of a conversation?",
    mcqs: [{ question: "Honorifics express:", options: ["Speed", "Status", "Color", "Math"], answerIndex: 1 }],
    deliverablePrompt: "How does the way you address your teacher change the 'knowledge' you feel comfortable sharing with them?",
    dilemma: [
      { text: "Deferential", effect: { dcMod: -3, rewardMod: 0.8, integrityMod: 0 }, flavor: "Follow the rules. DC 8." },
      { text: "Egalitarian", effect: { dcMod: 4, rewardMod: 1.7, integrityMod: 5 }, flavor: "Challenge the hierarchy. DC 15." }
    ]
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Semantic Slip",
    coreIdea: "Humor and Cultural Untranslatability.",
    difficultyDC: 10,
    reading: "Humor often relies on phonetic accidents or cultural 'insider' knowledge. A pun in one language is rarely funny in another. Jokes reveal the boundaries of what a culture considers sacred or ridiculous. TOK asks: Is humor the most difficult form of knowledge to share between cultures? Humor requires a deep sync with the 'contextual baseline' of a culture—to laugh at a joke is to prove that you know the rules that are being broken.",
    x: 65, y: 85,
    neighbors: [StationId.TRANSLATION, StationId.POLITENESS],
    scaffoldType: 'standard',
    lessonPlan: "Explain a joke from your culture to someone who doesn't share your background. Why does it 'die' in the explanation?",
    mcqs: [{ question: "Puns rely on:", options: ["Logic", "Phonetics", "Math", "Silence"], answerIndex: 1 }],
    deliverablePrompt: "Why is 'getting a joke' a sign of belonging to a specific community of knowers?",
    dilemma: [
      { text: "Explain the Joke", effect: { dcMod: 5, rewardMod: 0.5, integrityMod: 0 }, flavor: "The death of humor. DC 15." },
      { text: "Localize the Joke", effect: { dcMod: 0, rewardMod: 1.3, integrityMod: 5 }, flavor: "Adapt the funny. DC 10." }
    ]
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "The Silent Archive",
    coreIdea: "Language Death and Knowledge Loss.",
    difficultyDC: 10,
    youtubeId: "vD0lVj4Uv-Q",
    reading: "Every two weeks, a language dies. With it, an entire encyclopedia of traditional ecological knowledge (TEK) vanishes. If a language that has 50 words for local plants dies, the knowledge of those plants' medicinal properties often dies with it. This is a 'Monoculture of the Mind.' TOK asks: Is the preservation of a language a moral duty for the global community of knowers? We are losing unique ways of categorizing reality, effectively burning the libraries of human cognition and limiting the epistemological diversity of our species.",
    x: 55, y: 10,
    neighbors: [StationId.CREE, StationId.ORAL_TRADITION],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Research a language revitalization project (e.g. Welsh or Hebrew). What was saved besides words?",
    mcqs: [{ question: "What is TEK?", options: ["Technical Knowledge", "Traditional Environmental Knowledge", "Theatrical Knowledge", "Total Knowledge"], answerIndex: 1 }],
    deliverablePrompt: "Is it more efficient for the world to speak only one language? What is the cost of that efficiency?",
    dilemma: [
      { text: "Globalist Utility", effect: { dcMod: -2, rewardMod: 0.8, integrityMod: -15 }, flavor: "Focus on efficiency. DC 8, low integrity." },
      { text: "Cultural Conservation", effect: { dcMod: 4, rewardMod: 2.0, integrityMod: 15 }, flavor: "Save the library. DC 14, high integrity." }
    ]
  }
};
