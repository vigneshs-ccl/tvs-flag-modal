import { Injectable } from '@angular/core';
import { CoachFormData } from '@app/interface/CoachFormData';

@Injectable({
  providedIn: 'root',
})
export class AddCoachService {
  private readonly storageKey = 'coachFormData';

  //  Save new coach only if email not already present
  saveData(newData: CoachFormData): { success: boolean; message: string } {
    const existingData = this.getAllData();

    const alreadyExists = existingData.some(
      (coach) => coach.email.toLowerCase() === newData.email.toLowerCase(),
    );

    if (alreadyExists) {
      return { success: false, message: 'Coach with this email already exists.' };
    }

    existingData.push(newData);
    localStorage.setItem(this.storageKey, JSON.stringify(existingData));

    return { success: true, message: 'Coach added successfully.' };
  }

  //  Update existing coach details by email
  updateData(updatedCoach: CoachFormData): { success: boolean; message: string } {
    const allCoaches = this.getAllData();
    const index = allCoaches.findIndex(
      (coach) => coach.email.toLowerCase() === updatedCoach.email.toLowerCase(),
    );

    if (index === -1) {
      return { success: false, message: 'Coach not found.' };
    }

    allCoaches[index] = { ...allCoaches[index], ...updatedCoach };
    localStorage.setItem(this.storageKey, JSON.stringify(allCoaches));

    return { success: true, message: 'Coach updated successfully.' };
  }

  getAllData(): CoachFormData[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? (JSON.parse(data) as CoachFormData[]) : [];
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
