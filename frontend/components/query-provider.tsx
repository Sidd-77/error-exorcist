'use client'

import React, { createContext, useState } from 'react';

// Define the shape of the context
export interface QueryContextType {
  query: string[];
  reference: string[];
  setQuery: any ;
  setRefernce: any ;
  conversation: string[];
  setConversation: any;
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
});

// Create a provider component
export const QueryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [query, setQuery] = useState([]);
  const [reference, setRefernce] = useState([]);
  const [conversation, setConversation] = useState([]);
  return (
    <QueryContext.Provider value={{ query, reference, setQuery, setRefernce, conversation, setConversation }}>
      {children}
    </QueryContext.Provider>
  );
};