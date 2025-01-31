import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MetadataPrincipalComponent } from './components/metadata-principal/metadata-principal.component';
import { HttpClientModule } from '@angular/common/http';
import { MetadataService } from './services/metadata.service';

@NgModule({
  declarations: [
    AppComponent,
    MetadataPrincipalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MetadataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
