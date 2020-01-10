import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearcherComponent } from './pages/searcher/searcher.component';
import { ConnectedClientsComponent } from './pages/connected-clients/connected-clients.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {path:"searcher/:query",component:SearcherComponent,runGuardsAndResolvers: 'always',},
  {path:"clients",component:ConnectedClientsComponent,},
  {path:"downloads",component:DownloadsComponent,},
  {path:"settings",component:SettingsComponent,},
  {path:"home",component:HomeComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
