export function add(a: number[][], b: number[][]): number[][] | null {
	if (a.length !== b.length) {
		return null;
	}

	const c = [];

	for (let i = 0; i < a.length; i++) {
		const row: number[] = [];

		for (let j = 0; j < a[i].length; j++) {
			row.push(a[i][j] + b[i][j]);
		}

		c.push(row);
	}

	return c;
}