import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppPageValidationComponent} from './pages/validation/page-validation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppPageIndexComponent} from './pages/index/page-index.component';
import {AppPageLoadingComponent} from './pages/loading/page-loading.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppPageCenterComponent} from './pages/center/page-center.component';
import {AppPageFormComponent} from './pages/form/page-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AppPageCenterComponent,
    AppPageFormComponent,
    AppPageIndexComponent,
    AppPageLoadingComponent,
    AppPageValidationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
