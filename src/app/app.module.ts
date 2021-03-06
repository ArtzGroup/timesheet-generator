import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MultipleInputsComponent } from './multiple-inputs/multiple-inputs.component';
import { SingleInputComponent } from './single-input/single-input.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { MatSelectModule } from '@angular/material/select';
import { DescriptionComponent } from './description/description.component';
@NgModule({
  declarations: [
    AppComponent,
    MultipleInputsComponent,
    SingleInputComponent,
    EntryFormComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
