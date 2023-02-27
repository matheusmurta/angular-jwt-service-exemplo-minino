import { Component } from '@angular/core';
import { ContractDetailsService } from 'src/app/core/services/contract.service';
import { IContract } from '../../core/models/IContract';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent {

  errorLog ="";
  contractList: IContract[] = [];
  publicListResult = null;


  constructor(
    private contractDetailsService: ContractDetailsService,
  ) {}

  listar(){
    this.contractDetailsService.getAllPublicApi().subscribe({
      next: (data)=>console.log('data',this.publicListResult = data),
      error: (err)=>console.log('error',this.errorLog = err),
      complete:()=>console.log('complete')
    });
  }

  listarAutenticado(){
    this.contractDetailsService.getAll().subscribe({
      next: (data)=>console.log('data',this.contractList = data),
      error: (err)=> {
        this.errorLog = err;
        console.log(err)
      } ,
    });
  }
}
