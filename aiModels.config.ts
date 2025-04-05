import microsoft from '@/assets/img/AI Logo/microsoft.png';
import mythomax from '@/assets/img/AI Logo/mythomax.png';
import huggingFace from '@/assets/img/AI Logo/huggingface.png';
import nvidia from '@/assets/img/AI Logo/nvidia-logo-vert.png';
import deepSeek from '@/assets/img/AI Logo/deepseek.png';
import meta from '@/assets/img/AI Logo/meta.png';
import aiLogoPng from '@/assets/img/AI Logo/ai raw logo.png';
import geminiPng from '@/assets/img/AI Logo/google-gemini-icon.png';
import mistralPng from '@/assets/img/AI Logo/mistral-ai-icon.png';
import qwenPng from '@/assets/img/AI Logo/qwen-icon-seeklogo.svg';
import moonshotImg from '@/assets/img/AI Logo/moonshot.jpeg';
import googleImg from '@/assets/img/AI Logo/google.png';
import dolphinImg from '@/assets/img/AI Logo/dolphin.png';
import qwerky from '@/assets/img/AI Logo/Qwerky 72b.png';
import byteDance from '@/assets/img/AI Logo/bytedance.png';
import molmoPng from '@/assets/img/AI Logo/molmo_logo.png';

export const aiModels = [
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
        imgSource: deepSeek
    },
    {
        value: 'qwen/qwq-32b:free',
        title: 'Qwen: QwQ 32B',
        responseSpeed: 'high',
        imgSource: qwenPng
    },
    {
        value: 'moonshotai/moonlight-16b-a3b-instruct:free',
        title: 'Moonshot AI: Moonlight 16B A3B',
        responseSpeed: 'low',
        imgSource: moonshotImg
    },
    {
        value: 'google/gemma-3-4b-it:free',
        title: 'Google: Gemma 3 4B',
        imgSource: geminiPng
    },
    {
        value: 'google/gemma-3-12b-it:free',
        title: 'Google: Gemma 3 12B',
        imgSource: geminiPng
    },
    {
        value: 'rekaai/reka-flash-3:free',
        title: 'Reka: Flash 3',
        imgSource: aiLogoPng
    },
    {
        value: 'cognitivecomputations/dolphin3.0-r1-mistral-24b:free',
        title: 'Dolphin3.0 R1 Mistral 24B',
        imgSource: dolphinImg
    },
    {
        value: 'google/gemini-2.0-pro-exp-02-05:free',
        title: 'Gemini Pro 2.0 Experimental',
        imgSource: geminiPng
    },
    {
        value: 'qwen/qwen2.5-vl-72b-instruct:free',
        title: 'Qwen: Qwen2.5 VL 72B Instruct',
        imgSource: qwenPng
    },
    {
        value: 'featherless/qwerky-72b:free',
        title: 'Qwerky 72b',
        imgSource: qwerky
    },
    {
        value: 'open-r1/olympiccoder-7b:free',
        title: 'OlympicCoder 7B',
        imgSource: aiLogoPng
    },

    {
        value: 'open-r1/olympiccoder-32b:free',
        title: 'OlympicCoder 32B',
        imgSource: aiLogoPng
    },
    {
        value: 'qwen/qwen2.5-vl-32b-instruct:free',
        title: 'Qwen: Qwen2.5 VL 32B Instruct',
        imgSource: qwenPng
    },
    {
        value: 'bytedance-research/ui-tars-72b:free',
        title: 'Bytedance: UI-TARS 72B',
        imgSource: byteDance
    },
    {
        value: 'allenai/molmo-7b-d:free',
        title: 'Molmo 7B D',
        imgSource: molmoPng
    },
    {
        value: 'deepseek/deepseek-v3-base:free',
        title: 'DeepSeek: DeepSeek V3 Base',
        imgSource: deepSeek
    },
    {
        value: 'deepseek/deepseek-chat-v3-0324:free',
        title: 'DeepSeek: DeepSeek V3 0324',
        imgSource: deepSeek
    },
    {
        value: 'nousresearch/deephermes-3-llama-3-8b-preview:free',
        title: 'Nous: DeepHermes 3',
        imgSource: aiLogoPng
    },
    {
        value: 'cognitivecomputations/dolphin3.0-r1-mistral-24b:free',
        title: 'Dolphin3.0 R1 Mistral 24B',
        imgSource: dolphinImg
    },
    {
        value: 'cognitivecomputations/dolphin3.0-mistral-24b:free',
        title: 'Dolphin3.0 Mistral 24B',
        imgSource: dolphinImg
    },
    {
        value: 'google/gemini-2.0-pro-exp-02-05:free',
        title: 'Google: Gemini Pro 2.0 Experimental',
        imgSource: geminiPng
    },
    {
        value: 'mistralai/mistral-small-24b-instruct-2501:free',
        title: 'Mistral: Mistral Small 3',
        imgSource: mistralPng
    },
    {
        value: 'deepseek/deepseek-r1-distill-qwen-32b:free',
        title: 'DeepSeek: R1 Distill Qwen 32B',
        imgSource: deepSeek
    },
    {
        value: 'deepseek/deepseek-r1-distill-qwen-14b:free',
        title: 'DeepSeek: R1 Distill Qwen 14B',
        imgSource: deepSeek
    },
    {
        value: 'deepseek/deepseek-r1-distill-llama-70b:free',
        title: 'DeepSeek: R1 Distill Llama 70B',
        imgSource: deepSeek
    },
    {
        value: 'google/gemini-2.0-flash-thinking-exp:free',
        title: 'Google: Gemini 2.0 Flash Thinking Experimental 01-21',
        imgSource: geminiPng
    },
    {
        value: 'sophosympatheia/rogue-rose-103b-v0.2:free',
        title: 'Rogue Rose 103B v0.2',
        imgSource: aiLogoPng
    },
    {
        value: 'deepseek/deepseek-r1:free',
        title: 'DeepSeek: R1',
        imgSource: deepSeek
    },
    {
        value: 'google/gemini-2.0-flash-thinking-exp-1219:free',
        title: 'Google: Gemini 2.0 Flash Thinking Experimental',
        imgSource: geminiPng
    },
    {
        value: 'google/gemini-2.0-flash-exp:free',
        title: 'Google: Gemini Flash 2.0 Experimental',
        imgSource: geminiPng
    },
    {
        value: 'meta-llama/llama-3.3-70b-instruct:free',
        title: 'Meta: Llama 3.3 70B Instruct',
        imgSource: meta
    },
    {
        value: 'qwen/qwq-32b-preview:free',
        title: 'Qwen: QwQ 32B Preview',
        imgSource: qwenPng
    },
    {
        value: 'google/learnlm-1.5-pro-experimental:free',
        title: 'Google: LearnLM 1.5 Pro Experimental',
        imgSource: geminiPng
    },
    {
        value: 'qwen/qwen-2.5-coder-32b-instruct:free',
        title: 'Qwen2.5 Coder 32B Instruct',
        imgSource: qwenPng
    },
    {
        value: 'nvidia/llama-3.1-nemotron-70b-instruct:free',
        title: 'NVIDIA: Llama 3.1 Nemotron 70B',
        imgSource: nvidia
    },
    {
        value: 'meta-llama/llama-3.2-3b-instruct:free',
        title: 'Meta: Llama 3.2 3B Instruct',
        imgSource: meta
    },
    {
        value: 'qwen/qwen-2.5-72b-instruct:free',
        title: 'Qwen2.5 72B',
        imgSource: qwenPng
    },
    {
        value: 'qwen/qwen-2.5-vl-7b-instruct:free',
        title: 'Qwen: Qwen2.5-VL 7B',
        imgSource: qwenPng
    },
    {
        value: 'google/gemini-flash-1.5-8b-exp',
        title: 'Google: Gemini Flash 1.5 8B',
        imgSource: geminiPng
    },
    {
        value: 'meta-llama/llama-3.1-8b-instruct:free',
        title: 'Meta: Llama 3.1 8B',
        imgSource: meta
    },
    {
        value: 'mistralai/mistral-nemo:free',
        title: 'Mistral: Mistral Nemo',
        imgSource: mistralPng
    },
    {
        value: 'qwen/qwen-2-7b-instruct:free',
        title: 'Qwen 2 7B Instruct',
        imgSource: qwenPng
    },
    {
        value: 'google/gemma-2-9b-it:free',
        title: 'Google: Gemma 2 9B',
        imgSource: geminiPng
    },
    {
        value: 'mistralai/mistral-7b-instruct:free',
        title: 'Mistral: Mistral 7B',
        imgSource: mistralPng
    },
    {
        value: 'microsoft/phi-3-mini-128k-instruct:free',
        title: 'Microsoft: Phi-3 Mini 128K',
        imgSource: microsoft
    },
    {
        value: 'microsoft/phi-3-medium-128k-instruct:free',
        title: 'Microsoft: Phi-3 Medium 128K',
        imgSource: microsoft
    },
    {
        value: 'meta-llama/llama-3-8b-instruct:free',
        title: 'Meta: Llama 3 8B',
        imgSource: meta
    },
    {
        value: 'openchat/openchat-7b:free',
        title: 'OpenChat 3.5 7B',
        imgSource: aiLogoPng
    },
    {
        value: 'undi95/toppy-m-7b:free',
        title: 'Toppy M 7B',
        imgSource: aiLogoPng
    },
    {
        value: 'huggingfaceh4/zephyr-7b-beta:free',
        title: 'Hugging Face: Zephyr 7B',
        imgSource: huggingFace
    },
    {
        value: 'gryphe/mythomax-l2-13b:free',
        title: 'MythoMax 13B',
        imgSource: mythomax
    }


];
