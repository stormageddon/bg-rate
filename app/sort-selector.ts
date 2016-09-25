import {Component, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'sort-selector',
  template: `
    <div>
      <select #sel (change)="select.emit(sel.value)">
        <option *ngFor="let option of sortOptions">
	  {{option}}
	</option>
      </select>
    </div>`
})
export class SortSelector {
  @Output() select = new EventEmitter();
  sortOptions = ["id", "weightedValue"];

  ngOnInit() {
    this.select.emit(this.sortOptions[0]);
  }
}