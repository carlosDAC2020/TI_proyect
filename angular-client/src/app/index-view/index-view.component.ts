import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
// componentes 
import {ItemNewComponent} from '../item-new/item-new.component'

// modelos 
import {ItemReddit, ItemRss, ItemX} from '../models/models'


@Component({
  selector: 'app-index-view',
  standalone: true,
  imports: [CommonModule, ItemNewComponent],
  templateUrl: './index-view.component.html',
  styleUrl: './index-view.component.css'
})
export class IndexViewComponent {

  is_ti:boolean=true;

  // lista de items rss
  itemsRss: ItemRss[] = [
    {
        id: 1,
        type:"rss",
        page: "example.com/rss",
        datePub: "2024-04-24",
        title: "New Technology Breakthrough",
        autor: "John Doe",
        interctions: 102,
        bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
    },
    {
        id: 2,
        type:"rss",
        page: "example.com/rss",
        datePub: "2024-04-23",
        title: "Top 10 Tips for Healthy Living",
        autor: "Jane Smith",
        interctions: 55,
        bodyText: "Sed ut perspiciatis unde omnis iste natus error sit..."
    },
    // Agrega más elementos según sea necesario
  ];

  // lista de items de twiter
  itemsX: ItemX[] = [
    {
        id: 1,
        type:"x",
        datePub: "2024-04-24",
        userPorifle: "@user123",
        nameProfile: "John Doe",
        textPub: "Excited to announce the launch of our new product!",
        cantLkes: 200,
        canRetwits: 50,
        cantComents: 30
    },
    {
        id: 2,
        type:"x",
        datePub: "2024-04-24",
        userPorifle: "@user456",
        nameProfile: "Jane Smith",
        textPub: "Had a great time at the conference today!",
        cantLkes: 150,
        canRetwits: 25,
        cantComents: 40
    },
    // Agrega más elementos según sea necesario
  ];

  // lista de items de reddit 
  itemsReddit: ItemReddit[] = [
    {
        id: 1,
        type:"reddit",
        datePub: "2024-04-24",
        nameProfile: "u/techlover123",
        titlePub: "Amazing New Gadget Revealed!",
        textPub: "Check out this amazing new gadget that will revolutionize...",
        CantUpVotes: 150,
        CantDownVotes: 20,
        CantShares: 30
    },
    {
        id: 2,
        type:"reddit",
        datePub: "2024-04-23",
        nameProfile: "u/naturelover456",
        titlePub: "Beautiful Sunset at the Beach",
        textPub: "Captured this stunning sunset view at the beach today...",
        CantUpVotes: 300,
        CantDownVotes: 10,
        CantShares: 40
    },
    // Agrega más elementos según sea necesario
  ];

  allItems = [...this.itemsRss, ...this.itemsReddit, ...this.itemsX];

}
