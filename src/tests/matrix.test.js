import { add } from '../matrix';

describe('add', () => {
	test('2x2 addition', () => {
		const a = [
			[1, 2],
			[3, 4]
		];
		const b = [
			[5, 6],
			[7, 8]
		];

		const result = [
			[6, 8],
			[10, 12]
		];

		expect(add(a, b)).toEqual(result);
	});

	test('3x3 addition', () => {
		const a = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		];
		const b = [
			[10, 11, 12],
			[13, 14, 15],
			[16, 17, 18]
		];

		const result = [
			[11, 13, 15],
			[17, 19, 21],
			[23, 25, 27]
		];

		expect(add(a, b)).toEqual(result);
	});
});