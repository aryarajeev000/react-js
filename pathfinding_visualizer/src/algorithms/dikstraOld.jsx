// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export function dijkstraOld(grid, startNode, finishNode) {
    const visitedNodesForAnimation = [];
  
    startNode.distance = 0;
  
    const unvisitedNodes = getAllFromGrid(grid);
  
    while (!!unvisitedNodes.length) {
      // sortNodesByDistance(unvisitedNodes);
      // const closestNode = unvisitedNodes.deque();
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
  
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
  
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesForAnimation;
  
      // Else we visit this node and update/relax the distance of its neighbors
      closestNode.isVisited = true;
      visitedNodesForAnimation.push(closestNode);
  
      // If finish node then we reach the destination
      if (closestNode === finishNode) return visitedNodesForAnimation;
  
      updateAllUnvisitedNeighbors(closestNode, grid);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateAllUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getAllUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (neighbor.distance > node.distance + 1) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
      }
    }
  }
  
  function getAllUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(
      (neighbor) => !neighbor.isVisited && !neighbor.isWall
    );
  }
  
  function getAllFromGrid(grid) {
    //   const allNodes = new PriorityQueue({
    //     comparator: function (a, b) {
    //       return b.distance - a.distance;
    //     },
    //   });
    const allNodes = [];
    for (const rows of grid) {
      for (const cell of rows) {
        allNodes.push(cell);
      }
    }
    return allNodes;
  }
  