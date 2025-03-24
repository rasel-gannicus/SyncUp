import bulbAi from '@/assets/img/bulb.png';
import deepseekPng from '@/assets/img/deepseek-logo-icon.png';
import geminiPng from '@/assets/img/google-gemini-icon.png';
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
    );
}