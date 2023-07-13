import { Component,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaMedicamentosComponent } from 'src/app/components/lista-medicamentos/lista-medicamentos.component';
import { MedicamentosService } from 'src/app/services/medicamentos.service';

@Component({
  selector: 'app-broncodilatadores-calculos',
  templateUrl: './broncodilatadores-calculos.component.html',
  styleUrls: ['./broncodilatadores-calculos.component.scss']
})
export class BroncodilatadoresCalculosComponent {
  @ViewChild(ListaMedicamentosComponent) listaMedicamentosComponent!: ListaMedicamentosComponent;

  backgroundColor: any = '#6f42c1';
  broncodilatadores:any = "Broncodilatadores";
  nomeBroncodilatadores:any;
  dadosBroncodilatadores: any;
  nomeItem: any;

  constructor(
    private route: ActivatedRoute,
    private medicamentosService: MedicamentosService
  ){
    this.nomeItem = this.route.snapshot.paramMap.get('nomeItem');
  }

    ngOnInit() {
      this.nomeBroncodilatadores = this.nomeItem;

      this.receberDados(this.nomeBroncodilatadores);
    }

    receberDados(dados: any) {
      this.medicamentosService.GetAll().subscribe((response: any) => {

        this.dadosBroncodilatadores  = response.find(function(medicacao : any) { return medicacao.nome == dados; });
        console.log(this.dadosBroncodilatadores)
      });
    }
}