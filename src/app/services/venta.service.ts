import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { Vendedor } from '../models/Vendedor';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiLocal = 'https://localhost:44329/'; // api local

  constructor(private http: HttpClient) { }

  obtenerArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiLocal}api/Articulos/listarArticulos`)
    
  }

  obtenerVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.apiLocal}api/Vendedores/listarVendedores`);
  }

  guardarPedido(pedido: any): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiLocal}api/Articulos/validarProducto`, pedido);
  }
  
}
