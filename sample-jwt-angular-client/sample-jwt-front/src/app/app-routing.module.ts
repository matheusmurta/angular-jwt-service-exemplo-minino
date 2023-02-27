import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'contract-list', component: ContractListComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } 


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
