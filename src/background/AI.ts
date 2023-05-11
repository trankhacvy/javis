// import { BufferMemory } from "langchain/memory";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { ConversationChain } from "langchain/chains";
// import { CallbackManager } from "langchain/callbacks";
// import {
//   ChatPromptTemplate,
//   HumanMessagePromptTemplate,
//   MessagesPlaceholder,
//   SystemMessagePromptTemplate,
// } from "langchain/prompts";

// // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
// //   SystemMessagePromptTemplate.fromTemplate(
// //     "You are Javis, an AI Writing assistant designed to help people write better content in less time"
// //   ),
// //   SystemMessagePromptTemplate.fromTemplate(
// //     "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
// //   ),
// //   new MessagesPlaceholder("history"),
// //   HumanMessagePromptTemplate.fromTemplate(`
// //   {prompt}
// //   `),
// // ]);

// export class Javis {
//   private model: ChatOpenAI;
//   private chain: ConversationChain;
//   private memory: BufferMemory;
//   private controller: AbortController;

//   constructor(openAIApiKey: string) {
//     this.controller = new AbortController();

//     this.memory = new BufferMemory({
//       returnMessages: true,
//       memoryKey: "history",
//     });

//     this.model = new ChatOpenAI(
//       {
//         openAIApiKey,
//         streaming: true,
//       },
//       {
//         baseOptions: {
//           signal: this.controller.signal,
//         },
//       }
//     );

//     this.chain = new ConversationChain({
//       llm: this.model,
//       memory: this.memory,
//     });
//   }

//   async process(
//     template: string,
//     values?: Record<string, string>,
//     callbacks?: {
//       onNewToken: (token: string) => void;
//       onEnd: () => void;
//       onError: (error: any) => void;
//     }
//   ) {
//     console.log("process");
//     this.model.callbackManager = CallbackManager.fromHandlers({
//       handleLLMNewToken: async (token: string, verbose?: boolean) => {
//         callbacks?.onNewToken(token);
//       },
//       handleLLMEnd: async () => {
//         callbacks?.onEnd();
//       },
//       handleLLMError: async (error) => {
//         callbacks?.onError(error);
//       },
//     });

//     this.chain.prompt = ChatPromptTemplate.fromPromptMessages([
//       SystemMessagePromptTemplate.fromTemplate(
//         "You are Javis, an AI Writing assistant designed to help people write better content in less time"
//       ),
//       SystemMessagePromptTemplate.fromTemplate(
//         "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
//       ),
//       new MessagesPlaceholder("history"),
//       HumanMessagePromptTemplate.fromTemplate(template),
//     ]);

//     this.chain.call(values ?? {}).catch(console.error);
//   }

//   stop() {
//     if (this.controller && this.controller) {
//       this.controller.abort();
//     }
//   }
// }
