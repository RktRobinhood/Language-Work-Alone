
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
    readingSource: "Benjamin Lee Whorf / Academic Summary",
    reading: `The Sapir-Whorf hypothesis represents a cornerstone of linguistic anthropology, positing that the language we speak fundamentally shapes our cognitive processes. Edward Sapir, a mentor to Whorf, argued that 'the real world is to a large extent unconsciously built up on the language habits of the group.' Whorf expanded this into what he termed 'Linguistic Relativity.' 

A central example in Whorf’s work involves the Hopi language. He observed that Hopi lacks the 'tensed' structure prevalent in Standard Average European (SAE) languages, which categorize time into past, present, and future. Instead, Hopi grammar distinguishes between 'manifest' (what has happened or is happening) and 'unmanifest' (what is expected, imagined, or felt). Whorf argued this suggests a universe that is not a collection of static objects moving through time, but a dynamic, unfolding process.

Modern cognitive linguistics has moved away from 'Strong Determinism'—the idea that language acts as an unbreakable cage for thought. If that were true, translation or the learning of new concepts would be impossible. However, 'Weak Relativity' remains highly supported. Research by Lera Boroditsky has shown that speakers of Kuuk Thaayorre, an Australian Aboriginal language that uses cardinal directions (North, South) instead of egocentric ones (Left, Right), possess an extraordinary sense of spatial orientation. Even in windowless rooms, they know exactly where North is, because their language requires them to track it constantly to communicate simple ideas like 'the cup is on your North-East side.' 

This raises a profound Theory of Knowledge question: To what extent does our linguistic framework act as a 'lens' that filters sensory data before it even reaches our conscious reasoning? If we lack a word for a specific nuance of emotion or a category of color, does that nuance exist in our experienced reality in the same way it does for a speaker of another language?`,
    youtubeId: "RKK7wGAYP6k",
    x: 12, y: 15,
    fuelCost: 8, rationCost: 2,
    neighbors: [StationId.ACQUISITION, StationId.CREE],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Evaluate how cardinal direction-based languages might change a culture's concept of 'self' in relation to the universe.",
    mcqs: [
      { question: "Why is 'Strong Determinism' largely rejected today?", options: ["It was never written down properly", "It ignores the role of math", "It suggests humans are incapable of learning new concepts without existing words", "It is considered too poetic"], answerIndex: 2 },
      { question: "What is the primary distinction in Hopi grammar according to Whorf?", options: ["Manifest vs Unmanifest", "Subject vs Object", "Past vs Future", "Noun vs Verb"], answerIndex: 0 },
      { question: "Kuuk Thaayorre speakers have high spatial awareness because:", options: ["They are born with better inner ears", "They use GPS technology", "They live in flat areas", "Their language forces them to use cardinal directions constantly"], answerIndex: 3 }
    ],
    deliverablePrompt: "How would your perception of a 'deadline' change if your language only allowed you to describe it as an 'Unmanifest Intention' rather than a 'Future Point on a Line'?"
  },
  [StationId.TRANSLATION]: {
    id: StationId.TRANSLATION,
    title: "The Bridge of Sighs",
    coreIdea: "The Epistemology of Translation.",
    readingSource: "Biblical & Philosophical Texts",
    reading: `Translation is fundamentally an act of hermeneutics—the science of interpretation. To translate is not merely to find equivalents, but to negotiate between two distinct systems of meaning. This is most visible in the translation of foundational philosophical or religious texts, where a single word carries centuries of conceptual baggage.

Consider the Gospel of John’s opening: 'In the beginning was the Logos.' The term 'Logos' in Greek philosophy refers to reason, proportion, the ground of being, and discourse. In Latin, it was translated as 'Verbum' (Word), which narrowed the meaning significantly. When Christian missionaries first reached China, they faced a choice: translate 'Logos' into a phonetic approximation, or use an existing Chinese concept. Many chose 'Dao' (The Way). While 'Dao' captures the sense of a fundamental cosmic principle, it brings with it the context of Taoism—a philosophy of flow and non-interference that differs sharply from the Greek 'Logos' as a structured, rational blueprint.

Another example is the concept of 'Spirit' vs 'Ghost' vs 'Soul.' In many African languages, the distinction between a living soul, an ancestral spirit, and a malevolent ghost is governed by specific grammatical markers of proximity and respect. Translating these into a 'neutral' English equivalent often results in 'epistemic flattening,' where the unique indigenous ontology is erased in favor of a Western paradigm.

For the multi-lingual knower, translation is an exercise in identifying 'semantic leaks.' No two words ever cover the exact same ground. The French 'ennui' is not just 'boredom'; it is a philosophical weariness. The Japanese 'mottainai' is not just 'waste'; it is a regret that the spirit of an object was not respected.

SOURCE TEXT FOR EXERCISE (Tao Te Ching):
'The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.'
Analyze the word 'Eternal'. In some languages, 'Eternal' implies 'infinite duration of time', while in others it implies 'existing outside of time entirely'.`,
    x: 40, y: 80,
    fuelCost: 12, rationCost: 3,
    neighbors: [StationId.AI_MT, StationId.HUMOR, StationId.ORAL_TRADITION],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Examine a core concept in your native language (L1) and attempt to find its exact equivalent in English (L2). Identify the 'residual meaning' that is lost.",
    mcqs: [
      { question: "What happened when 'Logos' was translated as 'Dao'?", options: ["The text became unreadable", "The meaning was perfectly preserved", "It adopted the conceptual baggage of Taoism", "It was a phonetic match"], answerIndex: 2 },
      { question: "Epistemic flattening refers to:", options: ["The loss of unique cultural ontological distinctions during translation", "Improving translation speed", "Correcting grammar errors", "The invention of new words"], answerIndex: 0 },
      { question: "Why is 'Mottainai' difficult to translate as just 'waste'?", options: ["It refers to toxic waste specifically", "It implies a spiritual regret for the object's essence", "It is a longer word", "It is a slang term"], answerIndex: 1 }
    ],
    deliverablePrompt: "Translate the provided Tao Te Ching excerpt into your other native language. Identify one word in your translation that feels 'heavier' or 'lighter' than the English version and explain why."
  },
  [StationId.NEWS_PEAK]: {
    id: StationId.NEWS_PEAK,
    title: "Control Tower 1984",
    coreIdea: "Linguistic Engineering and Political Power.",
    readingSource: "George Orwell, 1984 / Critical Analysis",
    reading: `In George Orwell's '1984,' the fictional language 'Newspeak' serves as a chilling thought experiment in linguistic determinism. The aim of Newspeak was not merely to provide a medium of expression for the Party’s ideology, but to make all other modes of thought impossible. Orwell writes in the appendix: 'It was intended that when Newspeak had been adopted once and for all and Oldspeak forgotten, a heretical thought... should be literally unthinkable.'

Newspeak achieves this through a radical reduction of vocabulary. Words like 'freedom' were not abolished, but their meanings were stripped of any political or intellectual nuance. 'Freedom' could only be used in the sense of 'The field is free from weeds.' By removing the conceptual architecture for dissent (words like 'honor,' 'justice,' 'morality'), the Party aimed to limit the range of human consciousness itself.

This highlights the relationship between language and power. In the real world, this is often called 'Framing' or 'Doublespeak.' When a government replaces 'civilian casualties' with 'collateral damage,' it is using language to sanitize reality. The term 'collateral' suggests a secondary, accidental effect, distancing the knower from the visceral reality of death. Similarly, terms like 'enhanced interrogation' instead of 'torture' are linguistic tools designed to allow a community of knowers to accept actions they would otherwise find abhorrent.

This brings us to a TOK question: If we lose the words to describe an injustice, does our capacity to recognize and resist that injustice diminish? Or is human thought resilient enough to exist in the 'gaps' between words?`,
    youtubeId: "ovS_W9_8k5s",
    x: 80, y: 15,
    fuelCost: 15, rationCost: 4,
    neighbors: [StationId.JARGON, StationId.POLITENESS],
    scaffoldType: 'claim-counter',
    lessonPlan: "Analyze how modern 'Corporate Speak' functions as a form of Newspeak.",
    mcqs: [
      { question: "The primary goal of Newspeak was to:", options: ["Encourage poetry", "Make communication faster", "Standardize spelling", "Restrict the range of human thought"], answerIndex: 3 },
      { question: "How does 'Collateral Damage' function as doublespeak?", options: ["It sanitizes the reality of civilian death", "It is more accurate", "It is a technical term used by doctors", "It is easier to translate"], answerIndex: 0 },
      { question: "According to Orwell, a 'heretical thought' becomes impossible because:", options: ["Everyone agrees with the Party", "People are too happy", "The words to express it no longer exist", "Punishment is too severe"], answerIndex: 2 }
    ],
    deliverablePrompt: "CLAIM: 'Human thought is limited by the vocabulary available to the thinker.' COUNTER: Provide an example of how a person might 'feel' or 'know' a truth even if they lack the precise word for it."
  },
  [StationId.CREE]: {
    id: StationId.CREE,
    title: "The Animacy Grove",
    coreIdea: "Grammar as an Ethical Framework.",
    readingSource: "Robin Wall Kimmerer, 'Braiding Sweetgrass'",
    reading: `Robin Wall Kimmerer, a botanist and member of the Citizen Potawatomi Nation, describes how the grammar of English and the grammar of Indigenous languages create different ethical relationships with the natural world. In English, we use the pronoun 'it' for almost everything that isn't human. A tree is an 'it.' A rock is an 'it.' A bay is an 'it.' In English, only humans (and sometimes beloved pets) are granted the status of 'being.'

In Potawatomi, however, the world is divided into animate and inanimate, but the circle of animacy is much wider. Most of the natural world is animate. There is no word for 'it' when referring to a living being. Instead of saying 'The bay is beautiful,' one might use a verb form that translates to 'to be a bay.' The bay is an action, a presence, a subject. 

Kimmerer argues that the 'Grammar of Animacy' creates a moral obligation. If you treat a tree as an 'it,' you grant yourself permission to exploit it as a mere resource. But if the tree is a 'who,' a member of your moral community, your relationship changes from exploitation to reciprocity. You cannot simply 'take' from a 'who' without asking or giving back.

This is a profound example of how language structures our knowledge of Ethics. If our language categorizes the earth as a 'collection of objects,' our science will be one of extraction. If our language categorizes the earth as a 'communion of subjects,' our science must become one of stewardship.`,
    youtubeId: "yB2S_S-kS30",
    x: 35, y: 22,
    fuelCost: 12, rationCost: 3,
    neighbors: [StationId.RELATIVITY, StationId.POLITENESS, StationId.ENDANGERED],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Contrast the 'Resource-based' language of modern economics with the 'Relational' language of indigenous ecology.",
    mcqs: [
      { question: "In Potawatomi, a 'bay' is often described as:", options: ["A noun", "A type of property", "A verb (to be a bay)", "A spiritual ghost"], answerIndex: 2 },
      { question: "The 'Grammar of Animacy' suggests that:", options: ["Nature is a machine", "Language creates a moral relationship with the world", "All things should be capitalized", "Only humans can speak"], answerIndex: 1 },
      { question: "Using 'it' for a tree is an example of:", options: ["Precision", "Scientific neutrality", "Grammatical necessity", "Objectification"], answerIndex: 3 }
    ],
    deliverablePrompt: "ETHICAL EVALUATION: How does the scientific study of an ecosystem change if the researcher views the organisms as 'Subjects' rather than 'Objects of Study'?"
  },
  [StationId.METAPHOR]: {
    id: StationId.METAPHOR,
    title: "Metaphoric Junction",
    coreIdea: "Conceptual Metaphor Theory.",
    readingSource: "Lakoff & Johnson, 'Metaphors We Live By'",
    reading: `George Lakoff and Mark Johnson revolutionized linguistics by arguing that metaphor is not just a literary device, but the very fabric of human thought. We don't just speak in metaphors; we *think* in them. This is 'Conceptual Metaphor Theory.'

Take the metaphor 'Argument is War.' This is reflected in our everyday language: 'He *attacked* every weak point in my argument,' 'His criticisms were *right on target*,' 'I *demolished* his claim.' Because we use this metaphor, we view the person we are arguing with as an opponent. The goal is to win. 

But what if the metaphor was 'Argument is Dance'? The goal would be to perform a balanced, aesthetic, and collaborative movement. In such a culture, a 'good' argument wouldn't be one where someone was defeated, but one where a beautiful synthesis was reached.

Metaphors are essential for understanding abstract concepts. We map 'Concrete Source Domains' onto 'Abstract Target Domains.' For example, 'Time is Money' (You're *wasting* my time, I've *invested* weeks in this). This metaphor is specific to industrialized, capitalist societies. In other cultures, time might be 'A River' or 'A Circle,' which would lead to completely different behaviors and knowledge systems regarding productivity and history.`,
    youtubeId: "hP0_idXWj60",
    x: 55, y: 10,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.JARGON, StationId.AI_MT, StationId.POLITENESS],
    scaffoldType: 'concept-map',
    lessonPlan: "Identify the primary metaphors used in the Area of Knowledge of 'The Natural Sciences' (e.g., 'The Brain is a Computer').",
    mcqs: [
      { question: "According to Lakoff, metaphors map ___ to ___.", options: ["Words to Sounds", "Concrete Sources to Abstract Targets", "Past to Future", "Subject to Object"], answerIndex: 1 },
      { question: "If 'Argument is Dance', the participants would likely:", options: ["Focus on collaboration and balance", "Try to win at all costs", "Stop talking", "Use weapons"], answerIndex: 0 },
      { question: "The 'Time is Money' metaphor is most common in:", options: ["Agricultural societies", "Nomadic tribes", "Industrialized capitalist societies", "Ancient civilizations"], answerIndex: 2 }
    ],
    deliverablePrompt: "CONCEPT MAP: List three metaphors used in the study of 'The Human Sciences' (e.g. 'Social Fabric'). Explain what each metaphor highlights and what it hides."
  },
  [StationId.ENDANGERED]: {
    id: StationId.ENDANGERED,
    title: "The Silent Archive",
    coreIdea: "Language Extinction and Knowledge Loss.",
    readingSource: "UNESCO / Linguistic Diversity Report",
    reading: `Linguists estimate that every two weeks, the last speaker of a language dies. With that death, an entire encyclopedia of traditional knowledge, oral history, and unique ways of seeing the world vanishes. This is often called 'Linguistic Erosion.'

Indigenous languages often contain highly specific 'Traditional Ecological Knowledge' (TEK). For example, a language in the Amazon might have 50 different words for different stages of a specific medicinal plant's growth—nuances that English, with its broader categories, would miss. If the language is lost, the scientific knowledge of that plant’s properties, developed over millennia, is effectively 'erased' from the global database of human knowledge.

Furthermore, language death is often a result of 'Linguistic Imperialism,' where dominant languages displacement local tongues due to economic and political pressure. This creates a 'Monoculture of the Mind,' where diversity of thought is reduced. As Wade Davis famously said, 'A language is not just a body of vocabulary or a set of grammatical rules. A language is a flash of the human spirit.'

From a TOK perspective, we must ask: Is knowledge 'universal,' or is it tied to the language in which it was discovered? Can the 'Traditional Ecological Knowledge' of a lost language ever be fully recovered via translation into a dominant language, or is some part of that knowledge inherently untranslatable?`,
    x: 50, y: 40,
    fuelCost: 10, rationCost: 3,
    neighbors: [StationId.CREE, StationId.ORAL_TRADITION],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Investigate a case study of a 'Revitalized' language (like Hebrew or Welsh) and the impact on the community's sense of identity.",
    mcqs: [
      { question: "What is 'Traditional Ecological Knowledge' (TEK)?", options: ["Modern farming techniques", "Knowledge of local environments stored in indigenous languages", "The study of old books", "A type of computer code"], answerIndex: 1 },
      { question: "Linguistic Imperialism refers to:", options: ["Learning many languages", "The displacement of local languages by dominant ones", "The study of Latin", "Building bigger libraries"], answerIndex: 1 },
      { question: "Why is language loss compared to 'burning a library'?", options: ["It represents the permanent loss of unique human knowledge", "It is physically dangerous", "It is very loud", "It is a metaphor for climate change"], answerIndex: 0 }
    ],
    deliverablePrompt: "ETHICAL EVALUATION: Should the international community spend billions of dollars to save a language spoken by only 10 people? Justify your position using TOK concepts like 'Cultural Heritage' and 'Epistemic Diversity'."
  },
  [StationId.AI_MT]: {
    id: StationId.AI_MT,
    title: "Silicon Translator",
    coreIdea: "Algorithmic Bias in Translation.",
    readingSource: "AI Ethics / Computational Linguistics",
    reading: `Machine Translation (MT) systems like Google Translate or DeepL do not 'understand' language the way humans do. Instead, they use Large Language Models (LLMs) to predict the most likely sequence of words based on statistical patterns found in massive datasets. While this allows for incredible speed, it also leads to the 'Mirroring of Bias.'

If an AI is trained on historical texts where most doctors are male and most nurses are female, it will likely translate a gender-neutral sentence from Turkish (which uses the same pronoun for 'He' and 'She') into English as 'He is a doctor' and 'She is a nurse.' This is not a logical necessity, but a statistical reflection of existing societal prejudices.

This creates a 'Feedback Loop of Knowledge.' As more and more content on the internet is generated or translated by AI, these biases become solidified as 'The Standard.' The AI doesn't just reflect the world; it begins to shape the world's perception of what is 'normal' or 'standard.' 

This raises a critical TOK question: If our primary tool for accessing global knowledge (translation) is fundamentally biased, how can we ever achieve a neutral or objective understanding of other cultures? Is 'Statistical Truth' the same as 'Conceptual Truth'?`,
    x: 70, y: 50,
    fuelCost: 14, rationCost: 2,
    neighbors: [StationId.METAPHOR, StationId.TRANSLATION],
    scaffoldType: 'ethical-eval',
    lessonPlan: "Test a translation tool with gender-neutral languages and analyze the gendered outputs for different professions.",
    mcqs: [
      { question: "Modern AI translation works primarily by:", options: ["Using a digital dictionary", "Analyzing statistical patterns in large datasets", "Understanding human emotions", "Reading the user's mind"], answerIndex: 1 },
      { question: "Why might an AI translate 'The doctor' as 'He'?", options: ["It is a random guess", "The training data contains more examples of male doctors", "It is a grammatical rule", "It is being intentionally sexist"], answerIndex: 1 },
      { question: "The 'Feedback Loop of Knowledge' means:", options: ["AI gets faster over time", "Users provide better feedback", "The internet is growing", "AI-generated biases become the new standard for human data"], answerIndex: 3 }
    ],
    deliverablePrompt: "ETHICAL EVALUATION: If an AI translation tool is 99% accurate but reinforces harmful stereotypes, is it better to use it or to wait for a human translator? Consider the trade-off between efficiency and epistemic justice."
  },
  [StationId.JARGON]: {
    id: StationId.JARGON,
    title: "The Tower of Babel",
    coreIdea: "Professional Jargon and Exclusivity.",
    readingSource: "Sociology of Science / Academic Writing",
    reading: `Every community of knowers—be they particle physicists, jazz musicians, or skateboarders—develops its own specialized language, or 'Jargon.' Jargon serves two primary epistemic functions: precision and group identity.

Within a field like Law, specific terms like 'Habeas Corpus' carry precise meanings that would require paragraphs of everyday language to explain. This allows experts to communicate with extreme efficiency. However, the same language acts as a 'Gatekeeper.' Those who do not speak the jargon are excluded from the conversation, even if the topic directly affects them.

This creates an 'Asymmetry of Knowledge.' If a doctor uses highly technical medical jargon to explain a diagnosis, the patient may 'know' the facts but not 'understand' the implications. The language itself creates a power dynamic where the expert holds the keys to understanding.

Furthermore, jargon can sometimes be used to obfuscate—to make simple things sound complex to create an aura of authority. This is often seen in 'Academic Prose,' where thinkers use dense, impenetrable language to protect their ideas from easy criticism. As Karl Popper argued, 'The aim of the scientist is not to discover absolute truth, but to make his ideas as clear and as falsifiable as possible.' Jargon often does the opposite.`,
    x: 85, y: 35,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.METAPHOR, StationId.NEWS_PEAK],
    scaffoldType: 'concept-map',
    lessonPlan: "Translate a complex paragraph from a TOK textbook into 'Plain English' and evaluate what is lost in terms of precision.",
    mcqs: [
      { question: "The primary 'internal' benefit of jargon is:", options: ["To sound smarter", "Precision and efficiency within the expert community", "To save ink", "To confuse competitors"], answerIndex: 1 },
      { question: "How does jargon act as a 'Gatekeeper'?", options: ["It excludes non-experts from participating in the discourse", "It is hard to spell", "It is only used in libraries", "It is very expensive to learn"], answerIndex: 0 },
      { question: "According to Karl Popper, good academic writing should be:", options: ["Dense and impressive", "As clear and falsifiable as possible", "Written in Latin", "Full of metaphors"], answerIndex: 1 }
    ],
    deliverablePrompt: "CONCEPT MAP: Identify a term from your favorite subject (e.g. 'Opportunity Cost' in Econ, 'Mitosis' in Bio). Explain how this term is a 'tool' for experts but a 'wall' for beginners."
  },
  [StationId.POLITENESS]: {
    id: StationId.POLITENESS,
    title: "Honorific Hall",
    coreIdea: "Social Hierarchy in Language.",
    readingSource: "Sociolinguistics / Japanese Studies",
    reading: `Many languages, particularly in East Asia, have mandatory 'Honorific' systems. In Japanese (Keigo) or Korean, it is impossible to speak a basic sentence without first determining the social relationship between you and the listener. You must choose a verb ending that reflects your relative age, status, and level of intimacy.

This means that social hierarchy is not just a cultural 'topic'; it is a grammatical 'requirement.' In these languages, you cannot speak 'neutrally.' Every utterance reinforces a specific social structure. This has a profound impact on how knowledge is shared. In a corporate or academic setting, a junior person may find it grammatically difficult to directly contradict a senior person, because the language of 'contradiction' is inherently tied to the language of 'status.'

Contrast this with 'Egalitarian' languages like modern English, which have largely moved away from formal distinctions (like the old 'Thou' vs 'You'). While English speakers still use polite phrases, the hierarchy is not embedded in the verbs themselves. 

This raises a TOK question: Does a language with a strong honorific system make it harder for a community to challenge authority and discover new truths (which often requires 'killing the father' or proving experts wrong)? Or does it provide a more stable and respectful framework for the transmission of established knowledge?`,
    x: 60, y: 25,
    fuelCost: 8, rationCost: 2,
    neighbors: [StationId.CREE, StationId.METAPHOR, StationId.NEWS_PEAK],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Reflect on how you address your teachers in your different languages. Compare the level of 'epistemic authority' granted by the language itself.",
    mcqs: [
      { question: "What is 'Keigo' in Japanese?", options: ["A type of food", "A mandatory honorific system used to show status", "A modern slang", "A musical style"], answerIndex: 1 },
      { question: "In a hierarchical language, a 'neutral' sentence is:", options: ["Often grammatically impossible", "Common", "Mandatory for everyone", "Used only by children"], answerIndex: 0 },
      { question: "How might honorifics affect the sharing of new ideas?", options: ["They make it faster", "They have no effect", "They may discourage juniors from contradicting seniors", "They require better memory"], answerIndex: 2 }
    ],
    deliverablePrompt: "PERSPECTIVE SHIFT: Imagine a laboratory where the lead scientist must be addressed with extreme honorifics. How might this language prevent a lab assistant from pointing out a mistake in the data?"
  },
  [StationId.HUMOR]: {
    id: StationId.HUMOR,
    title: "The Pun-derdome",
    coreIdea: "Untranslatability and Culture.",
    readingSource: "Cognitive Psychology of Humor",
    reading: `Humor is often described as the 'Final Frontier' of translation. A joke that is uproariously funny in one language often becomes a confusing or boring statement when translated into another. This is because humor relies on 'Incongruity Resolution'—the brain's ability to resolve two conflicting meanings—which is often tied to specific linguistic ambiguities (puns) or deep cultural assumptions.

Puns rely on 'Homophony'—words that sound the same but mean different things. These are purely accidental features of a language's history. A pun in English about 'current events' (water/news) cannot be translated into French because 'current' (as in flow) and 'current' (as in present time) are different words in French. The 'Knowledge' of the joke is tied to the 'Accident' of the language.

Beyond puns, humor relies on 'Cultural Context.' A joke about a specific political figure or a social taboo requires the listener to share a vast 'Community of Knowers.' If you have to explain a joke, the 'knowledge' is transferred, but the 'experience' (the laughter) is lost. 

This brings us to a TOK point: Is humor a form of knowledge? It reveals the 'boundaries' of a culture—the things we find ridiculous, the things we find forbidden, and the things we take for granted. To 'get' a joke is to prove you belong to a specific epistemic community.`,
    x: 20, y: 70,
    fuelCost: 10, rationCost: 2,
    neighbors: [StationId.TRANSLATION, StationId.ACQUISITION],
    scaffoldType: 'concept-map',
    lessonPlan: "Find a 'Bad Pun' in your native language and attempt to explain the linguistic logic behind it to someone who doesn't speak that language.",
    mcqs: [
      { question: "Homophony is essential for puns because it involves:", options: ["Words that mean the same thing", "Words that sound the same but mean different things", "Loud speaking", "Correct grammar"], answerIndex: 1 },
      { question: "Why does explaining a joke 'kill' it?", options: ["The cognitive resolution of the surprise is lost", "It takes too long", "It is considered rude", "People forget the start of the joke"], answerIndex: 0 },
      { question: "Humor is useful for knowers because it reveals:", options: ["Linguistic rules", "The cultural and epistemic boundaries of a community", "How to be a comedian", "Math errors"], answerIndex: 2 }
    ],
    deliverablePrompt: "CONCEPT MAP: Explain why a poem or a joke is often considered 'The Most Untranslatable' type of knowledge. What specifically is lost when the literal meaning is moved but the 'feeling' is not?"
  },
  [StationId.ACQUISITION]: {
    id: StationId.ACQUISITION,
    title: "The Cradle of Logic",
    coreIdea: "First Language Acquisition.",
    readingSource: "Chomsky vs Skinner / Psycholinguistics",
    reading: `How do we know how to speak? The debate between Noam Chomsky and B.F. Skinner represents one of the most famous clashes in the Human Sciences. 

Skinner, a behaviorist, argued that language acquisition is a matter of 'Nurture.' Children learn language through imitation, reinforcement, and association. If a child says 'Milk' and is given milk, the behavior is reinforced. It is a 'blank slate' theory of the mind.

Chomsky, however, pointed to the 'Poverty of the Stimulus.' He noted that children produce sentences they have never heard before. They don't just mimic; they deduce rules. If a child says 'I goed to the park,' they aren't mimicking (no adult says 'goed'); they are applying a rule they've deduced. Chomsky proposed a 'Language Acquisition Device' (LAD)—an innate, biological blueprint for 'Universal Grammar' that all humans are born with. 

This has massive TOK implications: Is our capacity for language (and thus complex thought) 'Innate Knowledge,' or is it 'Empirical Knowledge' derived from our environment? If Chomsky is right, there is a fundamental human 'sameness' beneath all our diverse languages. If Skinner is right, our minds are entirely the product of our culture.`,
    x: 10, y: 45,
    fuelCost: 8, rationCost: 2,
    neighbors: [StationId.RELATIVITY, StationId.HUMOR],
    scaffoldType: 'claim-counter',
    lessonPlan: "Evaluate the 'Feral Child' case studies (like Genie) and what they suggest about the 'Critical Period' for language acquisition.",
    mcqs: [
      { question: "Chomsky's 'Poverty of the Stimulus' argument means:", options: ["The language children hear is not enough to explain their rapid learning", "Children are too poor to learn", "Adults don't talk to children enough", "Languages are dying out"], answerIndex: 0 },
      { question: "If a child says 'I breaked it', they are demonstrating:", options: ["Stupidity", "Imitation of their parents", "Rule deduction (even if the rule is irregular)", "A lack of hearing"], answerIndex: 2 },
      { question: "Behaviorism suggests language is learned through:", options: ["Innate biological devices", "Reinforcement and imitation", "Reading books", "Magic"], answerIndex: 1 }
    ],
    deliverablePrompt: "CLAIM: 'Language is a biological instinct like breathing.' COUNTER: 'Language is a cultural tool like building a house.' Which claim has more evidence?"
  },
  [StationId.ORAL_TRADITION]: {
    id: StationId.ORAL_TRADITION,
    title: "The Echo Chamber",
    coreIdea: "Oral vs Written Knowledge.",
    readingSource: "Walter Ong, 'Orality and Literacy'",
    reading: `The move from an oral culture to a literate culture is not just a change in technology; it is a change in the way we 'know.' Walter Ong argued that 'Writing restructures consciousness.'

In primary oral cultures (where writing does not exist), knowledge must be 'memorable.' You cannot 'look something up.' Therefore, knowledge is stored in rhythmic, formulaic patterns—proverbs, stories, and songs. Knowledge is also 'Homeostatic'—the community only remembers what is currently relevant, and old, irrelevant information is naturally forgotten. Knowledge is lived and communal.

Writing, however, allows for 'Decontextualized' knowledge. A text can travel across time and space without the author. It allows for long, complex chains of logic that would be impossible to hold in memory. It also creates a 'Static Archive.' We can look back at what someone said 2000 years ago and prove they were 'wrong.' In an oral culture, the past is constantly being reshaped by the needs of the present.

This raises a TOK question: Does writing make us smarter, or just lazier (as Plato feared in the 'Phaedrus', arguing that writing would make us forgetful because we would rely on external marks instead of internal memory)? How does the medium of language (spoken vs written) change our verification process for what is 'True'?`,
    x: 25, y: 90,
    fuelCost: 15, rationCost: 5,
    neighbors: [StationId.ENDANGERED, StationId.TRANSLATION],
    scaffoldType: 'perspective-shift',
    lessonPlan: "Contrast the reliability of a 'Witness Account' in an oral tradition versus a 'Written Document' in a legal setting.",
    mcqs: [
      { question: "Why is knowledge 'Homeostatic' in oral cultures?", options: ["It is kept in a fridge", "The community only remembers what is currently useful", "It is written in stone", "It is very cold"], answerIndex: 1 },
      { question: "Plato's primary fear of writing was that:", options: ["It would be too expensive", "People would stop reading", "It would lead to bad poetry", "It would destroy human memory"], answerIndex: 3 },
      { question: "Writing allows for 'Decontextualized' knowledge because:", options: ["It is always true", "The message can exist without the presence of the author", "It is easier to understand", "It uses letters"], answerIndex: 1 }
    ],
    deliverablePrompt: "PERSPECTIVE SHIFT: How would your knowledge of 'History' change if you could only learn it from the elders of your village, rather than from a textbook?"
  }
};
