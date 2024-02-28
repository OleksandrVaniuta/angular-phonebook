import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IContact } from '../contact';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddContact } from '../add-contact/dialogBtn/dialogBtn.component';
import { ContactsService } from '../contacts.service';



@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, DialogAddContact],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css'
})
export class ContactsListComponent {
  @Input() contact!: IContact;
  @Output() deleteContact = new EventEmitter<string>();
  @Output() editContact = new EventEmitter<any>()
  backgroundColor: string = ''
  
  constructor(private contactsService: ContactsService) {
    this.backgroundColor = this.getRandomColor();
}

onDelete(id: string) {
  this.deleteContact.emit(id);
  }

  onEditContact(result: { name: string, number: string }) {
    // console.log(this.contact.id)
    // if (this.contact && this.contact.id) { 
    //    this.editContact.emit({ id: this.contact.id, result })
    // }
     this.contactsService.editContact(this.contact.id, result).subscribe(res => { 

       this.contact = { ...this.contact, name: result.name, number: result.number}
      })
    
}
  
  getFirstLetterUpper(name: string): string {
    return name.charAt(0).toUpperCase();
  }

 getRandomColor(): string {
  const colors = [
    '#FFDDC1',
    '#AEC6CF',
    '#B39EB5',
    '#FFD3E0',
    '#C9E4E7',
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}

}
