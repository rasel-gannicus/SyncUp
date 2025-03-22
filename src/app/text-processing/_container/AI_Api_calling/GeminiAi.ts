import { useAppSelector } from "@/Redux/hooks";

// const promptState = useAppSelector((state) => state.promptTextAi);


export const GeminiAi = async (prompt: string) => {
    try {
        const prompt = promptState.finalPromptText;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
          // },
          body: JSON.stringify({
            contents: [{
              // role: "user",
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.9,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
              stopSequences: []
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          setOutputText(data.candidates[0].content.parts[0].text);
        } else {
          throw new Error('No valid response from the API');
        }
      } catch (err: any) {
        console.error('Processing error:', err);
        setError(err.message || 'Failed to process text. Please try again.');
      } finally {
        setIsProcessing(false);
      }
}