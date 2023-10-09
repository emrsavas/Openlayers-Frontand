import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { LayoutsComponent } from './layouts/layouts.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { QuerydrawpopupComponent } from './map/querydrawpopup/querydrawpopup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [	
    AppComponent,
      MapComponent,
      LayoutsComponent,
      QuerydrawpopupComponent
      
      
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule

  ],
  providers: [{ provide: 'apiUrl', useValue:'https://localhost:7020/api/'},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
