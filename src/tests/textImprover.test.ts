// textImprover.test.ts
import { textImprover } from '../lib/textImprover';

describe('SimpleTextImprover', () => {
    test('removes extra spaces and trims text', async () => {
        const input = '  This   is   a   test  ';
        const expected = 'This is a test';
        const result = await textImprover.improve(input);
        expect(result).toBe(expected);
    });

    test('adds space after punctuation if missing', async () => {
        const input = 'Hello world!This is amazing.';
        const expected = 'Hello world! This is amazing.';
        const result = await textImprover.improve(input);
        expect(result).toBe(expected);
    });

    test('removes space before punctuation', async () => {
        const input = 'What a surprise ! Really ?';
        const expected = 'What a surprise! Really?';
        const result = await textImprover.improve(input);
        expect(result).toBe(expected);
    });
});