import { shuffleArray } from '@/utils';

describe('Utils - /src/utils/index.ts', () => {
  describe('#shuffleArr', () => {
    it('should not change array', () => {
      const arr = [1];

      expect(shuffleArray(arr)).toStrictEqual(arr);
    });

    it('should have correct length', () => {
      const arr = 'the quick brown fox jumps over the lazy dog'.split(' ');

      expect(shuffleArray(arr).length).toEqual(9);
    });

    it('should return an array', () => {
      const arr = 'the quick brown fox jumps over the lazy dog'.split(' ');

      expect(Array.isArray(shuffleArray(arr))).toEqual(true);
    });
  });
});
