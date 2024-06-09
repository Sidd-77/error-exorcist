import React from 'react'
import SearchInput from "./search";

export default function HomePage() {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-5/6 items-center justify-center gap-5">
          <h2 className="mb-4">Enter your query</h2>
          <SearchInput />
        </div>
      </div>
    );
  }