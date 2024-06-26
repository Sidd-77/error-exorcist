"use client";
import React from "react";
import { QueryContext, QueryContextType } from "./query-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CodeSquare, CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";

export default function SearchInput() {
  const {
    query,
    reference,
    setQuery,
    setRefernce,
    conversation,
    setConversation,
    model,
    setModel
  } = React.useContext(QueryContext) as QueryContextType;
  const router = useRouter();
  const [queryText, setQueryText] = useState("");
  const [referenceText, setReferenceText] = useState("");

  function handleModelChange(value: any) {
    setModel(value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    router.push("/result");
    let tmpQ = query;
    let tmpR = reference;
    tmpQ.push(queryText);
    tmpR.push(referenceText);
    setConversation([queryText]);
    setQuery(tmpQ);
    setRefernce(tmpR);
    console.log({ query, reference });
    console.log({ queryText, referenceText });
  }

  return (
    <form
      className="relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring gap-2"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        rows={10}
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 mb-3 shadow-none focus-visible:ring-0"
        onChange={(e) => setQueryText(e.target.value)}
      />
      <div className="flex items-center p-3 pt-0 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                type="search"
                placeholder="Enter Reference Link"
                className="sm:w-[300px] md:w-[200px] lg:w-[300px]  border focus-visible:ring-0"
                onChange={(e) => setReferenceText(e.target.value)}
              />
            </TooltipTrigger>
            <TooltipContent side="top">Enter Refernce Link</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
            <Select onValueChange={handleModelChange} defaultValue="gemini" >
            <SelectTrigger className="w-[180px] " >
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent className=" bg-white dark:bg-black">
              <SelectItem value="gemini">Gemini</SelectItem>
              <SelectItem value="groq/8b">Groq (llama-8b) --fastest</SelectItem>
              <SelectItem value="groq/70b">Groq (llama-70b)</SelectItem>
              <SelectItem value="local">Ollama</SelectItem>
            </SelectContent>
          </Select>
            </TooltipTrigger>
            <TooltipContent side="top">Select Model</TooltipContent>
          </Tooltip>
          

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip> */}
        </TooltipProvider>
        <Button
          type="submit"
          size="sm"
          className="ml-auto gap-1.5"
          onClick={handleSubmit}
        >
          Submit
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
