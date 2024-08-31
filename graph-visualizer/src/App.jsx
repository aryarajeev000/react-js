import React from 'react';
import GraphCanvas from './components/GraphCanvas';
import Sidebar from './components/Sidebar';
import Controls from './components/Controls';

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <GraphCanvas />
      <Controls />
    </div>
  );
};

export default App;
