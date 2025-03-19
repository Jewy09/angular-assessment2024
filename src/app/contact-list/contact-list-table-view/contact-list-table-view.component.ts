import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../contact.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-contact-list-table-view',
  imports: [ MatIconModule,MatTableModule],
  templateUrl: './contact-list-table-view.component.html',
  styleUrl: './contact-list-table-view.component.scss'
})
export class ContactListTableViewComponent {
  @Input() contacts: Contact[] = []; // ✅ Use 'contacts', NOT 'contact'
  displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];

  editContact(contact: Contact) {
    console.log('Editing contact:', contact);
  }

  deleteContact(contact: Contact) {
    console.log('Deleting contact:', contact);
  }
}