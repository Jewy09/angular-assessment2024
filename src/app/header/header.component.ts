import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { ContactFormModalComponent } from '../contact-list/contact-form-modal/contact-form-modal.component';
import { ContactService } from '../contact-list/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from '../contact-list/contact.model';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog, private contactService: ContactService) {}

  onAddContact(): void {
    const dialogRef = this.dialog.open(ContactFormModalComponent, {
      data: null
    });

    dialogRef.afterClosed().subscribe((result: Contact) => {
      if (result) {
        this.contactService.addContacts(result).subscribe();
      }
    });
  }
}
