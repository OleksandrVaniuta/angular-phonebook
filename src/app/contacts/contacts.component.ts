import { Component, OnInit, Input} from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { CommonModule } from '@angular/common';
import { IContact } from '../contact';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogAddContact } from '../add-contact/dialogBtn/dialogBtn.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactsListComponent, CommonModule, AddContactComponent, MatFormFieldModule, MatInputModule, DialogAddContact, MatProgressSpinnerModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  loadin: boolean = false
  contactsList: IContact[] = []
  filteredLocationList: IContact[] = [];
  private filterSubject = new Subject<string>();

  constructor(private contactsService: ContactsService) { }



  ngOnInit(): void {
     
    this.getContacts()
    

    this.filterSubject.pipe(debounceTime(300)).subscribe(value => {
        this.filterResults(value);
      });
  }

updateContactsList(newContact: {name: string, number: string}): void {
  this.contactsService.addContact(newContact).subscribe(res => { 
      this.contactsList.push(res);
      })
  }


  getContacts() {
    this.loadin = true

    this.contactsService.getContacts().subscribe(res => { 
        this.contactsList = [...this.contactsList, ...res]
        this.filteredLocationList = this.contactsList
        this.loadin = false
    })
    
  }

  deleteContact(id: string): void {
    this.contactsService.deleteContact(id).subscribe();

    const index = this.contactsList.findIndex(contact => contact.id === id)
    
    this.contactsList.splice(index, 1)
  }

    onFilterChange(value: string): void {
    this.filterSubject.next(value);
  }


  filterResults(text: string) {

    if (!text) {
      this.filteredLocationList = this.contactsList;
      return;
    }

    this.filteredLocationList = this.contactsList.filter(contact => contact?.name?.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
  }

}
