import { MatIconModule } from '@angular/material/icon';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list'
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContactListTableViewComponent } from "./contact-list-table-view/contact-list-table-view.component";
import { AsyncPipe } from '@angular/common';
import { ContactListCardViewComponent } from './contact-list-card-view/contact-list-card-view.component';
import { ContactFormModalComponent } from './contact-form-modal/contact-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-contact-list',
  imports: [MatGridListModule, MatIconModule, ContactListCardViewComponent, ContactListTableViewComponent, AsyncPipe, HeaderComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})

export class ContactListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);


  // ✅ Keeping Observables
  contacts$: Observable<Contact[]>;

  // ✅ Keeping View Mode as a normal variable
  viewMode: 'card' | 'table' = 'card';

  constructor(private dialog: MatDialog, private contactService: ContactService) {
    this.contacts$ = this.contactService.contacts$;
  }

ngOnInit(): void {
    this.contactService.fetchContacts(); // ✅ Load contacts on init
  }
  onChangeView(mode: 'card' | 'table'): void {
    this.viewMode = mode;
  }
  openAddContact(): void {
    const dialogRef = this.dialog.open(ContactFormModalComponent);

    dialogRef.afterClosed().subscribe((newContact: Contact) => {
      if (newContact) {
        this.contactService.addContacts(newContact).subscribe(); // ✅ Automatically updates UI
      }
    });
  }
openEditContact(contact: Contact): void {
  const dialogRef = this.dialog.open(ContactFormModalComponent, {
    data: contact, // ✅ Pass existing contact data
  });

  dialogRef.afterClosed().subscribe((updatedContact: Contact) => {
    if (updatedContact) {
      console.log(updatedContact.id)
      this.contactService.updateContacts(updatedContact.id, updatedContact).subscribe();
    }
  });
}
onDeleteContact(id: string): void {
  const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    data: { message: 'Are you sure you want to delete this contact?' },
  });

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.contactService.deleteContact(id).subscribe(() => {
        console.log(`Deleted contact with ID: ${id}`);
        this.contactService.fetchContacts(); 
      });
    }
  });
}

}