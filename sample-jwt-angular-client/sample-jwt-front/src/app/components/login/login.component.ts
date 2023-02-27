import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDetailsService } from 'src/app/core/services/contract.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  finalResult ="";

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) {}

  login(){
    this.loginService.login("usuário","senha").subscribe({
      next: (data)=>{console.log('data', this.finalResult = data)
      this.router.navigate(['/contract-list']);
    },
      error: (err)=>console.log('error', this.finalResult = err),
    });
  }
  

}
