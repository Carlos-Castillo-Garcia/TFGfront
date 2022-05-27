import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { tiposService } from 'src/app/services/tipos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tipoInmuebleLista',
  templateUrl: './tipoInmuebleLista.component.html',
  styleUrls: ['./tipoInmuebleLista.component.css']
})
export class TipoInmuebleListaComponent implements OnInit {
  seleccionadoId: string;

  //Tabla para la lista
  arrListaTipoInmueble: any[];
  administradorId: number;

  constructor(
    private tiposService: tiposService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {
    this.seleccionadoId = "";
    //Tabla para la lista
    this.arrListaTipoInmueble = [];
    this.administradorId = parseInt(sessionStorage.getItem('administradorId')!)
   }   

   async ngOnInit() {
    this.arrListaTipoInmueble = await this.tiposService.getAllTipos(environment.APIPATH_TIPOINMUEBLE + this.administradorId);
  
    this.activateRouter.params.subscribe(params => {
      this.seleccionadoId = params['id']
    })
   }
   navegar(idUsuario: number) {
    this.router.navigate(["/tipos/inmueble/modificacion/" + idUsuario])
  }
 
}
