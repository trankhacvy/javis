import { Command } from "@src/types";

const EditOrReviewCommands: Command[] = [
  {
    icon: "Wand",
    name: "Improve writing",
    group: "Edit or review selection",
    needSelection: true,
    template:
      "Replace the simplified A0-level words and sentences in the following paragraph with more beautiful and elegant, upper-level English words and sentences. Keep the meaning the same, but make them more literary. The paragraph is: {text}",
    keys: ["text"],
  },
  {
    icon: "Check",
    name: "Fix spelling & grammar",
    group: "Edit or review selection",
    needSelection: true,
    template:
      "Strictly correct my grammar mistakes, typos, and factual errors. My sentence is: {text}",
    keys: ["text"],
  },
  {
    icon: "SignalLow",
    name: "Make shorter",
    group: "Edit or review selection",
    needSelection: true,
    template:
      "Please rephrase the sentence with a shorter length, ensuring that the meaning remains unchanged. The sentence is: {text}",
    keys: ["text"],
  },
  {
    icon: "SignalHigh",
    name: "Make longer",
    group: "Edit or review selection",
    needSelection: true,
    template:
      "Please rephrase the sentence with a longer length, ensuring that the meaning remains unchanged. The sentence is: {text}",
    keys: ["text"],
  },
  {
    icon: "Mic2",
    name: "Change tone to",
    group: "Edit or review selection",
    needSelection: true,
    template:
      "Rephrase the following sentence in a more {tone} tone, ensuring that the meaning remains unchanged. The sentence is: {text}",
    keys: ["tone", "text"],
    options: [
      { text: "Professional", prompt: "professional" },
      { text: "Casual", prompt: "casual" },
      { text: "Straightforward", prompt: "straightforward" },
      { text: "Confident", prompt: "confident" },
      { text: "Friendly", prompt: "friendly" },
    ],
  },
  {
    icon: "Box",
    name: "Simplify language",
    group: "Edit or review selection",
    needSelection: true,
    template:
      "Please simplify the following paragraph, ensuring that the meaning remains unchanged: {text}",
    keys: ["text"],
  },
];

const GenerateFromSelectionCommands: Command[] = [
  {
    icon: "ListOrdered",
    name: "Summarize",
    group: "Generate from selection",
    needSelection: true,
    template:
      "Please summarize the following paragraph, the summary should be informative, factual and in the same language as the paragraph, covering the most important aspects of the paragraph. Start the summary with an introductory paragraph that gives an overview of the paragraph. The paragraph is {text}",
    keys: ["text"],
  },
  {
    icon: "Languages",
    name: "Translate",
    group: "Generate from selection",
    needSelection: true,
    template:
      "Translate the following paragraph to the corrected and improved version of my text, in {language}. Keep the meaning same, but make them more literary. The paragraph is: {text}",
    keys: ["language", "text"],
    options: [
      { text: "English", prompt: "English" },
      { text: "Chinese", prompt: "Chinese" },
      { text: "Spanish", prompt: "Spanish" },
      { text: "French", prompt: "French" },
      { text: "Arabic", prompt: "Arabic" },
      { text: "Russian", prompt: "Russian" },
      { text: "Portuguese", prompt: "Portuguese" },
      { text: "Indonesian", prompt: "Indonesian" },
      { text: "Japanses", prompt: "Japanses" },
      { text: "Vietnamese", prompt: "Vietnamese" },
    ],
  },
  {
    icon: "HelpCircle",
    name: "Explain this",
    group: "Generate from selection",
    needSelection: true,
    template:
      "Explain the following paragraph in an easy-to-understand manner. This could include providing examples, posing questions or breaking down complex ideas into smaller pieces that are easier to comprehend. The paragraph is: {text}",
    keys: ["text"],
  },
];

const SuggestionCommands: Command[] = [
  {
    icon: "BrainCog",
    name: "Brainstorm ideas...",
    prompt: "Brainstorm ideas on",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PenTool",
    name: "Blog post...",
    prompt: "Write a blog post about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "LayoutList",
    name: "Outline...",
    prompt: "Write an outline about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "Facebook",
    name: "Facebook post...",
    prompt: "Write a facebook post about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "Twitter",
    name: "Twitter tweet...",
    prompt: "Write a tweet about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PenTool",
    name: "Press release...",
    prompt: "Write a press release about ",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PartyPopper",
    name: "Creative story...",
    prompt: "Write a creative story about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PenTool",
    name: "Essay...",
    prompt: "Write an essay about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PenTool",
    name: "Poem...",
    prompt: "Write a poem about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "ListChecks",
    name: "To-do list...",
    prompt: "Write a todo list about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "Calendar",
    name: "Meeting agenda...",
    prompt: "Write a meeting agenda about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PenTool",
    name: "Pros and cons list...",
    prompt: "Write a pros and cons list about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PenTool",
    name: "Job description...",
    prompt: "Write a job description about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "Mail",
    name: "Sales email...",
    prompt: "Write a sales email about",
    group: "Draft with AI",
    needSelection: false,
  },
  {
    icon: "PenTool",
    name: "Recruiting email...",
    prompt: "Write a recruiting email about",
    group: "Draft with AI",
    needSelection: false,
  },
];

export const commandList = [
  ...EditOrReviewCommands,
  ...GenerateFromSelectionCommands,
  ...SuggestionCommands,
];
