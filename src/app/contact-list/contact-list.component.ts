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


@Component({
  selector: 'app-contact-list',
  imports: [MatGridListModule, MatIconModule, ContactListCardViewComponent, ContactListTableViewComponent, AsyncPipe],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})

export class ContactListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  // ✅ Keeping Observables
  contacts$: Observable<Contact[]>;

  // ✅ Keeping View Mode as a normal variable
  viewMode: 'card' | 'table' = 'card';

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.getContacts();
  }

  ngOnInit(): void {
    // No manual subscribe needed, using async pipe in template
  }

  onChangeView(mode: 'card' | 'table'): void {
    this.viewMode = mode;
  }
}