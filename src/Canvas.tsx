import { useRef, useEffect, useState } from 'react';

interface CanvasProps {
	width: number;
	height: number;
	onDraw?: Function;
}

export function grid (width: number, height: number, funcs: any) {
	const { ln } = funcs;

	// Draw our grid
	const gridColor = '#f81e1e'
	const offset = 2;
	ln(0, 0, 0, Math.ceil((height - offset) / 2), gridColor);
	ln(0, 0, 0, -(Math.ceil((height - offset) / 2)), gridColor);
	ln(0, 0, (Math.ceil((width - offset) / 2)), 0, gridColor);
	ln(0, 0, -(Math.ceil((width - offset) / 2)), 0, gridColor);

	for (let i = 0; i < (width - 10); i += 10) {
		ln(i, 0, i, 10, gridColor);
		ln(-i, 0, -i, 10, gridColor);
		ln(0, i, 10, i, gridColor);
		ln(0, -i, 10, -i, gridColor);
	}
}

const Canvas = (props: CanvasProps) => {
	const canvasRef = useRef(null);

	let context: CanvasRenderingContext2D | null;

	const convertPoint = (x: number, y: number): Array<number> | null => {
		const canvas: HTMLCanvasElement | null = canvasRef.current;

		x = canvas?.width / 2 + x;
		y = canvas?.height / 2 - y - 1;

		if (x < 0 || x >= canvas?.width || y < 0 || y >= canvas?.height) {
			return null;
		}

		return [x, y];
	}

	const ln = (x1: number, y1: number, x2: number, y2: number, color: string): void => {
		if (!context) {
			return;
		}

		const ret1 = convertPoint(x1, y1);
		const ret2 = convertPoint(x2, y2);
		if (!ret1 || !ret2) {
			return;
		}

		[x1, y1] = ret1;
		[x2, y2] = ret2;

		if (!color) {
			color = '#000';
		}

		const prevStrokeStyle = context.strokeStyle;

		context.strokeStyle = color;
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
		context.strokeStyle = prevStrokeStyle;
	}

	// x,y is the top right of the box
	const box = (x: number, y: number, color: string): void => {
		ln(x, y, x, y - 10, color);
		ln(x, y, x - 10, y, color);
		ln(x - 10, y, x - 10, y - 10, color);
		ln(x - 10, y - 10, x, y - 10, color);
	}

	const px = (x: number, y: number, color: string): void => {
		if (!context) {
			return;
		}

		const ret = convertPoint(x, y);
		if (!ret) {
			return;
		}

		[x, y] = ret;

		const prevFillStyle = context.fillStyle;

		if (!color) {
			color = '#000';
		}

		context.fillStyle = color;
		context.fillRect(x, y, 3, 3);
		context.fillStyle = prevFillStyle;
	};

	// Initialize canvas
	useEffect(() => {
		if (!canvasRef || !canvasRef.current) {
			return;
		}

		const canvas: HTMLCanvasElement = canvasRef.current;

		context = canvas.getContext('2d');

		if (props.onDraw) {
			props.onDraw(context, props.width, props.height, {
				px,
				ln,
				box
			} );
		}
	}, [canvasRef]);

	return <canvas ref={canvasRef} {...props} />
};

export default Canvas;