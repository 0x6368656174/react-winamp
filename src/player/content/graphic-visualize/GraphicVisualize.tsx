import React, { useEffect, useRef } from 'react';

interface GraphicVisualizeProps {
  columns: number[];
}

const columnColors = [
  '#365F27',
  '#3FB425',
  '#3BBC26',
  '#3CBF26',
  '#15CA28',
  '#7DD432',
  '#99DB38',
  '#C3D43C',
  '#D5B135',
  '#CA8624',
  '#C4761F',
  '#D67023',
  '#D65F1D',
  '#C64A15',
  '#CE2F0C',
];

const dotsColors = ['#045184', '#6194ED'];
const topColor = 'rgba(150, 150, 150, 0.8)';

function GraphicVisualize({ columns }: GraphicVisualizeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error('Not found canvas');
    }

    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      throw new Error('Not found canvas context');
    }

    // Fix HIDPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 158 * dpr;
    canvas.height = 38 * dpr;
    context.scale(dpr, dpr);

    for (let i = 0; i < 10; ++i) {
      context.fillStyle = dotsColors[i % 2 === 0 ? 0 : 1];
      context.fillRect(0, i * 4, 2, 2);
    }
    for (let i = 0; i < 40; ++i) {
      context.fillStyle = dotsColors[i % 2 === 0 ? 1 : 0];
      context.fillRect(i * 4, 36, 2, 2);
    }

    columns.forEach((columnValue, columnIndex) => {
      let i = 0;
      for (; i < columnValue * columnColors.length; ++i) {
        context.fillStyle = columnColors[i];
        context.fillRect(4 + columnIndex * 6 + columnIndex * 2, 32 - i * 2, 6, 2);
      }
      context.fillStyle = topColor;
      context.fillRect(4 + columnIndex * 6 + columnIndex * 2, 30 - i * 2, 6, 2);
    });
  }, [canvasRef, columns]);

  return <canvas style={{ height: '38px', width: '158px' }} ref={canvasRef} />;
}

export default GraphicVisualize;
