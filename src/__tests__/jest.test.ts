import { describe, expect, test } from '@jest/globals';

describe('Jest 실행 테스트 파일', () => {
  test('1+2=3', () => {
    expect(1 + 2).toBe(3);
  });
});