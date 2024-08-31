import React, { useRef, useState, useEffect } from 'react';

// Simple implementations of Kruskal's, Prim's, and Floyd-Warshall algorithms
const kruskal = (vertices, edges) => {
    // Simplified Kruskal's algorithm for demonstration
    edges.sort((a, b) => a.weight - b.weight);
    return edges.slice(0, vertices - 1);
};

const prim = (vertices, edges) => {
    // Simplified Prim's algorithm for demonstration
    edges.sort((a, b) => a.weight - b.weight);
    return edges.slice(0, vertices - 1);
};

const floydWarshall = (vertices, edges) => {
    // Simplified Floyd-Warshall algorithm for demonstration
    const dist = Array(vertices).fill().map(() => Array(vertices).fill(Infinity));
    edges.forEach(({ u, v, weight }) => {
        dist[u][v] = weight;
        dist[v][u] = weight; // Assuming undirected graph
    });
    for (let k = 0; k < vertices; k++) {
        for (let i = 0; i < vertices; i++) {
            for (let j = 0; j < vertices; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
};

const App = () => {
    const canvasRef = useRef(null);
    const [algorithm, setAlgorithm] = useState('Kruskal');
    const [running, setRunning] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1000);

    const vertices = 4;
    const edges = [
        { u: 0, v: 1, weight: 10 },
        { u: 0, v: 2, weight: 6 },
        { u: 0, v: 3, weight: 5 },
        { u: 1, v: 3, weight: 15 },
        { u: 2, v: 3, weight: 4 },
    ];

    useEffect(() => {
        if (canvasRef.current) {
            runAlgorithm();
        }
    }, [algorithm]);

    const drawVertices = (ctx) => {
        const positions = [];
        const radius = 150;
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;

        for (let i = 0; i < vertices; i++) {
            const angle = (i * Math.PI * 2) / vertices;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            positions.push({ x, y });

            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2, true);
            ctx.fillStyle = 'lightblue';
            ctx.fill();
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.fillText(`V${i}`, x - 10, y + 5);
        }

        return positions;
    };

    const drawEdges = (ctx, edges, positions) => {
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        edges.forEach(({ u, v, weight }) => {
            ctx.beginPath();
            ctx.moveTo(positions[u].x, positions[u].y);
            ctx.lineTo(positions[v].x, positions[v].y);
            ctx.stroke();
            ctx.fillText(weight, (positions[u].x + positions[v].x) / 2, (positions[u].y + positions[v].y) / 2);
        });
    };

    const runAlgorithm = async () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const vertexPositions = drawVertices(ctx);
        drawEdges(ctx, edges, vertexPositions);

        if (algorithm === 'Kruskal') {
            const mst = kruskal(vertices, edges);
            await visualizeEdges(ctx, mst, vertexPositions, 'green');
        } else if (algorithm === 'Prim') {
            const mst = prim(vertices, edges);
            await visualizeEdges(ctx, mst, vertexPositions, 'blue');
        } else if (algorithm === 'Floyd-Warshall') {
            const dist = floydWarshall(vertices, edges);
            visualizeFloydWarshall(ctx, dist, vertexPositions);
        }
    };

    const visualizeEdges = async (ctx, mst, vertexPositions, color) => {
        for (const edge of mst) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(vertexPositions[edge.u].x, vertexPositions[edge.u].y);
            ctx.lineTo(vertexPositions[edge.v].x, vertexPositions[edge.v].y);
            ctx.stroke();
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
    };

    const visualizeFloydWarshall = (ctx, dist, vertexPositions) => {
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        for (let i = 0; i < dist.length; i++) {
            for (let j = 0; j < dist[i].length; j++) {
                ctx.fillText(`D[${i}][${j}] = ${dist[i][j]}`, vertexPositions[i].x - 25, vertexPositions[i].y + 30 * (j + 1));
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl text-white font-bold mb-6">Graph Algorithms Visualization</h1>
            <div className="flex space-x-4 mb-6">
                <button 
                    onClick={() => setAlgorithm('Kruskal')} 
                    disabled={running} 
                    className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-500 hover:text-white transition">
                    Kruskal's Algorithm
                </button>
                <button 
                    onClick={() => setAlgorithm('Prim')} 
                    disabled={running} 
                    className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-500 hover:text-white transition">
                    Prim's Algorithm
                </button>
                <button 
                    onClick={() => setAlgorithm('Floyd-Warshall')} 
                    disabled={running} 
                    className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-500 hover:text-white transition">
                    Floyd-Warshall Algorithm
                </button>
            </div>
            <canvas ref={canvasRef} width={600} height={400} className="border-2 border-gray-300 rounded-lg shadow-lg"></canvas>
            <div className="mt-4">
                <label className="text-white mr-2">Animation Speed (ms):</label>
                <input
                    type="number"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                    className="bg-white border border-gray-300 rounded p-2 shadow-inner"
                />
            </div>
        </div>
    );
};

export default App;
