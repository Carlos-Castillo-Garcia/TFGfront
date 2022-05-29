import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { env } from 'process';
import { tiposService } from 'src/app/services/tipos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tipoIntervinienteRegistro',
  templateUrl: './tipoIntervinienteRegistro.component.html',
  styleUrls: ['./tipoIntervinienteRegistro.component.css']
})
export class TipoIntervinienteRegistroComponent implements OnInit {
  registroForm: FormGroup;
  result: any;

  constructor(
    private metodosTipos: tiposService,
    private activateRouter: ActivatedRoute,
    private router: Router,

  ) {
    this.result = "";

    this.registroForm = new FormGroup({
      idTipoInterviniente: new FormControl(),
      tipoInterviniente: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      borrado: new FormControl(false),
      createTime: new FormControl(),
      updateTime: new FormControl(),
      usuarioId: new FormControl(parseInt(sessionStorage.getItem('idUsuario')!)),
      administradorId: new FormControl(parseInt(sessionStorage.getItem('administradorId')!)),
    })
  }

  ngOnInit() {
    this.activateRouter.params.subscribe(async params => {
      if (params['id']) {
        let response = await this.metodosTipos.getAllTipos(environment.APIPATH_TIPOINTERVINIENTEDETALLE + parseInt(sessionStorage.getItem('administradorId')!))
        this.registroForm.patchValue(response[0])
      }
    })
  }
  async enviar() {
    if (this.registroForm.value.idTipoInterviniente !== null) {

      this.registroForm.value.updateTime = new Date();
      this.registroForm.value.usuarioId = parseInt(sessionStorage.getItem('idUsuario')!);
      await this.metodosTipos.update(this.registroForm.value, environment.APIPATH_TIPOINTERVINIENTE);

    } else {
      if (this.registroForm.valid) {

        this.registroForm.value.createTime = new Date();
        this.registroForm.value.updateTime = new Date();
        await this.metodosTipos.create(this.registroForm.value, environment.APIPATH_TIPOINTERVINIENTE);

      } else { let result = 'hay datos no validos en el formulario' };
    }
    window.location.reload();
  }
  checkError(fieldName: string, errorType: string) {
    return this.registroForm.get(fieldName)!.hasError(errorType) && this.registroForm.get(fieldName)!.touched
  }
}
