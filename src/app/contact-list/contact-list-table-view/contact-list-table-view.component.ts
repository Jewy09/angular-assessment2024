import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../contact.model';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-contact-list-table-view',
  imports: [ MatIconModule, MatTableModule, RouterLink],
  templateUrl: './contact-list-table-view.component.html',
  styleUrl: './contact-list-table-view.component.scss'
})
export class ContactListTableViewComponent {
  @Input() contacts: Contact[] = []; 
  @Output() edit = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<string>();
  displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];

  editContact(contact: Contact) {
    this.edit.emit(contact);
  }
 deleteContact(contact: Contact): void {
  if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
    this.delete.emit(contact._id);
  }
}

}