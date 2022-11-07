import { Injectable } from '@angular/core';

//imports
import { Guid } from 'guid-typescript';
import { Storage } from '@ionic/storage-angular';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  public contatos = [
    {id : 1, nome : "Mãe", sobrenome: "", tipo: "celular", telefone : "9-8888-7777", email : ""},
    {id : 2, nome :"Amor", sobrenome: "", tipo: "celular", telefone : "9-9191-8484", email : ""}
  ]

  constructor( private storage : Storage) { }

  EnviarTodosContatos(){
    let arrayContatos : Contato [] = []
    this.storage.forEach((valor: string) => {const contato : Contato = JSON.parse(valor); arrayContatos.push(contato)})
    return arrayContatos
  }

  async FiltraContatosId(id : string){
    return JSON.parse(await this.storage.get(id))
  }

  ExcluirContatoId(id : string){
    this.storage.remove(id)
  }

  InserirContato(dadosRecebidos : Contato){
    dadosRecebidos.id = Guid.create()
    this.storage.set(dadosRecebidos.id.toString(), JSON.stringify(dadosRecebidos))
  }

  AtualizarContato( dadosRecebidos: Contato, id: string){
    // converte 'id' já existente do contato em Guid e salva no atributo 'id' do 'Model'
    dadosRecebidos.id = Guid.parse(id)
    this.storage.set(dadosRecebidos.id.toString(), JSON.stringify(dadosRecebidos))
  }
}
