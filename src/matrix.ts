type RotationMatrix = Array<Array<number>>;

interface Rotations {
	counterclockwise90: RotationMatrix;
	counterclockwise180: RotationMatrix;
	counterclockwise270: RotationMatrix;
}

interface Constants {
	rotations: Rotations;
}

interface Matrix {
	add: Function;
	subtract: Function;
	mult: Function;
	rotate: Function;
	rotationMatrix: Function;
}

export const MatrixConstants: Constants = {
	rotations: {
		counterclockwise90: [
			[0, -1],
			[1, 0]
		],
		counterclockwise180: [
			[-1, 0],
			[0, -1]
		],
		counterclockwise270: [
			[0, 1],
			[-1, 0]
		]
	}
};

const radians = (degrees: number): number => {
	return degrees * Math.PI / 180;
}

const rotCos = (rads: number): number => {
	return Math.floor(Math.cos(rads));
}

const rotSin = (rads: number): number => {
	return Math.floor(Math.sin(rads));
}

export const Matrix: Matrix = {
	rotate: (x: number, y:number, degrees: number): number[] | null => {
		const v = Matrix.mult(Matrix.rotationMatrix(degrees), [[x], [y]]);

		return [v[0][0], v[1][0]];
	},
	rotationMatrix: (degrees: number): number[][] => {
		const rads = radians(degrees);

		const ret = [
			[rotCos(rads), -1 * rotSin(rads)],
			[rotSin(rads), rotCos(rads)]
		];

		if (ret[0][1] === -0) {
			ret[0][1] = 0;
		}

		return ret;
	},
	/**
	 * Add two matrices together. 
	 *
	 * @param a  The first matrix.
	 * @param b  The second matrix.
	 * @returns  The result of the addition.
	 */
	add: (a: number[][], b: number[][]): number[][] | null => {
		return addOrSubstract(a, b, 1);
	},
	/**
	 * Add two matrices together. 
	 *
	 * @param a  The first matrix.
	 * @param b  The second matrix.
	 * @returns  The result of the addition.
	 */
	subtract: (a: number[][], b: number[][]): number[][] | null => {
		return addOrSubstract(a, b, -1);
	},
	/**
	 * Multiply two matrices together.
	 * 
	 * 2x2
	 * [ a1 a2 ] * [ b1 b2 ] = [ c1 c2 ]
	 * [ a3 a4 ]   [ b3 b4 ]   [ c3 c4 ]
	 * 
	 * c1 = a1 * b1 + a2 * b3
	 * c2 = a1 * b2 + a2 * b4
	 * c3 = a3 * b1 + a4 * b3
	 * c4 = a3 * b2 + a4 * b4
	 * 
	 * 3x3
	 * [ a1 a2 a3 ] * [ b1 b2 b3 ] = [ c1 c2 c3 ]
	 * [ a4 a5 a6 ] * [ b4 b5 b6 ]   [ c4 c5 c6 ]
	 * [ a7 a8 a9 ] * [ b7 b8 b9 ]   [ c7 c8 c9 ]
	 * 
	 * c1 = a1 * b1 + a2 * b4 + a3 * b7
	 * c2 = a1 * b2 + a2 * b5 + a3 * b8
	 * c3 = a1 * b3 + a2 * b6 + a3 * b9
	 * c4 = a4 * b1 + a5 * b4 + a6 * b7
	 * c5 = a4 * b2 + a5 * b5 + a6 * b8
	 * c6 = a4 * b3 + a5 * b6 + a6 * b9
	 * c7 = a7 * b1 + a8 * b4 + a9 * b7
	 * c8 = a7 * b2 + a8 * b5 + a9 * b8
	 * c9 = a7 * b3 + a8 * b6 + a9 * b9
	 *
	 * 2x2 * 2x1
	 * [ a1 a2 ] * [ b1 ] = [ c1 ]
	 * [ a3 a4 ]   [ b2 ]   [ c2 ]
	 * 
	 * c1 = a1 * b1 + a2 * b2
	 * c2 = a3 * b1 + a4 * b2
	 *
	 * @param a  The first matrix.
	 * @param b  The second matrix.
	 * @returns  The result of the multiplication.
	 */
	mult: (a: number[][], b: number[][]): number[][] | null => {
		// Number of columns of matrix a must be the same as the number of rows of matrix b.
		if (a[0].length !== b.length) {
			console.log(`a[0].length=${a[0].length}, b.length=${b.length}`);
			return null;
		}

		const x = a.length;
		const z = a[0].length;
		const y = b[0].length;

		let initResult = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
		let result = new Array(x);
		for (let p = 0; p < x; p++) {
			result[p] = initResult.slice();
		}

		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				for (let k = 0; k < z; k++) {
					result[i][j] += a[i][k] * b[k][j];
				}
			}
		}

		return result;
	}
};

function addOrSubstract(a: number[][], b: number[][], sign: 1 | -1): number[][] | null {
	if (a.length !== b.length) {
		return null;
	}

	const c = [];

	for (let i = 0; i < a.length; i++) {
		if (a[i].length !== b[i].length) {
			return null;
		}

		const row: number[] = [];

		for (let j = 0; j < a[i].length; j++) {
			row.push(a[i][j] + (b[i][j] * sign));
		}

		c.push(row);
	}

	return c;
}
