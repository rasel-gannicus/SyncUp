import bulbAi from '@/assets/img/bulb.png';
import deepseekPng from '@/assets/img/AI Logo/deepseek-logo-icon.png';
import geminiPng from '@/assets/img/AI Logo/google-gemini-icon.png'; 
import mistralPng from '@/assets/img/AI Logo/mistral-ai-icon.png'; 

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
import Image from 'next/image';

const aiModels = [
    {
        value: 'mistralai/mistral-small-3.1-24b-instruct:free',
        title: 'Mistral Small 3.1 24B',
        responseSpeed: 'medium',
        imgSource: mistralPng
    },
    {
        value: 'deepseek/deepseek-r1-zero:free',
        title: 'DeepSeek R1 Zero',
        responseSpeed: 'low',
        imgSource: deepseekPng
    },
    {
        value: 'qwen/qwq-32b:free',
        title: 'Qwen: QwQ 32B',
        responseSpeed: 'high',
        imgSource: deepseekPng
    },
    {
        value: 'moonshotai/moonlight-16b-a3b-instruct:free',
        title: 'Moonshot AI: Moonlight 16B A3B',
        responseSpeed: 'low',
        imgSource: deepseekPng
    },
    {
        value: 'google/gemma-3-4b-it:free',
        title: 'Google: Gemma 3 4B',
        imgSource: deepseekPng
    },
    {
        value: 'google/gemma-3-12b-it:free',
        title: 'Google: Gemma 3 12B',
        imgSource: deepseekPng
    },
    {
        value: 'rekaai/reka-flash-3:free',
        title: 'Reka: Flash 3',
        imgSource: deepseekPng
    },
];

export default function SelectAiModel() {
    const selectedAiModel = useAppSelector((state) => state.promptTextAi.aiModel);
    const dispatch = useAppDispatch();
    return (
        <div>
            <Select value={selectedAiModel} onValueChange={(value) => dispatch(selectAiModel(value))}>
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
                        {aiModels.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                                <div className='flex justify-start items-center gap-3'>
                                    <Image
                                        src={model.imgSource}
                                        width={30}
                                        height={30}
                                        alt={`${model.title.toLowerCase()}Png`}
                                    />
                                    <span>{model.title}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}