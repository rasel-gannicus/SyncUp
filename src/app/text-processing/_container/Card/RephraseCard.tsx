import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCheck, Copy, PenLine, RefreshCw, Search } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';
import bulbAi from '@/assets/img/bulb.png';
import geminiPng from '@/assets/img/google-gemini-icon.png';
import deepseekPng from '@/assets/img/deepseek-logo-icon.png';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { selectAiModel } from '@/Redux/features/PromptForAi/PromptAiSlice';
import { SummerizeCardProps } from './SummerizeCard';

export default function RephraseCard({
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
    const selectedAiModel = useAppSelector((state) => state.promptTextAi.aiModel);
    const dispatch = useAppDispatch() ;

    return (
        <Card className="bg-white dark:bg-gray-700 shadow-lg mt-5">
            <CardHeader className=''>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">Elevate Your Writtings with Advanced AI Text Enhancement</CardTitle>
                    <div>
                        <Select value={selectedAiModel} onValueChange={(value)=>dispatch(selectAiModel(value))}>
                            <SelectTrigger className="flex justify-start items-center gap-3 shadow-sm">
                                {!selectedAiModel && <Image
                                    src={bulbAi}
                                    width={30}
                                    height={30}
                                    alt="bulbAi"
                                />}
                                <SelectValue placeholder="Select Ai Model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="gemini" >
                                        <div className='flex justify-start items-center gap-3'>
                                            <Image
                                                src={geminiPng}
                                                width={30}
                                                height={30}
                                                alt="geminiPng"

                                            />
                                            <span>Gemini</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="deepseek" >
                                        <div className='flex justify-start items-center gap-3'>
                                            <Image
                                                src={deepseekPng}
                                                width={30}
                                                height={30}
                                                alt="deepseekPng"

                                            />
                                            <span>Deepseek</span>
                                        </div>
                                    </SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
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
                        <ButtonWithIcon action="rephrase" icon={RefreshCw} label="Rephrase" />
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
    );
}