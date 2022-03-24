import Canvas from './Canvas';

import './App.css';


const draw = (context: any, width: number, height: number) => {
	context.fillStyle = '#fff';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
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
