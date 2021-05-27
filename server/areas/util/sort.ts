import IHasId from "./IHasId";
import IHasCreatedAt from "./IHasCreatedAt";

export default class Sort {

  /**
   * sort search result using keyword, by frequency DESC
   * Example - input: [1, 2, 3, 4, 5, 2, 6, 7, 8, 2, 3, 8]
   * expected output: [2, 3, 8, 1, 4, 5, 6, 7]
   * @param keywordResults 
   */
  public static async sortByFrequency<T>(keywordResults: IHasId[]): Promise<T[]> {

    // an array of array of results, Ex: [[2, 2, 2], [5, 5], [6]]
    let frequency: IHasId[][] = [];
    const result = [];

    for (let result of keywordResults) {

      // if result in frequency, expand inner array, else push new array.
      let containResult = await this.containResult(frequency, result);
      if (containResult || containResult == 0) {
        frequency[containResult].push(result);
      } else {
        frequency.push([result]);
      }
    }

    frequency.sort((a, b) => {
      return b.length - a.length;
    });

    for (let array of frequency) {
      result.push(array[0]);
    }

    return result;
  }

  // check if frequency contain a search result
  private static async containResult(frequency: IHasId[][], result: IHasId): Promise<number> {
    for (let index = 0; index < frequency.length; index++) {
      if (frequency[index][0].id == result.id) {
        return index;
      }
    }
  }

  // sort by time of creation DESC
  public static async sortByCreatedAt<T>(items: IHasCreatedAt[], asc: boolean = false): Promise<T[]> {

    items.sort((a, b) => {
      if (asc) return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

    let result;
    result = items;
    return result;
  }
}