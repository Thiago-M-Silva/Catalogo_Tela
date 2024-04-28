import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Serie } from 'src/app/interfaces/Serie';
import { EnvioService } from 'src/app/service/envio.service';

@Component({
  selector: 'app-form-serie',
  standalone: true,
  imports: [MatFormFieldModule, MatRadioModule, MatInputModule, FormsModule],
  templateUrl: './form-serie.component.html',
  styleUrl: './form-serie.component.css'
})
export class FormSerieComponent {
  id: number = 0;
  nome: string = ' ';
  autor: string  = ' ';
  descricao: string  = ' ';
  disponibilidade: string  = ' ';
  estudio: string  = ' ';
  nacionalidade: string  = ' ';
  status: string  = ' ';
  statusVisto: string  = ' ';
  maxEps: number  = 0;
  temps: number  = 0;
  dtLancamento: Date = new Date();
  
  Serie: Serie = {
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
    dtLancamento: this.dtLancamento,
  }

  constructor(
    private envioService: EnvioService,
    public dialogRef: MatDialogRef<FormSerieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Serie,
  ){
    if(data !== null)
      this.Serie = data
  }

  enviaDados(){
    if(this.Serie === null){
      this.envioService.sendDados(this.Serie).subscribe()
    }else{
      this.envioService.corrigeDados(this.Serie, this.Serie.id).subscribe()
    }
    console.log(this.Serie)
    this.fechar()  
  }
  
  fechar(){
    this.dialogRef.close()
  }

}
