
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

/* 
 * FIX: Populated all missing enum members of StationId in STATIONS to satisfy Record<StationId, Station>.
 * This resolves the TypeScript missing property error.
 */
export const STATIONS: Record<StationId, Station> = {
  [StationId.RELATIVITY]: {
    id: StationId.RELATIVITY,
    title: "Sapir-Whorf Shelter",
    coreIdea: "Linguistic Determinism vs Relativity.",
    difficultyDC: 10,
    readingSource: "Edward Sapir / Benjamin Lee Whorf",
    reading: `The hypothesis of linguistic relativity, popularized by Edward Sapir and his student Benjamin Lee Whorf, suggests that the structure of a language affects its speakers' world view or cognition. This is not merely about the existence of specific words, but the grammatical architecture that forces a mind to attend to certain aspects of reality.

    For example, in many Standard Average European (SAE) languages, time is treated as a linear commodity that can be saved, spent, or wasted. Our grammar reflects this: we use 'past', 'present', and 'future' tenses. Whorf observed that the Hopi language lacked these tenses, focusing instead on 'manifest' (what is currently occurring or has occurred) vs 'unmanifest' (what is imagined, planned, or felt). Whorf argued this led to a culture where 'time' was not a resource to be managed, but a process to be inhabited.

    Modern critics point out that if 'Strong Determinism' were true—if language *dictated* thought—then translation would be impossible. However, 'Weak Relativity' remains robust. Researchers like Lera Boroditsky have demonstrated that speakers of languages like Kuuk Thaayorre, who use cardinal directions (North, South, East, West) instead of relative terms (Left, Right), possess an internal compass far superior to SAE speakers. They *know* where North is at all times because their language demands it for every sentence. 

    The TOK implications are massive. If our language acts as a 'filter' for sensory data, can we ever claim to possess 'objective' knowledge of reality? Or is our knowledge always 'mediated' by the linguistic symbols we use to label it? If a language lacks a word for 'Self', does the concept of the individual exist in that culture in the same way?`,
    youtubeId: "RKK7wGAYP6k",
    x: 15, y: 20,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.ACQUISITION, StationId.CREE],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Analyze how your native language categorizes 'time'. Does it feel like a line or a cycle?",
    mcqs: [
      { question: "What is the difference between 'Strong Determinism' and 'Weak Relativity'?", options: ["Strong means language dictates thought; Weak means it influences thought.", "Strong is about grammar; Weak is about vocabulary.", "Strong is proven; Weak is a myth.", "There is no difference."], answerIndex: 0 },
      { question: "What was Whorf's observation about the Hopi language?", options: ["It had too many words for snow.", "It lacked linear time tenses.", "It was impossible to translate.", "It used numbers for everything."], answerIndex: 1 },
      { question: "Kuuk Thaayorre speakers are better at navigation because:", options: ["They use GPS.", "They are born with better ears.", "Their language requires constant cardinal direction tracking.", "They live in the desert."], answerIndex: 2 }
    ],
    deliverablePrompt: "Compare the English word 'Deadline' with its equivalent in your native language. Does your L1 word imply 'Death/Ending' (like English) or something else? How does this change your stress regarding school work?"
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "The Bridge of Logos",
    coreIdea: "Semantic Gaps and Religious Translation.",
    difficultyDC: 12,
    readingSource: "Biblical & Taoist Scholarship",
    reading: `Translation is fundamentally an act of interpretation. Every time a text moves from one language to another, 'semantic leaks' occur. This is particularly sensitive in religious texts where a single word carries the weight of salvation or cosmic order.

    Consider the opening of the Gospel of John: 'En archē ēn ho Lógos' (Greek). The word 'Logos' is notoriously untranslatable. It can mean 'Word', but also 'Reason', 'Proportion', 'Account', or 'Plan'. In Latin, it became 'Verbum'. When the Bible reached China, translators had to choose: should 'Logos' be translated as 'Dào' (The Way/The Path)? Choosing 'Dào' brings centuries of Taoist philosophy—notions of flow, mystery, and non-action—into a text that was originally rooted in Greek rationalism.

    Similarly, consider the Sanskrit term 'Dharma'. In English, it is often 'Religion' or 'Duty', but both are insufficient. 'Dharma' is the 'law that upholds the universe.' By translating it as 'Duty', we lose the cosmic significance; by translating it as 'Religion', we impose a Western category of organized belief on a concept that is about inherent nature.

    SOURCE TEXTS FOR ANALYSIS:
    1. Greek (John 1:1): 'En archē ēn ho Lógos.'
    2. Chinese (Dao De Jing): 'Dào kě dào, fēi cháng Dào.' (The Tao that can be told is not the eternal Tao.)
    3. Sanskrit (Gita): 'Dharmakshetre kurukshetre...' (In the field of Dharma, in the field of the Kurus...)

    In each of these, the 'Knowers' of the original language experience a 'thickness' of meaning that the 'Knower' of the translation misses. This leads to 'Epistemic Flattening', where complex, culturally-specific knowledge is smoothed out into generic, understandable, but inaccurate concepts.`,
    x: 45, y: 75,
    fuelCost: 15, rationCost: 5,
    neighbors: [StationId.ORAL_TRADITION, StationId.HUMOR],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Select one of the source texts provided. Attempt to translate it into a language other than English that you speak.",
    mcqs: [
      { question: "What is 'Epistemic Flattening'?", options: ["Making a map smaller.", "Losing cultural nuance through translation into generic terms.", "Translating a text into a flat file format.", "Improving the speed of reading."], answerIndex: 1 },
      { question: "Why was 'Dao' a controversial choice for 'Logos'?", options: ["It sounds too similar.", "It is a word for food.", "It brings Taoist conceptual baggage into a Christian context.", "It is too short."], answerIndex: 2 },
      { question: "Translation is called an 'Act of Hermeneutics' because:", options: ["It is about science.", "It is about the study of interpretation.", "It is about Greek gods.", "It is very expensive."], answerIndex: 1 }
    ],
    deliverablePrompt: "SOURCE TEXT: 'Dào kě dào, fēi cháng Dào.' (Translation: The Way that can be spoken is not the Eternal Way). If you speak another language (Spanish, Arabic, Hindi, etc.), translate this now. Does your L1 translation emphasize 'speaking' or 'following'?"
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Orwellian Outpost",
    coreIdea: "Linguistic Engineering and Political Control.",
    difficultyDC: 14,
    readingSource: "George Orwell, '1984' Appendix",
    reading: `In the appendix to '1984', George Orwell explains the principles of Newspeak. The purpose of Newspeak was not merely to provide a medium of expression for the Party's worldview, but to make all other modes of thought impossible. 

    The vocabulary was divided into three classes. The 'A' vocabulary consisted of words for everyday life (eating, drinking, working). The 'B' vocabulary was political, consisting of words like 'goodthink' or 'doubleplusungood'. The 'C' vocabulary was scientific and technical. Newspeak achieved its goal through 'vocabulary reduction'. If the word 'freedom' is abolished, then the *concept* of freedom becomes literally unthinkable. If you want to say someone is 'unfree', you can only say they are 'not-good-thinking'.

    This is a extreme form of Linguistic Determinism. Orwell argues that if we do not have the words to describe an injustice, our ability to recognize and resist that injustice vanishes. In modern contexts, we see this in 'Corporate Speak' or 'Political Doublespeak'. When 'Civilian Casualties' are called 'Collateral Damage', the language is engineered to sanitize the reality of death. The word 'Collateral' implies a secondary, minor effect, distancing the knower from the visceral truth.

    TOK Question: Does our moral compass depend on our vocabulary? If we lose the word for 'Injustice', do we lose the ability to feel it?`,
    youtubeId: "ovS_W9_8k5s",
    x: 80, y: 30,
    fuelCost: 20, rationCost: 5,
    neighbors: [StationId.JARGON, StationId.POLITENESS],
    scaffoldType: 'claim-counter',
    lessonPlan: "Identify 3 modern 'Doublespeak' terms used in news or business (e.g. 'Right-sizing' for firing people).",
    mcqs: [
      { question: "The goal of Newspeak was to:", options: ["Help people learn English.", "Restrict the range of human thought.", "Improve poetry.", "Make reading faster."], answerIndex: 1 },
      { question: "How does 'Collateral Damage' sanitize reality?", options: ["It sounds more professional.", "It uses Latin roots.", "It uses abstract language to hide the reality of death.", "It is easier to spell."], answerIndex: 2 },
      { question: "Orwell's 'A Vocabulary' was for:", options: ["Political theory.", "Scientific research.", "Everyday life and physical work.", "Religious services."], answerIndex: 2 }
    ],
    deliverablePrompt: "CLAIM: 'If we can't name it, we can't know it.' COUNTER: Give an example of a time you felt something strongly but didn't have a word for it. Did that make the 'knowledge' less real?"
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "Animacy Grove",
    coreIdea: "The Grammar of Animacy and Ethics.",
    difficultyDC: 9,
    readingSource: "Robin Wall Kimmerer, 'Braiding Sweetgrass'",
    reading: `Robin Wall Kimmerer, a botanist and member of the Citizen Potawatomi Nation, discusses the profound difference between English grammar and Indigenous grammars regarding the natural world. In English, we use the pronoun 'it' for almost everything that isn't human. A tree is an 'it'. A mountain is an 'it'. A bird is an 'it'. 

    In English, the only way to grant a non-human being the status of 'someone' is to personify it, often in a way that feels unscientific. However, in Potawatomi, the word for 'bay' is a verb: 'to be a bay'. A bay is not a static object (a noun); it is a living process (a verb). The world is divided into animate and inanimate, but the circle of animacy is much wider than in English. Most of the natural world is spoken of as 'persons'.

    Kimmerer argues that this 'Grammar of Animacy' creates a moral relationship. If you speak of a tree as a person (a 'who'), you have a moral obligation to it. If you speak of it as an 'it' (an object), you have no obligation. You can cut down an 'it' without guilt. You cannot kill a 'who' without a profound sense of reciprocity.

    This station asks: How does the grammar of our language structure our Ethics? If we treat the Earth as a 'collection of objects' (nouns), our knowledge will be one of exploitation. If we treat it as a 'communion of subjects' (verbs), our knowledge becomes one of stewardship.`,
    youtubeId: "yB2S_S-kS30",
    x: 40, y: 15,
    fuelCost: 10, rationCost: 3,
    neighbors: [StationId.RELATIVITY, StationId.ENDANGERED],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Look at a plant near you. Try describing it using only verbs (e.g., 'it is greening', 'it is breathing'). How does your feeling toward the plant change?",
    mcqs: [
      { question: "In Potawatomi, a 'bay' is grammatically treated as a:", options: ["Noun (Object)", "Verb (Action/Process)", "Adjective (Description)", "Interjection"], answerIndex: 1 },
      { question: "Kimmerer argues that the pronoun 'it' does what to nature?", options: ["Respects it.", "Identifies it correctly.", "Objectifies and removes moral obligation.", "Makes science easier."], answerIndex: 2 },
      { question: "The 'Grammar of Animacy' suggests that:", options: ["Only humans are people.", "Plants are objects.", "The natural world is full of living 'subjects'.", "Language doesn't matter for ethics."], answerIndex: 2 }
    ],
    deliverablePrompt: "ETHICAL EVALUATION: If we changed all English biology textbooks so that animals were called 'Who' instead of 'It', how might that change the results of 'The Natural Sciences' as an Area of Knowledge?"
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "The Lens of Analogy",
    coreIdea: "Metaphor as a primary cognitive tool for understanding abstract concepts.",
    difficultyDC: 11,
    reading: "According to George Lakoff and Mark Johnson, our conceptual system is grounded in metaphor. We don't just use metaphors in speech; we think through them. Abstract domains like 'Time' or 'Argument' are understood via concrete physical experiences like 'Space' or 'War'. If 'Argument is War', we 'attack' positions and 'defend' claims. If 'Argument is Dance', the goal changes from victory to coordination.",
    x: 70, y: 15,
    fuelCost: 12, rationCost: 4,
    neighbors: [StationId.AI_MT, StationId.RELATIVITY],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Examine the metaphor 'Time is Money'. How does this specifically shape your behavior in a classroom versus a weekend?",
    mcqs: [
      { question: "Lakoff and Johnson suggest that metaphors are:", options: ["Purely literary.", "Fundamental to human cognition.", "Useless in science.", "Always deceptive."], answerIndex: 1 }
    ],
    deliverablePrompt: "Identify a metaphor used in your favorite subject (e.g., 'The Cell is a Factory'). If you replaced 'Factory' with 'Ecosystem', how would your knowledge of biology change?"
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "The Silent Library",
    coreIdea: "The epistemic loss associated with the extinction of diverse languages.",
    difficultyDC: 10,
    reading: "When a language goes extinct, a unique database of human knowledge vanishes. Indigenous languages often contain precise taxonomies for local flora, fauna, and ecological phenomena that Standard English misses. This is Traditional Ecological Knowledge (TEK). Loss of language is not just loss of communication, but loss of a specialized 'Knower's' perspective on the environment.",
    x: 60, y: 10,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.CREE, StationId.ORAL_TRADITION],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Look up 'Solastalgia'. Does this concept exist in your native language? If not, how do you describe the feeling of home being lost?",
    mcqs: [
      { question: "Traditional Ecological Knowledge (TEK) is often stored in:", options: ["Libraries.", "Digital databases.", "The vocabulary of indigenous languages.", "English textbooks."], answerIndex: 2 }
    ],
    deliverablePrompt: "ETHICAL EVALUATION: Should international science organizations fund language revitalization projects as a way to preserve biodiversity knowledge?"
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "The Silicon Translator",
    coreIdea: "Statistical probability versus human meaning in Large Language Models.",
    difficultyDC: 15,
    reading: "Machine Translation (MT) and LLMs operate on statistical associations between tokens. They lack 'Qualia'—the subjective experience of meaning. While an AI can translate the word 'Grief', it has never felt it. This raises a TOK question: Is language simply a data set to be processed, or is 'Meaning' an emergent property of conscious experience?",
    x: 85, y: 60,
    fuelCost: 25, rationCost: 6,
    neighbors: [StationId.METAPHOR, StationId.TRANSLATION, StationId.JARGON],
    scaffoldType: 'claim-counter',
    lessonPlan: "Use an AI to translate a complex poem. Compare it to a human translation. Where does the 'machine' fail?",
    mcqs: [
      { question: "Large Language Models process meaning through:", options: ["Consciousness.", "Statistical probability.", "Literal truth.", "Human soul."], answerIndex: 1 }
    ],
    deliverablePrompt: "CLAIM: AI translations are more 'objective' because they lack human bias. COUNTER: Give an example where missing a cultural 'feeling' makes an AI translation dangerously inaccurate."
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "The Professional Wall",
    coreIdea: "Jargon as both a tool for precision and a gatekeeper of authority.",
    difficultyDC: 12,
    reading: "Specialized language (Sociolects) creates a boundary. Inside the 'Wall', jargon allows experts to communicate complex ideas with high efficiency. Outside the 'Wall', jargon functions as an exclusionary mechanism, granting 'Epistemic Authority' only to those who speak the code. Is a doctor's knowledge 'better' simply because they use Latin terms for pain?",
    x: 90, y: 45,
    fuelCost: 15, rationCost: 4,
    neighbors: [StationId.NEWS_PEAK, StationId.AI_MT],
    scaffoldType: 'claim-counter',
    lessonPlan: "Identify 3 terms from a hobby you love that would make no sense to a stranger.",
    mcqs: [
      { question: "Jargon serves as a 'gatekeeper' when it:", options: ["Explains things clearly.", "Requires membership in a community to be understood.", "Is translated into slang.", "Is ignored by scientists."], answerIndex: 1 }
    ],
    deliverablePrompt: "CLAIM: Jargon is necessary for scientific progress. COUNTER: How might jargon prevent the public from holding powerful experts accountable?"
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "The Honorific Labyrinth",
    coreIdea: "How grammar enforces and reflects social hierarchy.",
    difficultyDC: 11,
    reading: "In languages like Japanese (Keigo) or Korean (Jondaemal), hierarchy is encoded into verbs and nouns. You literally cannot form a sentence without first evaluating your social position relative to the listener. This differs from English, where politeness is often optional 'flavoring'. In honorific-heavy languages, the structure of the language itself maintains the social order.",
    x: 75, y: 50,
    fuelCost: 12, rationCost: 3,
    neighbors: [StationId.NEWS_PEAK, StationId.HUMOR],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Try to speak to your parents in the same casual way you speak to friends. Why does it feel 'wrong' grammatically?",
    mcqs: [
      { question: "Keigo is a system where hierarchy is:", options: ["Hidden.", "Encoded into the grammar.", "Optional.", "Only used by the military."], answerIndex: 1 }
    ],
    deliverablePrompt: "If a language makes it impossible to speak 'levelly' to an elder, does that make a truly democratic 'Equality' harder to achieve in that culture?"
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Semantic Slip",
    coreIdea: "Humor as the ultimate test of cultural and linguistic fluency.",
    difficultyDC: 10,
    reading: "Humor often relies on 'Incongruity'—the subversion of linguistic expectations. Pun-based humor depends on the phonetic accidents of a specific language. When we 'explain' a joke, the humor dies because the knowledge was based on the visceral 'click' of the subversion, not the logical propositional content.",
    x: 60, y: 80,
    fuelCost: 10, rationCost: 3,
    neighbors: [StationId.TRANSLATION, StationId.POLITENESS],
    scaffoldType: 'standard',
    lessonPlan: "Find a joke in your native language that uses a pun. Attempt to translate the pun. What happens to the 'funny'?",
    mcqs: [
      { question: "The 'Incongruity Theory' of humor suggests we laugh at:", options: ["Things that are sad.", "The subversion of expectations.", "Loud noises.", "Grammar mistakes only."], answerIndex: 1 }
    ],
    deliverablePrompt: "Why is 'getting a joke' considered a higher form of linguistic knowledge than just knowing vocabulary?"
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "The Tabula Rasa",
    coreIdea: "Universal Grammar and the innate structures of language.",
    difficultyDC: 10,
    reading: "Noam Chomsky famously proposed 'Universal Grammar'—the idea that humans are born with a 'Language Acquisition Device' (LAD). This suggests that we don't just 'copy' language, we 'grow' it from internal biological rules. This challenges the idea that all knowledge comes from experience (Empiricism) versus innate structure (Rationalism).",
    x: 10, y: 40,
    fuelCost: 8, rationCost: 2,
    neighbors: [StationId.RELATIVITY, StationId.ORAL_TRADITION],
    scaffoldType: 'claim-counter',
    lessonPlan: "Observe how children say 'I goed' instead of 'I went'. What does this tell us about their knowledge of rules?",
    mcqs: [
      { question: "Chomsky's LAD suggests language is:", options: ["Wholly learned.", "Innate and biological.", "A computer program.", "Unrelated to the brain."], answerIndex: 1 }
    ],
    deliverablePrompt: "CLAIM: We are born as 'blank slates' (Tabula Rasa). COUNTER: How do infants learn the complex rules of grammar so much faster than they learn simple tasks like tying shoes?"
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Living Archive",
    coreIdea: "The reliability and fluidity of non-written knowledge systems.",
    difficultyDC: 13,
    reading: "Oral tradition is often dismissed as 'unreliable' by literate cultures. However, oral cultures use sophisticated mnemonics, song, and dance to ensure high-fidelity transmission of history and law. Unlike a 'dead' book, oral knowledge is 'living'—it must be performed and validated by the community in real-time to survive.",
    x: 30, y: 85,
    fuelCost: 18, rationCost: 5,
    neighbors: [StationId.TRANSLATION, StationId.ACQUISITION, StationId.ENDANGERED],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Tell a story to a friend, who tells it to another. How much 'Knowledge' is lost versus how much 'Meaning' is preserved?",
    mcqs: [
      { question: "Oral traditions rely on:", options: ["Digital storage.", "Written records.", "Performance and communal validation.", "Ignoring the past."], answerIndex: 2 }
    ],
    deliverablePrompt: "Does the act of writing down an oral history 'kill' its true meaning by freezing it in a single interpretation?"
  }
};
