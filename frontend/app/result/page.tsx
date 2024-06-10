"use client";

import Topbar from "@/components/topbar";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { QueryContext, QueryContextType } from "@/components/query-provider";
import { getResponse } from "@/lib/actions";
import ChatBottomBar from "@/components/chatbottombar";
import Script from 'next/script'
import Markdown from "react-markdown";
export default function Result() {
  const {
    query,
    reference,
    setQuery,
    setRefernce,
    conversation,
    setConversation,
  } = React.useContext(QueryContext) as QueryContextType;
  const [queryText, setQueryText] = useState(query[query.length - 1]);
  const [referenceText, setReferenceText] = useState(
    reference[reference.length - 1]
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setQueryText(query[query.length - 1]);
        setReferenceText(reference[reference.length - 1]);
        setConversation([...conversation, query[query.length - 1]]);
        console.log("DEBUG", conversation);
        const data = await getResponse(queryText, referenceText);
        setConversation([...conversation, data]);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("CONVERSATION",conversation);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, reference]);

  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 overflow-y-scroll">
        <div className="px-4 py-2">
          {isLoading && (
            <div className='flex space-x-2 justify-center items-center bg-white  dark:invert'>
            <span className='sr-only'>Loading...</span>
             <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
           <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
           <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
         </div>
          )}

          {!isLoading && (
            // <div>
            //   <div className="flex items-center mb-2">
            //     <div className="font-medium">John Doe</div>
            //   </div>
            //   <div className=" dark:bg-slate-800  bg-gray-200 border-0 rounded-lg p-2 shadow mb-2 max-w-sm focus-visible:ring-0">
            //     Hi, how can I help you?
            //   </div>
            //   <div className="flex items-center justify-end">
            //     <div className="bg-blue-500 dark:bg-blue-700 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
            //       Sure, I can help with that.
            //     </div>
            //   </div>
            // </div>
            <div>
              {conversation.map((message, index) => (
                <div className={index%2==1 ? "" : "flex items-center justify-end"}>
                <div className={ index%2==1 ? " w-5/6 dark:bg-slate-800 p-2  bg-gray-200 border-0 rounded-lg  shadow mb-2  focus-visible:ring-0" : " bg-blue-500 dark:bg-blue-700 text-white rounded-lg p-2 shadow mr-2 max-w-sm mb-2 "  }>
                  <Markdown >
                  {message}
                  </Markdown>
                  </div>
                  </div>
              )
              )}
            </div>
          )}
        </div>
      </div>
      <ChatBottomBar />
    </div>
  );
}
