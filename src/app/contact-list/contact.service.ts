import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:9090/api/contacts'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  addContacts(contact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(this.apiUrl, contact);
  }

  updateContacts(id: number, contact: Contact): Observable<Contact[]> {
    return this.http.put<Contact[]>('${this.apiUrl}/${id}', contact);
  }

  deleteContacts(): Observable<Contact[]> {
    return this.http.delete<Contact[]>(this.apiUrl);
  }
}
