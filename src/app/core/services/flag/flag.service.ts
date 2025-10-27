import { Injectable, signal, computed } from '@angular/core';
import { FlagData } from '@app/interface/FlagData';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  private _flags = signal<FlagData[]>(this.loadFromLocalStorage());

  readonly flags = computed(() => this._flags());

  private loadFromLocalStorage(): FlagData[] {
    const stored = localStorage.getItem('flags');
    return stored ? JSON.parse(stored) : [];
  }

  private saveToLocalStorage() {
    localStorage.setItem('flags', JSON.stringify(this._flags()));
  }

  addFlag(flag: Omit<FlagData, 'id'>) {
    const newFlag: FlagData = {
      ...flag,
      id: Date.now(), // unique id
    };
    this._flags.set([...this._flags(), newFlag]);
    this.saveToLocalStorage();
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
}
