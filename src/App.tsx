import { Matrix } from './matrix';
import Canvas from './Canvas';

import './App.css';

const grid = (width: number, height: number, funcs: any) => {
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

const draw = (context: any, width: number, height: number, funcs: any) => {
	const { px } = funcs;
	context.fillStyle = '#fff';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	grid(width, height, funcs);

	let tries = 3;
	let deg = 90;
	let x = 100;
	let y = 15;

	px(x, y);

	for (let i = 0; i < tries; i++) {
		[x, y] = Matrix.rotate(x, y, deg);
		px(x, y);
	}
}

function App() {
	return (
		<div className="app">
			<main>
				<Canvas width={600} height={600} onDraw={draw} />
			</main>
		</div>
	);
}

export default App;
