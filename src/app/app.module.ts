import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessageLogComponent } from './message-log/message-log.component';

import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ServerListComponent } from './server-list/server-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
	{path: 'rooms', component: ServerListComponent, canActivate: [AuthGuard]},
	{path: 'chat/:room', component: MessageLogComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    MessageLogComponent,
    LoginComponent,
    ServerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    [RouterModule.forRoot(routes)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
