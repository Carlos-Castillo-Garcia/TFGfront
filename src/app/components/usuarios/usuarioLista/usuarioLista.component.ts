import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Globales } from 'src/app/services/Globales.service';
import { PermisosService } from 'src/app/services/Permisos.service';
import { tiposService } from 'src/app/services/tipos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'usuarioLista',
  templateUrl: './usuarioLista.component.html',
  styleUrls: ['./usuarioLista.component.css']
})
export class UsuarioListaComponent implements OnInit {
  usuarioSeleccionadoId: string;
  //Formulario Modal
  arrSelectTipos: any[];

  //Tabla para la lista
  arrListaUsuarios: any[];

  constructor(
    private metodosGlobales: Globales,
    private tiposService: tiposService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public permisos: PermisosService
  ) {
    this.usuarioSeleccionadoId = "";
    //Tabla para la lista
    this.arrListaUsuarios = [];
    this.arrSelectTipos = [];
  }

  async ngOnInit() {
    if (sessionStorage.getItem('validacion') === 'true' && sessionStorage.getItem('validacionVisualizacion') === '1')
      this.arrSelectTipos = await this.tiposService.getAllTipos(environment.APIPATH_TIPOROL + parseInt(sessionStorage.getItem('administradorId')!));
    this.arrListaUsuarios = await this.metodosGlobales.getById(environment.APIPATH_USUARIO, parseInt(sessionStorage.getItem('administradorId')!));

    this.activateRouter.params.subscribe(params => {
      this.usuarioSeleccionadoId = params['id']
    })
  }
  navegar(idUsuario: number) {
    this.router.navigate(['usuarios/detalle/' + idUsuario])
  }
}
