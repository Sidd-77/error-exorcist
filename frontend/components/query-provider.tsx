'use client'

import React, { createContext, useState } from 'react';

export interface QueryContextType {
  query: string[];
  reference: string[];
  setQuery: any ;
  setRefernce: any ;
  conversation: string[];
  setConversation: any;
  model: string;
  setModel: any;
//   setQuery: (query: string[]) => void ;
//   setRefernce: (reference: string[]) => void ;
}

// Create the context with default values
export const QueryContext = createContext<QueryContextType>({
  query: [],
  reference: [],
  setQuery: () => {},
  setRefernce: () => {},
  conversation: [],
  setConversation: () => {},
  model : 'gemini',
  setModel: () => {},
});

// Create a provider component
export const QueryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [query, setQuery] = useState([]);
  const [reference, setRefernce] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [model, setModel] = useState('gemini');
  return (
    <QueryContext.Provider value={{ query, reference, setQuery, setRefernce, conversation, setConversation, model, setModel }}>
      {children}
    </QueryContext.Provider>
  );
};