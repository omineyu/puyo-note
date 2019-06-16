import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { settings } from 'src/app/settings';
import { PuyoDiagram, PuyoDiagramRecord } from '../models/puyo-diagram';
import { PuyoDiagramStatus } from '../models/puyo-diagram-status';

/**
 * ぷよ図サービス。
 *
 * IndexedDBにアクセスし、ぷよ図のデータをやり取りする。
 * IndexedDBへのアクセスにはDexieを使う。
 */
@Injectable({
  providedIn: 'root'
})
export class PuyoDiagramService {

  /**
   * DexieのDB。
   */
  private db: Dexie;

  /**
   * PuyoDiagramServiceを作成する。
   */
  constructor() {
    this.db = this.setUpDb();
  }

  /**
   * DexieのDBをセットアップする。
   *
   * @returns DexieのDB
   */
  private setUpDb(): Dexie {
    const db = new Dexie(settings.DATABASE_NAME);
    db.version(1).stores({
      puyoDiagrams: '++id, name, status, field'
    });
    return db;
  }

  /**
   * ぷよ図一覧を取得する。
   *
   * @param status ステータス
   * @param offset 開始位置
   * @param limit 取得数の上限
   * @returns ぷよ図一覧のPromise
   */
  async getPuyoDiagrams(status: PuyoDiagramStatus, offset: number, limit: number): Promise<PuyoDiagram[]> {
    return (this.db as any).puyoDiagrams
      .where('status').equals(status)
      .reverse() // 古い順から新しい順に並び替える
      .offset(offset)
      .limit(limit)
      .toArray((diagrams: PuyoDiagramRecord[]) =>
        diagrams.map(PuyoDiagram.fromRecord)
      );
  }

  /**
   * ぷよ図の数を取得する。
   *
   * @param status ステータス
   * @returns ぷよ図の数のPromise
   */
  async getNumPuyoDiagrams(status: PuyoDiagramStatus): Promise<number> {
    return (this.db as any).puyoDiagrams
      .where('status').equals(status)
      .count();
  }

  /**
   * ぷよ図を追加する。
   *
   * @param puyoDiagram ぷよ図
   * @returns 空のPromise
   */
  async addPuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    (this.db as any).puyoDiagrams.add(puyoDiagram.toRecord());
  }

  /**
   * ぷよ図を更新する。
   *
   * @param puyoDiagram ぷよ図
   * @returns 空のPromise
   */
  async updatePuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    (this.db as any).puyoDiagrams.update(puyoDiagram.id, puyoDiagram.toRecord());
  }

  /**
   * ぷよ図を削除する。
   *
   * @param puyoDiagram ぷよ図
   * @returns 空のPromise
   */
  async deletePuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    (this.db as any).puyoDiagrams.delete(puyoDiagram.id);
  }

}
