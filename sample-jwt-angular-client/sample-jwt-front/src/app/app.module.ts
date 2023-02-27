import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtService } from './core/services/jwt.service';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContractListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [JwtService, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
