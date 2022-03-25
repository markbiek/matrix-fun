import { useRef, useEffect, useState } from 'react';

interface CanvasProps {
	width: number;
	height: number;
	onDraw?: Function;
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

	const px = (x: number, y: number): void => {
		if (!context) {
			return;
		}

		const ret = convertPoint(x, y);
		if (!ret) {
			return;
		}

		[x, y] = ret;

		const prevFillStyle = context.fillStyle;

		context.fillStyle = '#000';
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
				ln
			} );
		}
	}, [canvasRef]);

	return <canvas ref={canvasRef} {...props} />
};

export default Canvas;