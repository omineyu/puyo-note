import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppRoutingModule } from './app-routing.module';
import { PuyoDiagramsModule } from './puyo-diagrams/puyo-diagrams.module';

import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DeviceDetectorModule.forRoot(),
    PuyoDiagramsModule,
  ],
})
export class AppModule {}
