import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, CheckCheck, RefreshCw, Wand2, MessageSquareQuote, Search, BookOpen, PenLine } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { addPromptText, setIsProcessing } from '@/Redux/features/PromptForAi/PromptAiSlice';
import { useGeminiAi } from './AI_Api_calling/useGeminiAi';

const TextProcessor = () => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [textStats, setTextStats] = useState({ characters: 0, words: 0, sentences: 0, paragraphs: 0 });
  const [copied, setCopied] = useState(false);
  const { processWithGemini } = useGeminiAi();

  const dispatch = useAppDispatch();
  const promptState = useAppSelector((state) => state.promptTextAi);
  const isProcessing = promptState.isProcessing;
  const outputText = promptState.outputText;

  useEffect(() => {
    updateTextStats(inputText);
  }, [inputText]);

  const updateTextStats = (text: string) => {
    const characters = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(Boolean).length;
    setTextStats({ characters, words, sentences, paragraphs });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy text');
    }
  };

  // Add this useEffect to monitor promptState changes
  useEffect(() => {
    if (promptState.finalPromptText) {
      handleApiCall(promptState.finalPromptText);
    }
  }, [promptState.finalPromptText]);


  // console.log(promptState);

  const processText = async (action: string) => {
    dispatch(setIsProcessing(true));
    setError('');
    dispatch(addPromptText({ inputText, actionType: action }));
  };

  // Separate API call logic
  const handleApiCall = async (prompt: string) => {    
    try {
      await processWithGemini();
    } catch (err: any) {
      setError(err.message || 'Failed to process text');
    }
  };

  const ButtonWithIcon = ({ action, icon: Icon, label }: { action: string, icon: any, label: string }) => (
    <Button
      onClick={() => processText(action)}
      disabled={!inputText || isProcessing}
      className="flex items-center gap-2 bg-teal-600 dark:bg-teal-500 dark:text-black"
    >
      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
      {label}
    </Button>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <Card className="bg-white dark:bg-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">Text Processor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section with Stats */}
          <div className="space-y-2">
            <div className="relative">
              <textarea
                className="w-full h-48 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setInputText('')}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Text Statistics */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Characters: {textStats.characters}</span>
              <span>Words: {textStats.words}</span>
              <span>Sentences: {textStats.sentences}</span>
              <span>Paragraphs: {textStats.paragraphs}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <ButtonWithIcon action="summarize" icon={BookOpen} label="Summarize" />
              <ButtonWithIcon action="rephrase" icon={RefreshCw} label="Rephrase" />
              <ButtonWithIcon action="analyze" icon={Search} label="Analyze" />
              <ButtonWithIcon action="grammar" icon={PenLine} label="Check Grammar" />
            </div>
            <div className="flex flex-wrap gap-2">
              {/* <ButtonWithIcon action="keywords" icon={MessageSquareQuote} label="Extract Keywords" />
              <ButtonWithIcon action="simplify" icon={Wand2} label="Simplify" /> */}
              {/* <ButtonWithIcon action="translate" icon={RefreshCw} label="Translate" />
              <ButtonWithIcon action="expand" icon={MessageSquareQuote} label="Expand" /> */}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Output Section */}
          {outputText && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Result:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(outputText)}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-500 dark:text-black rounded-lg whitespace-pre-wrap">
                {outputText}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TextProcessor;