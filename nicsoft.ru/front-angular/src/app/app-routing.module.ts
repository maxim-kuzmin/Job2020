import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppPageIndexComponent} from './pages/index/page-index.component';
import {AppPageValidationComponent} from './pages/validation/page-validation.component';
import {AppPageLoadingComponent} from './pages/loading/page-loading.component';

const routes: Routes = [
  {
    path: '',
    component: AppPageIndexComponent,
    pathMatch: 'full'
  },
  {
    path: 'loading',
    component: AppPageLoadingComponent
  },
  {
    path: 'validation',
    component: AppPageValidationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        // enableTracing: true, // <-- debugging purposes only
        onSameUrlNavigation: 'reload',
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
