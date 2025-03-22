import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setIsProcessing, setOutputText } from "@/Redux/features/PromptForAi/PromptAiSlice";

export const useGeminiAi = () => {
  const [error, setError] = useState<string | null>(null);
  const promptState = useAppSelector((state) => state.promptTextAi);
  const dispatch = useAppDispatch() ;

  const processWithGemini = async () => {
    dispatch(setIsProcessing(true));
    setError(null);

    try {
      const prompt = promptState.finalPromptText;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            // ... existing configuration ...
            generationConfig: {
              temperature: 0.9,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
              stopSequences: [],
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        dispatch(setOutputText(data.candidates[0].content.parts[0].text)) ;
      } else {
        throw new Error("No valid response from the API");
      }
    } catch (err: any) {
      console.error("Processing error:", err);
      setError(err.message || "Failed to process text. Please try again.");
    } finally {
        dispatch(setIsProcessing(false));
    }
  };

  return {
    processWithGemini,
    error,
  };
};
