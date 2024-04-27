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

  getDomainFromPage(): string | null {
    if (!this.itemNew.page) {
        return null;
    }

    try {
        const parsedUrl = new URL(this.itemNew.page);
        return parsedUrl.hostname.replace('www.', '');
    } catch (error) {
        console.error('Error parsing URL:', error);
        return null;
    }
}
}
