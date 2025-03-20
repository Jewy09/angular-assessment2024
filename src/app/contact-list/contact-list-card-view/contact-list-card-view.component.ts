import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Contact } from '../contact.model';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-contact-list-card-view',
  imports: [MatCardModule, MatIcon, RouterLink],
  templateUrl: './contact-list-card-view.component.html',
  styleUrl: './contact-list-card-view.component.scss'
})
export class ContactListCardViewComponent {
  @Input() contact!: Contact;
  @Output() edit = new EventEmitter<Contact>();
@Output() delete = new EventEmitter<string>();

 deleteContact(contact: Contact): void {
  if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
    this.delete.emit(contact._id); 
  }
}
  editContact() {
    this.edit.emit(this.contact); 
  }
}

