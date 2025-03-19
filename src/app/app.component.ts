import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ContactListComponent } from "./contact-list/contact-list.component"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-assessment_jewynah.mae.jaronay';
}
