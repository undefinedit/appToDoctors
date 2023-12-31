import { Component, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calculo-medicamentos',
  templateUrl: './calculo-medicamentos.component.html',
  styleUrls: ['./calculo-medicamentos.component.scss']
})
export class CalculoMedicamentosComponent implements OnInit{
  @Input() medicamento: any;
  // @Input() listaMedicacoes: any;
  @Input() cor: any;
  @Input() dadosMedicacao: any;
  indicacoes: any = [];
  contraIndicacoes: any = [];
  quantidadeMl: any = [];
  quantidadeMg: any = [];
  resultadoMgKg: any;
  resultadoMcgKg: any;
  resultadoMcgKgReverso: any;
  resultadoMcgMin: any;
  resultadoMcgMinReverso: any;
  solucaoTotal: any;
  soroGlicosado: any;
  peso: any;
  dose:any = 0.01;
  ampola: any;
  vazao:any;
  item: any;
  backgroundColor: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute
    ) {
    const dados : any = this.route.snapshot.paramMap.get('medicamento');
    this.item = JSON.parse(decodeURIComponent(dados));
    this.backgroundColor = this.route.snapshot.paramMap.get('backgroundColor');
  }

  ngOnInit(){
    console.log(this.item , this.backgroundColor)
    this.metodoSplit();
    this.calculoSolucaoTotal()
  }

  @HostListener('window:click')
  @HostListener('window:load')
  onLoad(){
    const elements = this.elementRef.nativeElement.querySelectorAll('.span-style');
    elements.forEach((element: HTMLElement) => {
      this.renderer.setStyle(element, 'background', this.backgroundColor);
      this.renderer.setStyle(element, 'transition', 'all 0.4s ease-out');
    });
    this.elementRef.nativeElement.querySelector('.div-header').style.background = this.backgroundColor;
    this.elementRef.nativeElement.querySelector('.div-header').style.transition = 'all 0.4s ease-out';
  }

  back(){
    history.back()
  }

  metodoSplit(){
    debugger
    console.log(this.item)
    const indicacoesArray = this.item.indicacao.split("\\*");
    const contraIndicacoesArray  = this.item.contraIndicacao.split("\\*");
    const quantidadeMlArray = this.item.quantidadeMg.split("\\*");
    const quantidadeMgArray  = this.item.quantidadeMl.split("\\*");

    for (let i = 0; i < indicacoesArray.length; i++) {
      const key = `${i}`;
      this.indicacoes[key] = indicacoesArray[i];
    }

    for (let i = 0; i < contraIndicacoesArray.length; i++) {
      const key = `${i}`;
      this.contraIndicacoes[key] = indicacoesArray[i];
    }

    for (let i = 0; i < quantidadeMlArray.length; i++) {
      const key = `${i}`;
      this.contraIndicacoes[key] = indicacoesArray[i];
    }

    for (let i = 0; i < contraIndicacoesArray.length; i++) {
      const key = `${i}`;
      this.contraIndicacoes[key] = indicacoesArray[i];
    }
  }

  calculoMgKg(){
    debugger
    this.resultadoMgKg = ((this.peso * this.item.quantidadeMgKg * this.item.quantidadeMl) / (this.item.quantidadeMg * this.item.numeroDoses)).toFixed(2);
  }

  calculoMcgKg(){
    debugger
    this.resultadoMcgKg = ((this.dose * this.peso * 60)/((this.item.quantidadeMg * this.ampola)/(this.item.quantidadeSoro + (this.item.quantidadeMl * this.ampola)) * 1000)).toFixed(2);
  }

  calculoMcgMin(){
    debugger
    this.resultadoMcgMin = ((this.dose * 60) / ((this.item.quantidadeMg / (this.item.quantidadeSoro + this.item.quantidadeMl)) * 1000)).toFixed(2);
  }

  calculoMcgKgReverso(){
    debugger
    this.resultadoMcgKgReverso = ((this.vazao * ((this.item.quantidadeMg * this.ampola)/(this.item.quantidadeSoro + (this.item.quantidadeMl * this.item.quantidadeAmpolas)) * 1000)) / (this.peso * 60)).toFixed(2);
  }

  calculoMcgMinReverso(){
    debugger
    this.resultadoMcgMinReverso = ((this.vazao * ((this.item.quantidadeMg * this.ampola)/(this.item.quantidadeSoro + (this.item.quantidadeMl * this.item.quantidadeAmpolas)) * 1000) * this.item.quantidadeAmpolas) / 60).toFixed(2);
  }

  calculoSolucaoTotal(){
   this.solucaoTotal = (this.item.quantidadeSoro + this.item.quantidadeMl).toFixed(2);
   this.soroGlicosado = (this.item.quantidadeSoro).toFixed(2);
  }
}
