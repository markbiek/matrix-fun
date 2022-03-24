import { useRef, useEffect } from 'react';

interface CanvasProps {
	width: number;
	height: number;
	onDraw?: Function;
}

const Canvas = (props: CanvasProps) => {
	const canvasRef = useRef(null);

	let context = null;

	useEffect(() => {
		if (!canvasRef || !canvasRef.current) {
			return;
		}

		const canvas: any = canvasRef.current;

		context = canvas.getContext('2d');

		if (props.onDraw) {
			props.onDraw(context, props.width, props.height );
		}
	}, [canvasRef]);

	return <canvas ref={canvasRef} {...props} />
};

export default Canvas;