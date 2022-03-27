import { Matrix } from './matrix';
import Canvas, {grid} from './Canvas';

import './App.css';

const draw = (context: any, width: number, height: number, funcs: any) => {
	const { px } = funcs;
	context.fillStyle = '#fff';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	grid(width, height, funcs);

	let tries = 11;
	let i = 0;
	let deg = 90;
	let x = 100;
	let y = 15;

	px(x, y);

	const interval = setInterval(() => {
		if (i > tries) {
			clearInterval(interval);
			return;
		}

		px(x, y, '#fff');

		[x, y] = Matrix.rotate(x, y, deg);
		px(x, y);
		i++;
	}, 1000)
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
