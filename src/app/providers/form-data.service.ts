import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: FormData = new FormData();

  // Append new data to the FormData object
  appendFormData(key: string, value: any) {
    if (value !== undefined && value !== null) {
      this.formData.append(key, value);
    }
  }

  // Get the complete FormData object
  getFormData(): FormData {
    return this.formData;
  }

  // Clear the FormData if needed (e.g., on successful submission)
  clearFormData() {
    this.formData = new FormData();
  }
}
