import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DateFieldComponent,
  DropdownComponent,
  DropdownOption,
  ModalComponent,
  SelectComponent,
} from '@Digital-mfg/mhi-ui-components';
import {
  OPTIONS_MULTISELECT,
  SPECIALIZATION_OPTIONS,
} from '@app/modules/admin/add-coach/mock-data';
import { ICONS } from '@app/modules/admin/flag/flag-mock-data';

@Component({
  selector: 'app-add-coach',
  imports: [
    DateFieldComponent,
    DropdownComponent,
    ModalComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.scss',
})
export class AddCoachComponent {
  coachForm: FormGroup;
  @Input() isOpen = false;
  @Input() title = 'Add New Coach';
  submitted = false;
  selectedDropdownValues: DropdownOption[] = [];
  multiSelectOptions = OPTIONS_MULTISELECT;
  searchIcon = ICONS.search;
  arrowIcon = ICONS.dropdown;
  selectedOption: string | string[] = '';
  specialization_options = SPECIALIZATION_OPTIONS;
  constructor(private fb: FormBuilder) {
    this.coachForm = this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur', //Only validate after blur, not while typing
      }),
      coachId: [{ value: '', disabled: true }],
      gender: [{ value: '', disabled: true }],
      coachName: [{ value: '', disabled: true }],
      dob: [{ value: '', disabled: true }],
      mobile: [{ value: '', disabled: true }],
    });
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  // validation
  onMultiSelectChange(values: DropdownOption[]) {
    this.selectedDropdownValues = values;
    //this.validateSendTo();
  }

  onSelectChange(value: string | string[]) {
    this.selectedOption = value;
    //console.log("Selected option:", value);
  }

  onSubmit() {
    if (this.coachForm.valid) {
      console.log('✅ Form Submitted:', this.coachForm.value);
    } else {
      this.coachForm.markAllAsTouched();
    }
  }
}
