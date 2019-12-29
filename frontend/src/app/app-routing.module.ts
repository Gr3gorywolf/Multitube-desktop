import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearcherComponent } from './pages/searcher/searcher.component';


const routes: Routes = [
  {path:"searcher/:query",component:SearcherComponent,runGuardsAndResolvers: 'always',}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
