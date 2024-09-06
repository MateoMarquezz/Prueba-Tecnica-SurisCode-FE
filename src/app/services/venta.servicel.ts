import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { Vendedor } from '../models/Vendedor';


@Injectable({ providedIn: 'root'})

export class PedidoService {
    private readonly http = inject(HttpClient)
    private apiLocal = 'https://localhost:44329/'; // api local 

    obtenerArticulos(): Observable<Articulo[]> {
        return this.http.get<Articulo[]>(`${this.apiLocal}api/Articulos/listarArticulos`);
    }
    obtenerVendedores(): Observable<Vendedor[]> {
        return this.http.get<Vendedor[]>(`${this.apiLocal}api/Vendedores/listarVendedores`);
    }

    guardarPedido(pedido: any): Observable<any> {
        return this.http.post(`${this.apiLocal}api/Articulos/validarProducto`, pedido);
    }

}
