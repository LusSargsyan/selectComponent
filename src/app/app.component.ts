import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CustomSelect';

  options = [
    { value: 'bg', label: 'Bangalore' },
    { value: 'ch', label: 'Chennai' },
    { value: 'er', label: 'Erode' },
    { value: 'bk', label: 'Bangkok' },
    { value: 'jm', label: 'Jammu' },
    { value: 'md', label: 'Madurai' },
    { value: 'go', label: 'Goa' },
    { value: 'mb', label: 'Mumbai' },
    { value: 'kl', label: 'Kolkata' },
    { value: 'shg', label: 'Shillong' },
    { value: 'co', label: 'Cochin' },
    { value: 'mys', label: 'Mysore' },
  ];


onItemClick($event: any): void {
   console.log($event);
}

onOpened($event: any): void {
  console.log($event, 'open')
}

onClosed($event: any): void {
  console.log($event, 'close')
}
  
}
