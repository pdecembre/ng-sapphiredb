import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {EditorComponent} from './editor/editor.component';
import {PixelsComponent} from './pixels/pixels.component';


const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'pixels', component: PixelsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemosRoutingModule { }
