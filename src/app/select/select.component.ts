import { Component, OnInit, Input, Output, EventEmitter, Directive, ElementRef, ViewChild, HostListener } from '@angular/core';

export enum KEY_CODE {
  DOWN_ARROW = 40,
  UP_ARROW = 38
}

type optionType = {
  value?: string,
  label?: string
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options: any;
  @Input() icon = false;
  @Input() button = false;
  @Input() isOpened = false;
  @Input() placeholder = "Select..." 
  @Input() searchEnabled = false;

  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onOpened: EventEmitter<any> = new EventEmitter<any>();

  originalOptions: Array<optionType>;
  _currentSelection: optionType = {};
  activeOption: optionType = {};

  @Input()
  set currentSelection(value) {
    this._currentSelection =
      value === '' || value === null || value === undefined
        ? {}
        : value;
  }

  ngOnInit() {
    this.originalOptions = [...this.options];
  }
    
  get currentSelection() {
    return this._currentSelection;
  }

  setCurrentSelection(option) {
    this.setSelected(option);
    this.closeOptions();
    (document.querySelector('.texteditor-input') as any).focus();
  }

  closeOptions() {
    this.activeOption = {}
    this.isOpened = false;
    this.options = this.originalOptions;
    this.onClosed.emit();
  }

  setSelected(option) {
    this._currentSelection = option;
    this.options = this.originalOptions;
    this.onItemClick.emit(option)
  }

  removeSelected() {
    this._currentSelection = {};
    this.closeOptions()
  }

  selectOption() {
    this.setSelected(this.activeOption);
    this.closeOptions();
  }

  search(value: any) {
    this.isOpened = true;
    this.options = this.originalOptions.filter(
      option => option.label.toLocaleLowerCase().includes(value.target.value.toLocaleLowerCase())
    );
  }

  onClick(event) {
    if(!this.isOpened) {
      this.activeOption = this.currentSelection;
      this.onOpened.emit(event);
    }
    this.isOpened = !this.isOpened;
  }

  setKeyPressValue(option) {
    if(this.isOpened){
      this.activeOption = option;
    } else {
      this._currentSelection = option;
    }
  }

  keyPress(event, option) {
    if(!option) {
      option = this.activeOption.value ? this.activeOption : this._currentSelection.value ? this._currentSelection: this.options[0]
    }

    let activeElementIndex = this.options.indexOf(option);
    let scrollToElement;

    if(event.keyCode === KEY_CODE.DOWN_ARROW) {

      let nextElementIndex: number;
      
      if(this.activeOption.value || !this.isOpened) {
        if(!this.currentSelection.value && !activeElementIndex && !this.isOpened) {
          nextElementIndex = 0;
        } else {
          nextElementIndex = activeElementIndex + 1;
        }
      } else {
        nextElementIndex = 0;
      }

      if(nextElementIndex >= this.options.length) {
        this.setKeyPressValue(this.options[0]);
        scrollToElement = document.querySelectorAll('.select-option')[0];
      } else {
        this.setKeyPressValue(this.options[nextElementIndex]);
        scrollToElement = document.querySelectorAll('.select-option')[nextElementIndex];
      }
      
    }

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      let prevElemnetIndex = activeElementIndex - 1

      if(prevElemnetIndex < 0) {
        this.setKeyPressValue(this.options[this.options.length - 1]);
        scrollToElement = document.querySelectorAll('.select-option')[this.options.length - 1];
      } else {
        this.setKeyPressValue(this.options[prevElemnetIndex]);
        scrollToElement = document.querySelectorAll('.select-option')[prevElemnetIndex];
      }

    }

    if (this.isOpened) {
      scrollToElement.scrollIntoView();
    }
  }
  
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!document.querySelector('.container').contains(event.target)) {
      this.closeOptions()
    }
    
  }

}
