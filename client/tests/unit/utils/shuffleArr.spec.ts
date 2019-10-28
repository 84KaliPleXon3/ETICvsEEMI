import { shuffleArray } from '@/utils';

describe('Utils - /src/utils/index.ts', () => {
  const floorFunc = Math.floor;
  const randomFunc = Math.random;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('#shuffleArr', () => {
    it('should not change array', () => {
      const arr = [1];

      const mathFloorMock = jest
        .spyOn(Math, 'floor')
        .mockImplementation((x: number) => {
          expect(typeof x).toBe('number');
          return floorFunc(x);
        });

      const mathRandomMock = jest
        .spyOn(Math, 'random')
        .mockImplementation(() => {
          return randomFunc();
        });

      const result = shuffleArray(arr);

      expect(result.filter((i) => !Boolean(i)).length).toBe(0);
      expect(result).toStrictEqual(arr);
      expect(result.length).toEqual(1);
      expect(mathFloorMock).toBeCalledTimes(1);
      expect(mathRandomMock).toBeCalledTimes(1);
    });

    it('should shuffle array', () => {
      const arr = 'the quick brown fox jumps over the lazy dog'.split(' ');

      const mathFloorMock = jest
        .spyOn(Math, 'floor')
        .mockImplementation((x: number) => {
          return floorFunc(x);
        });

      const mathRandomMock = jest
        .spyOn(Math, 'random')
        .mockImplementation(() => {
          return randomFunc();
        });

      const result = shuffleArray(arr);

      expect(result.filter((i) => !Boolean(i)).length).toBe(0);
      expect(Array.isArray(result)).toEqual(true);
      expect(result.length).toEqual(9);
      expect(mathFloorMock).toBeCalledTimes(9);
      expect(mathRandomMock).toBeCalledTimes(9);
    });
  });
});
