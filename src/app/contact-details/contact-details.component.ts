import { Component, inject } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ContactService } from '../contact-list/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact-list/contact.model';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
 contact$!: Observable<Contact | undefined>;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id')!;
    this.contact$ = this.contactService.getContactById(contactId).pipe(
      catchError((error) => {
        if (error.status === 500) {
          this.router.navigate(['/page-not-found']); 
        }
        return of(undefined); 
      })
    );
  }
}
