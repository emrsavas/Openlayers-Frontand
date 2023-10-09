import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    loadChildren: ()=> import('src/app/map/map.module').then(m=> m.MapModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
