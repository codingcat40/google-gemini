import { createContext, useState, useContext, type ReactNode } from 'react';

// Define the shape of your context
interface LLMContextType {
  selectedLLM: string;
  setSelectedLLM: (llm: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  conversations: any[]; // Replace 'any' with your conversation type
  setConversations: (conversations: any[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface LLMProviderProps {
  children: ReactNode;
}

// Create context with proper typing
const LLMContext = createContext<LLMContextType | undefined>(undefined);

export const LLMProvider = ({ children }: LLMProviderProps) => {
  const [selectedLLM, setSelectedLLM] = useState('gpt-4');
  const [selectedRole, setSelectedRole] = useState<string>('user');
  const [conversations, setConversations] = useState<any[]>([]); // Add type here
  const [isLoading, setIsLoading] = useState(false);

  const value: LLMContextType = {
    selectedLLM,
    setSelectedLLM,
    selectedRole,
    setSelectedRole,
    conversations,
    setConversations,
    isLoading,
    setIsLoading,
  };

  return <LLMContext.Provider value={value}>{children}</LLMContext.Provider>;
};

export const useLLM = (): LLMContextType => {
  const context = useContext(LLMContext);
  if (!context) {
    throw new Error('useLLM must be used within LLMProvider');
  }
  return context;
};