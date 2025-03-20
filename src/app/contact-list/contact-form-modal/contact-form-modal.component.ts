import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Contact } from '../contact.model';
import { map, startWith, Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-form-modal',
  imports: [MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatDialogModule, FormsModule, MatInputModule],
  templateUrl: './contact-form-modal.component.html',
  styleUrl: './contact-form-modal.component.scss'
})

export class ContactFormModalComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroy$ = new Subject<void>();
  formattedPhone$ = new Subject<string>();
  formattedName$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContactFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.data?._id,
      name: [this.data?.name || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, this.emailValidator]],
      phone: [this.unformatPhoneNumber(this.data?.phone || ''), [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });

    this.form.get('phone')?.valueChanges
      .pipe(
        startWith(this.data?.phone || ''),
        map(phone => this.formatPhone(phone)),
        takeUntil(this.destroy$)
      )
      .subscribe(formattedPhone => this.formattedPhone$.next(formattedPhone));

    this.form.get('name')?.valueChanges
      .pipe(
        startWith(this.data?.name || ''),
        map(name => this.formatName(name)),
        takeUntil(this.destroy$)
      )
      .subscribe(formattedName => this.formattedName$.next(formattedName));

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      console.log('Form changed:', value);
    });
  }

  onPhoneKeyPress(event: KeyboardEvent): void {
    const regex = /[0-9]/;
    const key = event.key;

    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formattedData = {
        ...this.form.value,
        name: this.formatName(this.form.value.name),
        phone: this.formatPhone(this.form.value.phone)
      };
      this.dialogRef.close(formattedData);
    }
  }
  formatPhone(phone: string): string {
    return phone.replace(/^(\d{4})(\d{3})(\d{2})(\d{2})$/, '$1-$2-$3-$4');
  }

  unformatPhoneNumber(phone: string): string {

    return phone.replace(/\D/g, '');
  }

  formatName(name: string): string {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  emailValidator(control: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!control.value) {
      return null;
    }
    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
