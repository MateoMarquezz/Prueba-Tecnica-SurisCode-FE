import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { Vendedor } from '../models/Vendedor';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiLocal = environment.endpoint; // api local

  constructor(private http: HttpClient) { }

  obtenerArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiLocal}/Articulos/listarArticulos`)
    
  }

  obtenerVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.apiLocal}/Vendedores/listarVendedores`);
  }

  guardarPedido(pedido: any): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiLocal}/Articulos/validarProducto`, pedido);
  }
  
}
