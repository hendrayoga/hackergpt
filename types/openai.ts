export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number;
  tokenLimit: number;
}

export enum OpenAIModelID {
  HackerGPT_3_5 = 'gpt-3.5-turbo-instruct',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-3.5-turbo',
}

export const fallbackModelID = OpenAIModelID.HackerGPT_3_5;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.HackerGPT_3_5]: {
    id: OpenAIModelID.HackerGPT_3_5,
    name: 'HackerGPT',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.GPT_4_32K]: {
    id: OpenAIModelID.GPT_4_32K,
    name: 'Web Browsing (GPT-4)',
    maxLength: 24000,
    tokenLimit: 8000,
  },
};
