import { Tuple } from './types';

/**
 * 平面上の格子点に隣接する4つの格子点を返す。
 *
 * 格子点の順番は「右、左、下、上」とする。
 * ただし1番目の軸は下向きのy軸、2番目の軸は右向きのx軸とする。
 *
 * @param point 格子点
 * @returns 隣接する4つの格子点
 */
export function adjacentPointsOf(point: Tuple<number>): Tuple<number>[] {

  const [i, j] = point;

  return [
    [i, j + 1], // 右
    [i, j - 1], // 左
    [i + 1, j], // 下
    [i - 1, j], // 上
  ];
}
