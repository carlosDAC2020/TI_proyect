# Api News
Api de gestion de noticias por medio de RSS 

## Diagrama ER
![](../imgs/Diagrama_ER%20.png)
lis nombres de las tablas y atributos son tal cual los de la base de datos

## Requerimientos
- ***Obtencion de noticias:*** obten las noticias de los RSS y guardalas en la tabla news (***Trata de q esta ruta sea automatica cada 24horas***).
- ***Obtencion de noticias por filtro:*** busca noticias por categoria, medio de comunicacion  o fecha de publicion.
- ***Eliminacion de noticias antoguas:*** elimina las noticas con por lo menos 3 meses de antiguedad en su fecha de publicacion 