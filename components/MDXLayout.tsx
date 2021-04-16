import React, { FunctionComponent } from 'react';

const Layout: FunctionComponent = ({children}) => (
  <div className="min-h-screen bg-gray-800">
    <div className="relative min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-start p-8">
      {children}
    </div>
  </div>
)

export default Layout