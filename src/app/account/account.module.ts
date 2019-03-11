import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ManageComponent } from './manage/manage.component';
import { ConnectionsComponent } from './connections/connections.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [LoginComponent, ManageComponent, ConnectionsComponent]
})
export class AccountModule { }
