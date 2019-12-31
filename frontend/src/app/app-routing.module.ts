import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearcherComponent } from './pages/searcher/searcher.component';
import { ConnectedClientsComponent } from './pages/connected-clients/connected-clients.component';


const routes: Routes = [
  {path:"searcher/:query",component:SearcherComponent,runGuardsAndResolvers: 'always',},
  {path:"clients",component:ConnectedClientsComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
