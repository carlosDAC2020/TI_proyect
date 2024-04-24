import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-new',
  standalone: true,
  imports: [],
  templateUrl: './item-new.component.html',
  styleUrl: './item-new.component.css'
})
export class ItemNewComponent {
  @Input() itemNew:any;
}
