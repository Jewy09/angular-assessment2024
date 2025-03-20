import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from './contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../alert/alert.component';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:9090/api/contacts'; 
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  private snackBar = inject(MatSnackBar);
  contacts$ = this.contactsSubject.asObservable();
  constructor(private http: HttpClient) {}


  // getContacts(): Observable<Contact[]> {
  //   return this.http.get<Contact[]>(this.apiUrl);
  // }
  showMessage(message: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 3000,
      horizontalPosition: 'end', 
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'], 
      data: { message }, 
    });
  }

  fetchContacts(): void {
    this.http.get<Contact[]>(this.apiUrl).subscribe((contacts) => {
      this.contactsSubject.next(contacts); 
    });
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  addContacts(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact).pipe(
      tap((newContact) => {
        const currentContacts = this.contactsSubject.getValue();
        this.contactsSubject.next([...currentContacts, newContact]);
        this.showMessage('Successfully added a new contact!'); 
      })
    );
  }

  updateContacts(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact).pipe(
    tap((updatedContact) => {
      const currentContacts = this.contactsSubject.getValue();
      const updatedContacts = currentContacts.map((c) =>
        c._id === id ? updatedContact : c
      );
      this.contactsSubject.next(updatedContacts)
      this.showMessage('Changes saved');; 
    })
  );
  }

  deleteContact(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
    tap(() => {
this.showMessage('Contact deleted');
    })
  );

}
}
