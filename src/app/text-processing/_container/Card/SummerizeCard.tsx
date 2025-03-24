import bulbAi from '@/assets/img/bulb.png';
import deepseekPng from '@/assets/img/deepseek-logo-icon.png';
import geminiPng from '@/assets/img/google-gemini-icon.png';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { selectAiModel } from '@/Redux/features/PromptForAi/PromptAiSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { BookOpen, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import OutPutResult from '../OutPutResult';
import SelectAiModel from './components/SelectAiModel';

export interface SummerizeCardProps {
    inputText: string;
    setInputText: (text: string) => void;
    textStats: {
        characters: number;
        words: number;
        sentences: number;
        paragraphs: number;
    };
    error: string;
    outputText: string;
    copied: boolean;
    setCopied: (copied: boolean) => void;
    copyToClipboard: (text: string) => void;
    ButtonWithIcon: React.FC<{
        action: string;
        icon: React.ElementType;
        label: string;
    }>;
}

export default function SummerizeCard({
    inputText,
    setInputText,
    textStats,
    error,
    outputText,
    copied,
    setCopied,
    copyToClipboard,
    ButtonWithIcon
}: SummerizeCardProps) {

    return (
        <Card className="bg-white dark:bg-gray-700 shadow-lg mt-5">
            <CardHeader className=''>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">Transform Your Text with AI-Powered Summarization</CardTitle>
                    <SelectAiModel />
                </div>

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
                    </div>
                    <div className="flex flex-wrap gap-2">                        
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Output Section */}
                <OutPutResult />
            </CardContent>
        </Card>
    );
}