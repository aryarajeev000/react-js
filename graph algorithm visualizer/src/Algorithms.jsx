// src/App.jsx

import React, { useRef, useEffect, useState } from 'react';
import { kruskal, prim, floydWarshall } from './Algorithms';

const App = () => {
    const canvasRef = useRef(null);
    const [algorithm, setAlgorithm] = useState('Kruskal');
    const [running, setRunning] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1000); // 1 second

    const edges = [
        { u: 0, v: 1, weight: 10 },
        { u: 0, v: 2, weight: 6 },
        { u: 0, v: 3, weight: 5 },
        { u: 1, v: 3, weight: 15 },
        { u: 2, v: 3, weight: 4 },
    ];

    const visualizeKruskal = async () => {
        const mst = kruskal(4, edges);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const vertexPositions = drawVertices(ctx, 4);
        drawEdges(ctx, edges);

        for (const edge of mst) {
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(vertexPositions[edge.u].x, vertexPositions[edge.u].y);
            ctx.lineTo(vertexPositions[edge.v].x, vertexPositions[edge.v].y);
            ctx.stroke();
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
    };

    const visualizePrim = async () => {
        const mst = prim(4, edges);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const vertexPositions = drawVertices(ctx, 4);
        drawEdges(ctx, edges);

        for (const edge of mst) {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(vertexPositions[edge.u].x, vertexPositions[edge.u].y);
            ctx.lineTo(vertexPositions[edge.v].x, vertexPositions[edge.v].y);
            ctx.stroke();
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
    };

    const visualizeFloydWarshall = async () => {
        const dist = floydWarshall(4, edges);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const vertexPositions = drawVertices(ctx, 4);

        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        for (let i = 0; i < dist.length; i++) {
            for (let j = 0; j < dist[i].length; j++) {
                ctx.fillText(`D[${i}][${j}] = ${dist[i][j]}`, vertexPositions[i].x - 25, vertexPositions[i].y + 30 * (j + 1));
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
    };

    const drawVertices = (ctx, vertexCount) => {
        const vertexPositions = [];
        const radius = 150;
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;

        for (let i = 0; i < vertexCount; i++) {
            const angle = (i * Math.PI * 2) / vertexCount;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            vertexPositions.push({ x, y });

            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2, true);
            ctx.fillStyle = 'lightblue';
            ctx.fill();
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.fillText(`V${i}`, x - 10, y + 5);
        }

        return vertexPositions;
    };

    const drawEdges = (ctx, edges) => {
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        edges.forEach(({ u, v }) => {
            ctx.beginPath();
            ctx.moveTo(u * 100 + 200, v * 100 + 200); // Adjust for actual coordinates
            ctx.lineTo(v * 100 + 200, u * 100 + 200);
            ctx.stroke();
        });
    };

    const handleAlgorithmChange = async (alg) => {
        setAlgorithm(alg);
        setRunning(true);
        if (alg === 'Kruskal') {
            await visualizeKruskal();
        } else if (alg === 'Prim') {
            await visualizePrim();
        } else if (alg === 'Floyd-Warshall') {
            await visualizeFloydWarshall();
        }
        setRunning(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl text-white font-bold mb-6">Graph Algorithms Visualization</h1>
            <div className="flex space-x-4 mb-6">
                <button onClick={() => handleAlgorithmChange('Kruskal')} disabled={running} className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-500 hover:text-white transition">
                    Kruskal's Algorithm
                </button>
                <button onClick={() => handleAlgorithmChange('Prim')} disabled={running} className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-500 hover:text-white transition">
                    Prim's Algorithm
                </button>
                <button onClick={() => handleAlgorithmChange('Floyd-Warshall')} disabled={running} className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-500 hover:text-white transition">
                    Floyd-Warshall Algorithm
                </button>
            </div>
            <canvas ref={canvasRef} width={600} height={400} className="border-2 border-gray-300"></canvas>
            <div className="mt-4">
                <label className="text-white mr-2">Animation Speed (ms):</label>
                <input
                    type="number"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                    className="bg-white border rounded p-2"
                />
            </div>
        </div>
    );
};

export default App;
