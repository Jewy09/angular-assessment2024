import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Contact } from '../contact.model';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-contact-list-card-view',
  imports: [MatCardModule, MatIcon],
  templateUrl: './contact-list-card-view.component.html',
  styleUrl: './contact-list-card-view.component.scss'
})
export class ContactListCardViewComponent {
   @Input() contact!: Contact;

   editContact(contact: Contact) {
    console.log('Editing contact:', contact);
  }

  deleteContact(contact: Contact) {
    console.log('Deleting contact:', contact);
  }
}
