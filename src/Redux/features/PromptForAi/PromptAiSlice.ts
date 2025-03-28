import { createSlice } from "@reduxjs/toolkit";

export interface TPromptAction {
  finalPromptText: string ;
  outputText : string ;
  isProcessing : boolean ; 
  aiModel : string ;
}

const initialState: TPromptAction = {
  finalPromptText: '',
  outputText : '',
  isProcessing : false,
  aiModel : '',
};

const promptAiSlice = createSlice({
  name: "PromptAi",
  initialState,
  reducers: {
    addPromptText(state, action) {
      const systemPrompt = "You are a highly skilled AI assistant specializing in text processing and analysis. Provide clear, concise, and accurate responses.";

      const inputText = action.payload.inputText;
      // console.log(action.payload);

      switch (action.payload.actionType) {
        case 'summarize':
          state.finalPromptText =  `${systemPrompt}\nPlease provide a concise summary of the following text:\n\n${inputText}`;
          return ;
        case 'rephrase':
          state.finalPromptText =   `${systemPrompt}\nPlease rephrase the following text in a different way while maintaining its meaning:\n\n${inputText}`;
          return ; 
        case 'analyze':
          state.finalPromptText =  `${systemPrompt}\nPlease analyze the following text, including its tone, style, main themes, and key points:\n\n${inputText}`;
          return ;
        case 'grammar':
          state.finalPromptText =   `${systemPrompt}\nPlease check the grammar and style of the following text, pointing out any errors or suggestions for improvement:\n\n${inputText}`;
          return ;
        case 'keywords':
          state.finalPromptText =   `${systemPrompt}\nPlease extract the main keywords and key phrases from the following text:\n\n${inputText}`;
          return ;
        case 'simplify':
          state.finalPromptText =   `${systemPrompt}\nPlease simplify the following text to make it easier to understand while maintaining its core meaning:\n\n${inputText}`;
          return ;
        case 'translate':
          state.finalPromptText =   `${systemPrompt}\nPlease translate the following text to English (if it's not already in English) and improve its clarity:\n\n${inputText}`;
          return ;
        case 'expand':
          state.finalPromptText =  `${systemPrompt}\nPlease expand on the following text by adding more details, examples, and explanations:\n\n${inputText}`;
          return ;
        default:
          return ;
      } 
    },
    setOutputText(state, action) {
      state.outputText = action.payload;
    },
    setIsProcessing(state, action) {
      state.isProcessing = action.payload;
    },
    selectAiModel(state, action) {
      state.aiModel = action.payload;
    },
  },
});

export default promptAiSlice.reducer;

export const { addPromptText, setOutputText, setIsProcessing, selectAiModel } = promptAiSlice.actions;
