import React, {useMemo} from 'react';

interface BlockieData {
    color: string;
    bgcolor: string;
    spotcolor: string;
    grid: number[][];
}

const blockieCache: Record<string, BlockieData> = {};

interface BlockieProps {
    seed: string;
    size?: number;
    className?: string;
}

const Blockie: React.FC<BlockieProps> = ({seed, size = 32, className}) => {
    const gridSize = 8;

    const {color, bgcolor, spotcolor, grid} = useMemo(() => {
        if (blockieCache[seed]) {
            return blockieCache[seed];
        }

        // 1. Seeded Random Generator
        const s = [0, 0, 0, 0];
        for (let i = 0; i < seed.length; i++) {
            s[i % 4] = (s[i % 4] << 5) - s[i % 4] + seed.charCodeAt(i);
        }

        const rand = () => {
            const t = s[0] ^ (s[0] << 11);
            s[0] = s[1];
            s[1] = s[2];
            s[2] = s[3];
            s[3] = (s[3] ^ (s[3] >> 19) ^ t ^ (t >> 8)) >>> 0;
            return s[3] / ((1 << 31) >>> 0);
        };

        // 2. Color Generation
        const createColor = () => {
            const h = Math.floor(rand() * 360);
            const s = rand() * 60 + 40;
            const l = (rand() + rand() + rand() + rand()) * 25;
            return `hsl(${h},${s}%,${l}%)`;
        };

        const color = createColor();
        const bgcolor = createColor();
        const spotcolor = createColor();

        // 3. Image Data Generation (Symmetric)
        const halfW = Math.ceil(gridSize / 2);
        const gridData: number[][] = [];
        for (let y = 0; y < gridSize; y++) {
            const row: number[] = [];
            for (let x = 0; x < halfW; x++) {
                row.push(Math.floor(rand() * 2.3));
            }
            const fullRow = [...row];
            for (let x = Math.floor(gridSize / 2) - 1; x >= 0; x--) {
                fullRow.push(row[x]);
            }
            gridData.push(fullRow);
        }

        const data = {color, bgcolor, spotcolor, grid: gridData};
        blockieCache[seed] = data;
        return data;
    }, [seed]);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${gridSize} ${gridSize}`}
            shapeRendering="crispEdges"
            className={className}
            style={{
                display: 'block',
                borderRadius: '50%',
                clipPath: 'circle(50% at 50% 50%)',
                overflow: 'hidden',
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {grid.map((row, y) =>
                row.map((val, x) => {
                    const fill = val === 0 ? bgcolor : val === 1 ? color : spotcolor;
                    return (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            width="1"
                            height="1"
                            fill={fill}
                        />
                    );
                })
            )}
        </svg>
    );
};

export default Blockie;