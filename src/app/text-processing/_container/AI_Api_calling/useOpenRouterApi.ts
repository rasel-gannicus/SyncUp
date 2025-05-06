import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  setIsProcessing,
  setOutputText,
} from "@/Redux/features/PromptForAi/PromptAiSlice";

export const useOpenRouterApi = () => {
  const [error, setError] = useState<string | null>(null);
  const promptState = useAppSelector((state) => state.promptTextAi);
  const modelName = promptState.aiModel || 'mistralai/mistral-small-3.1-24b-instruct:free';
  const dispatch = useAppDispatch();

  const processWithOpenRouter = async (prompt: string) => {
    dispatch(setIsProcessing(true));
    setError(null);
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://syncup-rasel.vercel.app/",
            "X-Title": "SyncUp",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: `${modelName}`,
            messages: [
              {
                role: "user",
                content: prompt,
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
      if (data.choices) {
        dispatch(setOutputText(data.choices[0].message.content));
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
    processWithOpenRouter,
    error,
  };
};
