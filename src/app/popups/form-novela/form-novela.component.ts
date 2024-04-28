import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Novela } from 'src/app/interfaces/Novela';
import { EnvioService } from 'src/app/service/envio.service';

@Component({
  selector: 'app-form-novela',
  standalone: true,
  imports: [MatFormFieldModule, MatRadioModule, MatInput, FormsModule],
  templateUrl: './form-novela.component.html',
  styleUrl: './form-novela.component.css'
})
export class FormNovelaComponent {
  id: number = 0;
  nome: string = ' ';
  autor: string = ' ';
  descricao: string = ' ';
  disponibilidade: string = ' ';
  estudio: string = ' ';
  nacionalidade: string = ' ';
  status: string = ' ';
  statusVisto: string = ' ';
  maxEps: number = 0;
  temps: number = 0;
  dtLancamento: Date = new Date();

  Novela: Novela = {
    id: this.id,
    nome: this.nome,
    autor: this.autor,
    descricao: this.descricao,
    disponibilidade: this.disponibilidade,
    estudio: this.estudio,
    nacionalidade: this.nacionalidade,
    status: this.status,
    statusVisto: this.statusVisto,
    maxEps: this.maxEps,
    temps: this.temps,
    dtLancamento: this.dtLancamento
  }

  constructor(
    private envioService: EnvioService,
    public dialogRef: MatDialogRef<FormNovelaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Novela,
  ){
    if(data !== null)
      this.Novela = data
  }

  enviaDados(){
    if(this.Novela === null){
      this.envioService.sendDados(this.Novela).subscribe()
    }else{
      this.envioService.corrigeDados(this.Novela, this.Novela.id).subscribe()
    }
    console.log(this.Novela)
    this.fechar() 
  }
  
  fechar(){
    this.dialogRef.close()
  }

}
