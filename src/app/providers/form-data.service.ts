import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: FormData = new FormData();

  appendFormData(key: string, value: any) {
    if (value !== undefined && value !== null) {
      this.formData.append(key, value);
    }
  }

  getFormData(): FormData {
    return this.formData;
  }

  clearFormData() {
    this.formData = new FormData();
  }
}
