import React, { FunctionComponent } from 'react';

export const H1: FunctionComponent = ({ children }) => (
  <h1 className="text-5xl">
    {children}
  </h1>
)

export const H2: FunctionComponent = ({ children }) => (
  <h2 className="text-4xl">
    {children}
  </h2>
)

export const Code: FunctionComponent = ({ children }) => (
  <div className="bg-gray-200 font-mono border border-gray-300"> 
    {children}
  </div>

)