import { Injectable } from '@angular/core';
import { Contato } from './contatos';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  apiUrl = 'http://localhost:8080/contatos';
  // apiUrl = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  save(contatos: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contatos);
  }

  delete(contatos: Contato): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contatos.id}`);
  }

  update(contatos: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${contatos.id}`, contatos);
  }

  listarContatosComFiltro(filtros: any): Observable<Contato[]> {
    let params = new HttpParams();

    // popular o params com os filtros do component
    Object.keys(filtros).forEach((key) => {
      params = params.set(key, filtros[key]);
    });

    console.log('url de requisicao e: ' + `${this.apiUrl}/filtros`);

    return this.http.get<Contato[]>(`${this.apiUrl}/filtros`, { params });
  }

  alternarFavorito(id: number, favorito: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/favorito`, favorito);
  }
}
