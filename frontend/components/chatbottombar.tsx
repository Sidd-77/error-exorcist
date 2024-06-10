"use client";

import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";
import { Input } from "./ui/input";
import { QueryContext, QueryContextType } from "@/components/query-provider";
// import {MarkdownBlock, MarkdownSpan, MarkdownElement} from "md-block";
import Script from 'next/script'



export default function ChatBottomBar() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { query, reference, setQuery, setRefernce, conversation, setConversation } = React.useContext(
    QueryContext
  ) as QueryContextType;

  const handleSubmit =  () => {
    setIsLoading(true);
    try {
      const newQuery = [...query, message];
      const newReference = [...reference, message];
      setQuery(newQuery);
      setRefernce(newReference);
      const newConversation = [...conversation, message];
      setConversation(newConversation);
      setMessage("");
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center px-5 py-5">
      <Input className="w-full border rounded-full py-2 px-4 mr-2" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button
        type="submit"
        size="default"
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
        onClick={handleSubmit}
      >
        Submit
        <CornerDownLeft className="size-3.5" />
      </Button>
    </div>
  );
}
