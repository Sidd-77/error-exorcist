"use client";

import Topbar from "@/components/topbar";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { QueryContext, QueryContextType } from "@/components/query-provider";

export default function Result() {
  const { query, reference, setQuery, setRefernce } = React.useContext(
    QueryContext
  ) as QueryContextType;
  const [queryText, setQueryText] = useState(query[query.length - 1]);
  const [referenceText, setReferenceText] = useState(
    reference[reference.length - 1]
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchResult = async () => {
    setIsLoading(true);
    console.log(queryText, referenceText)
    const res = await axios.post("http://127.0.0.1:8000/gemini", {
      query: queryText,
      reference: referenceText,
    });
    console.log("Query done");
    console.log(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("From result page", query, reference);
    fetchResult();
  }, []);

  return (
    <div className="flex  h-screen w-full flex-col ">
      <Topbar />
      <div>
        <h1>Result Page</h1>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h2>Result</h2>
              <div>
                <h3>Query</h3>
                <p>{queryText}</p>
              </div>
              <div>
                <h3>Reference</h3>
                <p>{referenceText}</p>
              </div>
              <div>
                <h3>Result</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
