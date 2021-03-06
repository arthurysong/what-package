import React, { FunctionComponent } from 'react';
import NextLink from 'next/link';

export const H1: FunctionComponent = ({ children }) => (
  <h1 className="text-5xl my-4">
    {children}
  </h1>
)

export const H2: FunctionComponent = ({ children }) => (
  <h2 className="text-4xl my-3">
    {children}
  </h2>
)

export const H3 = ({ children }) => (
  <h3 className="text-2xl my-3">
    {children}
  </h3>
)

export const Code: FunctionComponent = ({ children }) => (
  <div className="bg-indigo-700 font-mono border border-gray-300 text-sm whitespace-pre-wrap p-2 my-2"> 
    {children}
  </div>

)
export const P = ({ children }) => (
  <p className="my-2">
    {children}
  </p>
)

export const Link = ({ href, children }) => {
  return <a target="_blank" className="underline" href={href}>{children}</a>
}

export const OrderedList = ({ children }) => {
  return <ol className="list-decimal">{children}</ol>
}

export const UnorderedList = ({ children }) => (
  <ul className="list-disc">{children}</ul>
)