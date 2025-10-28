import { Injectable, signal } from '@angular/core';
import { FlagData } from '@app/interface/FlagData';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  private _flags = signal<FlagData[]>(this.loadFromLocalStorage());

  getAllFlags(): FlagData[] {
    return this._flags();
  }

  private loadFromLocalStorage(): FlagData[] {
    try {
      const stored = localStorage.getItem('flags');
      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        // Safely verify the parsed data is an array of partial FlagData
        if (Array.isArray(parsed)) {
          return parsed.map(
            (item): FlagData => ({
              id: Number(item['id']),
              cardId: Number(item['cardId']),
              title: String(item['title']),
              unit: String(item['unit']),
              value: Number(item['value']),
              description: String(item['description']),
              date: item['date'] ? new Date(item['date']) : null,
              sendTo: Array.isArray(item['sendTo']) ? item['sendTo'] : [],
            }),
          );
        }
      }
      return [];
    } catch (error) {
      console.error('Error loading flags from storage', error);
      return [];
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('flags', JSON.stringify(this._flags()));
  }

  addFlag(flag: Omit<FlagData, 'id'>) {
    const newFlag: FlagData = {
      ...flag,
      id: Date.now(), // unique id
    };
    const updated = [...this._flags(), newFlag];
    this._flags.set(updated);
    this.saveToLocalStorage();
    console.log('✅ Flag added:', newFlag);
  }

  getFlagById(id: number) {
    return this._flags().find((f) => f.id === id);
  }

  updateFlag(id: number, data: Partial<FlagData>) {
    const updatedFlags = this._flags().map((f) => (f.id === id ? { ...f, ...data } : f));
    this._flags.set(updatedFlags);
    this.saveToLocalStorage();
  }

  removeFlag(id: number) {
    const filtered = this._flags().filter((f) => f.id !== id);
    this._flags.set(filtered);
    this.saveToLocalStorage();
  }

  clearAllFlags() {
    this._flags.set([]);
    localStorage.removeItem('flags');
  }
}
