import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navApp',
  templateUrl: './navApp.component.html',
  styleUrls: ['./navApp.component.css']
})
export class NavAppComponent implements OnInit {
  nombreUsuario:any
  constructor() { 
    this.nombreUsuario = ''
  }

  ngOnInit() {
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario');
  }

}
