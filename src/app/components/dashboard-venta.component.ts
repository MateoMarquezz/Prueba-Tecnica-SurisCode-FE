import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../services/venta.service';
import { FormsModule } from '@angular/forms';
import { Articulo } from '../models/Articulo';
import { Vendedor } from '../models/Vendedor';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard-venta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './dashboard-venta.component.html',
  styleUrls: ['./dashboard-venta.component.css']
})
export class DashboardVentaComponent implements OnInit {
  articulos: Articulo[] = [];
  vendedores: Vendedor[] = [];
  vendedorSeleccionado: Vendedor | null = null;
  columnas: string[] = ['select', 'codigo', 'descripcion', 'precio', 'deposito'];
  dataArticulos = new MatTableDataSource<Articulo>([]); 

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.obtenerArticulos();
    this.obtenerVendedores();
  }

  obtenerArticulos() {
    this.ventaService.obtenerArticulos().subscribe(articulos => {
      console.log(articulos);
      this.articulos = articulos;
      this.dataArticulos.data = articulos; 
    });
  }

  obtenerVendedores() {
    this.ventaService.obtenerVendedores().subscribe(vendedores => {
      console.log('Vendedores:', vendedores);
      this.vendedores = vendedores;
    });
  }


  guardarPedido() {
    if (!this.vendedorSeleccionado) {
      Swal.fire('Error', 'Por favor, selecciona un vendedor.', 'error');
      return;
    }
  
    const articulosSeleccionados = this.articulos.filter(art => art.selected);
  
    if (articulosSeleccionados.length === 0) {
      Swal.fire('Error', 'Por favor, selecciona al menos un artículo.', 'error');
      return;
    }
  
    const pedido = {
      articulos: articulosSeleccionados
    };
  
    this.ventaService.guardarPedido(pedido).subscribe(
      response => {
        if (response.status === 'OK') {
          Swal.fire('Éxito', 'El pedido se ha guardado correctamente.', 'success');
        } else {
          Swal.fire('Error', 'Hubo un problema al guardar el pedido.', 'error');
        }
      },
      error => {
        Swal.fire('Error', 'Error al guardar el pedido', 'error');
      }
    );
  }

  
  deseleccionar(event: MatCheckboxChange) {
    const checked = event.checked;
    this.articulos.forEach(articulo => articulo.selected = checked);
    this.dataArticulos.data = [...this.articulos]; // Actualiza el dataSource
  }
}
