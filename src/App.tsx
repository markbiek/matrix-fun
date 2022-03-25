import { Matrix } from './matrix';
import Canvas, {grid} from './Canvas';

import './App.css';


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
