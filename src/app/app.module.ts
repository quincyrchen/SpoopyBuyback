import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { AppraisalService } from './appraisal.service';

@NgModule({
  declarations: [
    AppComponent,
    AppraisalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppraisalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
