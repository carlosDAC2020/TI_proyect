import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// componentes 
import {ItemNewComponent} from '../item-new/item-new.component'

// modelos 
import {ItemReddit, ItemRss, ItemX} from '../models/models'


@Component({
  selector: 'app-index-view',
  standalone: true,
  imports: [CommonModule, ItemNewComponent, HttpClientModule],
  templateUrl: './index-view.component.html',
  styleUrl: './index-view.component.css'
})
export class IndexViewComponent {

  is_ti:boolean=true;
  
  constructor(private http: HttpClient) { }

    // lista de items rss
  itemsRss: ItemRss[] = [
    {
      id: 1,
      type_item:"rss",
      page: "example.com/rss",
      urlAticle: "example.com/rss",
      datePub: "2024-04-24",
      title: "New Technology Breakthrough",
      autor: "John Doe",
      interctions: 102,
      bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
      id: 2,
      type_item:"rss",
      page: "example.com/rss",
      urlAticle: "example.com/rss",
      datePub: "2024-04-23",
      title: "Top 10 Tips for Healthy Living",
      autor: "Jane Smith",
      interctions: 55,
      bodyText: "Sed ut perspiciatis unde omnis iste natus error sit..."
  },
  ];

    // lista de items de twiter
  itemsX: ItemX[] = [
      {
          id: 1,
          type_item:"x",
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
          type_item:"x",
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
          type_item:"reddit",
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
          type_item:"reddit",
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
  
  allItems = [ ...this.itemsReddit,  ...this.itemsX, ...this.itemsRss];
  newsResponse: any;
  ngOnInit(): void {
    this.getNews().subscribe(
      (response) => {
        this.itemsRss = response.news_rss.map((item: any) => ({
          id: item.id,
          type_item: "rss",
          page: item.media_url,  // Debes definir la lógica para obtener la página
          urlAticle: item.link_article,  // Debes definir la lógica para obtener la URL del artículo
          datePub:'2024-04-24',
          title: item.title,
          autor: "",  // Debes definir la lógica para obtener el autor
          interctions: 0,  // Debes definir la lógica para obtener las interacciones
          bodyText: item.summary  // Debes definir la lógica para obtener el cuerpo del texto
        }));
        console.log(this.itemsRss);  // Imprimir la lista de noticias por consola
        this.allItems = [ ...this.itemsReddit,  ...this.itemsX, ...this.itemsRss];
      },
      (error) => {
        console.error(error);  // Manejar el error si la petición falla
      }
    );
  }

  getNews(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/get_news/');
  }

}
