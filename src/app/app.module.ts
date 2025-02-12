import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MetadataComponent } from './components/metadata/metadata.component';
import { HttpClientModule } from '@angular/common/http';
import { MetadataService } from './services/metadata.service';
import { MetatableComponent } from './components/metatable/metatable.component';
import { MetafieldComponent } from './components/metafield/metafield.component';

@NgModule({
  declarations: [
    AppComponent,
    MetadataComponent,
    MetatableComponent,
    MetafieldComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'always' })
  ],
  providers: [MetadataService],
  bootstrap: [AppComponent]
})
export class AppModule { }