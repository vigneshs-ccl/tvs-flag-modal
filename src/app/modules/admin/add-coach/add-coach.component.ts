import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DropdownComponent,
  DropdownOption,
  ModalComponent,
  SelectComponent,
} from '@Digital-mfg/mhi-ui-components';
import {
  OPTIONS_MULTISELECT,
  SPECIALIZATION_OPTIONS,
  COACH_MOCK_DATA,
} from '@app/modules/admin/add-coach/mock-data';
import { ICONS } from '@app/modules/admin/flag/flag-mock-data';
import { AddCoachService } from '@app/core/services/add-coach/add-coach.service';
import { CoachFormData } from '@app/interface/CoachFormData';

@Component({
  selector: 'app-add-coach',
  imports: [DropdownComponent, ModalComponent, CommonModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.scss',
})
export class AddCoachComponent implements OnChanges {
  @ViewChild('specializationSelect') specializationSelect!: SelectComponent;
  private addCoachService = inject(AddCoachService);

  @Input() isOpen = false;
  @Input() title = 'Add New Coach';
  @Input() editCoachData?: CoachFormData;

  emailNotFound = false;
  emailAlreadyExists = false;
  isEditMode = false;
  submitted = false;

  coachForm: FormGroup;
  coachList: CoachFormData[] = [];

  selectedLocations: DropdownOption[] = [];
  selectedDepartments: DropdownOption[] = [];
  selectedLanguages: DropdownOption[] = [];
  selectedOption: string | string[] = '';

  multiSelectOptions = OPTIONS_MULTISELECT;
  locationOptions: DropdownOption[] = OPTIONS_MULTISELECT.map((item) => ({ ...item }));
  departmentOptions: DropdownOption[] = OPTIONS_MULTISELECT.map((item) => ({ ...item }));
  languageOptions: DropdownOption[] = OPTIONS_MULTISELECT.map((item) => ({ ...item }));

  searchIcon = ICONS.search;
  arrowIcon = ICONS.dropdown;
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
      location: [[], [Validators.required]],
      department: [[], [Validators.required]],
      specialization: ['', [Validators.required]],
      language: [[], [Validators.required]],
      otherSpecialization: this.fb.control('', {
        validators: [Validators.minLength(5), Validators.maxLength(250)],
        updateOn: 'blur', //  validate only after blur
      }),
    });
  }

  ngOnInit() {
    this.loadCoachList();
  }

  loadCoachList() {
    this.coachList = this.addCoachService.getAllData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editCoachData'] && this.editCoachData) {
      this.enableEditMode(this.editCoachData);
    }
  }

  /** 🔹 Triggered when Edit Coach button clicked */
  enableEditMode(coach: CoachFormData) {
    this.isEditMode = true;
    this.title = 'Edit Coach';
    this.isOpen = true;

    // Disable email field (not editable)
    this.coachForm.get('email')?.disable();

    // Patch form values except dropdowns
    this.coachForm.patchValue({
      ...coach,
      otherSpecialization: coach.otherSpecialization || '',
    });

    // 🔹 Handle both string[] and DropdownOption[] safely
    const normalizeToDropdownOptions = (values: unknown): DropdownOption[] => {
      if (!values) return [];
      if (Array.isArray(values)) {
        // Case 1: values are strings
        if (typeof values[0] === 'string') {
          const strValues = values as string[];
          return OPTIONS_MULTISELECT.filter((opt) => strValues.includes(opt.value)).map((opt) => ({
            ...opt,
            selected: true,
          }));
        }

        // Case 2: values are already DropdownOption[]
        const opts = values as DropdownOption[];
        return OPTIONS_MULTISELECT.map((opt) => ({
          ...opt,
          selected: opts.some((sel) => sel.value === opt.value),
        }));
      }
      return [];
    };

    //  Convert stored values into DropdownOption[] always
    this.selectedLocations = normalizeToDropdownOptions(coach.location);
    this.selectedDepartments = normalizeToDropdownOptions(coach.department);
    this.selectedLanguages = normalizeToDropdownOptions(coach.language);

    // Reassign updated option arrays to trigger UI refresh
    this.locationOptions = OPTIONS_MULTISELECT.map((opt) => ({
      ...opt,
      selected: this.selectedLocations.some((sel) => sel.value === opt.value),
    }));

    this.departmentOptions = OPTIONS_MULTISELECT.map((opt) => ({
      ...opt,
      selected: this.selectedDepartments.some((sel) => sel.value === opt.value),
    }));

    this.languageOptions = OPTIONS_MULTISELECT.map((opt) => ({
      ...opt,
      selected: this.selectedLanguages.some((sel) => sel.value === opt.value),
    }));

    // ✅ Update the form control values
    this.coachForm.patchValue({
      location: this.selectedLocations,
      department: this.selectedDepartments,
      language: this.selectedLanguages,
    });

    // 🔹 Set specialization dropdown (custom component)
    if (this.specializationSelect && coach.specialization) {
      setTimeout(() => {
        this.specializationSelect.writeValue(coach.specialization);
      });
    }
  }

  openModal() {
    this.isEditMode = false;
    this.title = 'Add New Coach';
    this.isOpen = true;
    this.coachForm.get('email')?.enable();
    this.coachForm.markAsUntouched();
    this.coachForm.markAsPristine();
  }

  closeModal() {
    this.resetForm();
    this.loadCoachList();

    // Reset modal state
    this.isEditMode = false;
    this.isOpen = false;
    this.title = 'Add New Coach'; // restore title

    // Re-enable email field for new coach mode
    this.coachForm.get('email')?.enable();
  }

  // validation
  onMultiSelectChange(values: DropdownOption[], field: string) {
    this.coachForm.get(field)?.setValue(values);
    this.coachForm.get(field)?.markAsTouched();

    // Store selections independently
    switch (field) {
      case 'location':
        this.selectedLocations = values;
        break;
      case 'department':
        this.selectedDepartments = values;
        break;
      case 'language':
        this.selectedLanguages = values;
        break;
    }
  }

  onSelectChange(value: string | string[]) {
    this.coachForm.get('specialization')?.setValue(value);
    this.coachForm.get('specialization')?.markAsTouched();
  }

  onSubmit() {
    this.submitted = true;
    this.coachForm.markAllAsTouched();

    const formData = this.coachForm.getRawValue();

    // Ensure prepopulated fields are present and email exists
    if (!this.isEditMode && this.coachForm.valid && !this.emailNotFound) {
      const result = this.addCoachService.saveData(formData);

      if (!result.success) {
        // 👇 set flag to show message under input
        this.emailAlreadyExists = true;
        return;
      }

      //  reset duplicate flag after successful submission
      this.emailAlreadyExists = false;

      console.log('Form Submitted:', formData);
      this.closeModal();
      this.loadCoachList();
    } else if (this.isEditMode && this.coachForm.valid) {
      this.addCoachService.updateData(formData); // You can add update logic if needed
      this.closeModal();
      this.loadCoachList();
    } else if (this.emailNotFound) {
      console.warn('Email not found in mock data.');
    } else {
      console.warn('Validation failed. Please check required fields.');
    }
  }

  resetForm() {
    // Reset the form and clear values
    this.coachForm.reset();

    // Clear selected dropdown data
    this.selectedLocations = [];
    this.selectedDepartments = [];
    this.selectedLanguages = [];

    this.emailAlreadyExists = false;
    this.emailNotFound = false;
    this.isEditMode = false;

    // Reset dropdown option states
    this.locationOptions.forEach((opt) => (opt.selected = false));
    this.departmentOptions.forEach((opt) => (opt.selected = false));
    this.languageOptions.forEach((opt) => (opt.selected = false));

    if (this.specializationSelect) {
      this.specializationSelect.clearSelection();
    }
    this.coachForm.get('specialization')?.setValue('');
  }

  // auto pre-populate the data into the form
  autoPopulateCoachData(email: string) {
    const matchedCoach = COACH_MOCK_DATA.find(
      (coach) => coach.email.toLowerCase() === email.toLowerCase(),
    );

    if (matchedCoach) {
      // Populate data in form
      this.emailNotFound = false;
      this.coachForm.patchValue({
        coachId: matchedCoach.coachId,
        coachName: matchedCoach.coachName,
        gender: matchedCoach.gender,
        dob: matchedCoach.dob,
        mobile: matchedCoach.mobile,
      });
    } else {
      // If not found, clear the personal fields (optional)
      this.emailNotFound = true;
      this.coachForm.patchValue({
        coachId: '',
        coachName: '',
        gender: '',
        dob: '',
        mobile: '',
      });
    }
  }
  onEmailBlur() {
    const emailControl = this.coachForm.get('email');
    const email = this.coachForm.get('email')?.value?.trim();

    // Reset previous error flags
    this.emailAlreadyExists = false;
    this.emailNotFound = false;

    if (email && emailControl?.valid) {
      // 1️⃣ Check if email already exists in local storage
      const existingCoaches = this.addCoachService.getAllData();
      const alreadyExists = existingCoaches.some(
        (coach) => coach.email.toLowerCase() === email.toLowerCase(),
      );

      if (alreadyExists) {
        // Show duplicate error under email field
        this.emailAlreadyExists = true;
        return;
      }
    }

    if (email && this.coachForm.get('email')?.valid) {
      this.autoPopulateCoachData(email);
    } else {
      this.emailNotFound = false; // Don’t show error for invalid email
    }
  }

  getLabels(list?: { label: string }[]): string {
    if (!list || list.length === 0) return '—';
    return list.map((item) => item.label).join(', ');
  }
}
