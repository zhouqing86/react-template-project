/* eslint-disable */
import { truncateStringWithSuffix } from './StringUtils';
describe('StringUtils', () => {
  describe('#truncateStringWithSuffix', () => {
    it("should return origin string when it's length lower or equal than maxLength ", () => {
      expect(truncateStringWithSuffix('hello', 5)).toEqual('hello');
    });

    it("should return truncated string when it's length greater than maxLength", () => {
      expect(truncateStringWithSuffix('hello world', 5)).toEqual('he...');
    });
  });
});
