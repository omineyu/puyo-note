import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { PuyoDiagram, PuyoDiagramRecord } from 'src/app/models/puyo-diagram/puyo-diagram';
import { PuyoDiagramStatus } from 'src/app/models/puyo-diagram/puyo-diagram-status';
import { settings } from 'src/app/settings';

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

  async getPuyoDiagrams(status: PuyoDiagramStatus): Promise<PuyoDiagram[]> {
    return (this.db as any).puyoDiagrams
      .where('status').equals(status)
      .toArray((diagrams: PuyoDiagramRecord[]) => diagrams
        .reverse() // 古い順から新しい順に並び替える
        .map(PuyoDiagram.fromRecord)
      );
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
