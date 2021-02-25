import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema : Tema = new Tema()
  listaTemas : Tema[]   

  constructor(
    private router : Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    if(environment.token == '')
    {
      this.router.navigate(['/entrar'])
    }
    this.findAllTemas()
  }

  findAllTemas()
  {
    this.temaService.pegaTudoPeloTema().subscribe((resp : Tema[])=>
    {
      this.listaTemas = resp
    })
  }
  
  cadastrarTema()
  {
    this.temaService.postTema(this.tema).subscribe((resp:Tema) =>{
      this.tema = resp
      alert('Tema Cadastrado !!!')
      this.findAllTemas()
      this.tema = new Tema()  
      
    })
  }


}