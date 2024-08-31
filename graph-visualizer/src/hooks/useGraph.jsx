import { useState } from 'react';
import { bfs } from '../utils/bfs';
import { dfs } from '../utils/dfs';

const useGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const addNode = (node) => {
    setNodes([...nodes, node]);
  };

  const addEdge = (from, to) => {
    setEdges([...edges, { from, to }]);
  };

  const traverseGraph = (algorithm) => {
    const traversal = algorithm === 'BFS' ? bfs : dfs;
    traversal(nodes, edges);
  };

  return { nodes, edges, addNode, addEdge, traverseGraph };
};

export default useGraph;
