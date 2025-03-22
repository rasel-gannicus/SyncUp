import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, CheckCheck, RefreshCw, Wand2, MessageSquareQuote, Search, BookOpen, PenLine } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { addPromptText, setIsProcessing } from '@/Redux/features/PromptForAi/PromptAiSlice';
import { useGeminiAi } from './AI_Api_calling/useGeminiAi';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SummerizeCard from './Card/SummerizeCard';

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
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <Tabs defaultValue="summerize" className="">
        <TabsList className="grid w-full grid-cols-4 bg-gray-300">
          <TabsTrigger value="summerize">Summerize</TabsTrigger>
          <TabsTrigger value="rephrase">Rephrase</TabsTrigger>
          <TabsTrigger value="analyze">Analyze</TabsTrigger>
          <TabsTrigger value="grammer">Check Grammer</TabsTrigger>
        </TabsList>
        <TabsContent value="summerize">
          <SummerizeCard />
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, yobe logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextProcessor;



