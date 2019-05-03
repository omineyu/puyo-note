import { KeyValue } from '@angular/common';

/**
 * enumで定義された型の全ての定数をKey-Value形式で取得する。
 *
 * - 定数がnumberである場合にのみ対応。
 *
 * @param enumType enumで定義された型
 * @returns Key-Valueの配列
 */
export function keyValuesOfEnum(enumType: any): KeyValue<string, any>[] {
  return Object.keys(enumType)
    .filter(keyOrValue => isNaN(Number(keyOrValue))) // キーと値の内、キーのみ取り出す
    .map(key => ({ key: key, value: enumType[key] }));
}
