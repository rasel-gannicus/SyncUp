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

export const {  setOutputText, setIsProcessing, selectAiModel } = promptAiSlice.actions;
