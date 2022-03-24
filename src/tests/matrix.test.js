import { add, subtract, mult } from '../matrix';

const a1x1 = [
	[1],
	[2]
];

const a2x2 = [
	[1, 2],
	[3, 4]
];
const b2x2 = [
	[5, 6],
	[7, 8]
];

const a3x3 = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
];
const b3x3 = [
	[10, 11, 12],
	[13, 14, 15],
	[16, 17, 18]
];


describe('add', () => {
	test('2x2 addition', () => {
		const result = [
			[6, 8],
			[10, 12]
		];

		expect(add(a2x2, b2x2)).toEqual(result);
	});

	test('3x3 addition', () => {

		const result = [
			[11, 13, 15],
			[17, 19, 21],
			[23, 25, 27]
		];

		expect(add(a3x3, b3x3)).toEqual(result);
	});
});

describe('subtract', () => {
	test('2x2 subtraction', () => {
		const result = [
			[-4, -4],
			[-4, -4]
		];

		expect(subtract(a2x2, b2x2)).toEqual(result);
	});
});

describe('mult', () => {
	test('2x2 multiplication', () => {
		const result = [
			[5],
			[11]
		];

		expect(mult(a2x2, a1x1)).toEqual(result);
	});

	test('3x3 multiplication', () => {
		const result = [
			[84, 90, 96],
			[201, 216, 231],
			[318, 342, 366]
		];

		expect(mult(a3x3, b3x3)).toEqual(result);
	});
});