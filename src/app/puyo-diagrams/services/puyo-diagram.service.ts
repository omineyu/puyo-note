import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { settings } from 'src/app/settings';
import { PuyoDiagram, PuyoDiagramRecord } from '../models/puyo-diagram';
import { PuyoDiagramStatus } from '../models/puyo-diagram-status';

@Injectable({
  providedIn: 'root'
})
export class PuyoDiagramService {

  private db: Dexie;

  constructor() {
    this.db = this.initDb();
  }

  private initDb(): Dexie {
    const db = new Dexie(settings.DATABASE_NAME);
    db.version(1).stores({
      puyoDiagrams: '++id, name, status, field'
    });
    return db;
  }

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

  async getNumPuyoDiagrams(status: PuyoDiagramStatus): Promise<number> {
    return (this.db as any).puyoDiagrams
      .where('status').equals(status)
      .count();
  }

  async addPuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    (this.db as any).puyoDiagrams.add(puyoDiagram.toRecord());
  }

  async updatePuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    (this.db as any).puyoDiagrams.update(puyoDiagram.id, puyoDiagram.toRecord());
  }

  async deletePuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    (this.db as any).puyoDiagrams.delete(puyoDiagram.id);
  }

}
