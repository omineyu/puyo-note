import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { PuyoDiagram, PuyoDiagramRecord } from 'src/app/models/puyo-diagram/puyo-diagram';
import { PuyoDiagramStatus } from 'src/app/models/puyo-diagram/puyo-diagram-status';

@Injectable({
  providedIn: 'root'
})
export class PuyoDiagramService {

  private db: Dexie | any;

  constructor() {
    this.initDb();
  }

  private initDb(): void {
    this.db = new Dexie('PuyoNoteDatabase');
    this.db.version(1).stores({
      puyoDiagrams: '++id, name, status, field'
    });
  }

  async getPuyoDiagrams(status: PuyoDiagramStatus): Promise<PuyoDiagram[]> {
    return this.db.puyoDiagrams
      .where('status').equals(status)
      .toArray((diagrams: PuyoDiagramRecord[]) => diagrams
        .reverse() // 古い順から新しい順に並び替える
        .map(PuyoDiagram.fromRecord)
      );
  }

  async addPuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    this.db.puyoDiagrams.add(puyoDiagram.toRecord());
  }

  async updatePuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    this.db.puyoDiagrams.update(puyoDiagram.id, puyoDiagram.toRecord());
  }

  async deletePuyoDiagram(puyoDiagram: PuyoDiagram): Promise<void> {
    this.db.puyoDiagrams.delete(puyoDiagram.id);
  }

}
