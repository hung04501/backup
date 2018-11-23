import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// stuffs coming from libs
import { AuthGuard } from '@fr-spl/core';
import { SplComponentsModule } from '@fr-spl/spl-components/spl-components.module';

// current module stuffs
import { TodoPageComponent } from './containers/todo-page/todo-page.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { FrAutocompleteDirective } from './fr-autocomplete.directive';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent }
  // { path: '404', component: NotFoundPageComponent },
  // { path: '**', redirectTo: '/404' },
];

export const loginRedirectPath = '/login';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SplComponentsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  declarations: [LoginPageComponent, TodoPageComponent, FrAutocompleteDirective],
  exports: [SplComponentsModule, RouterModule, LoginPageComponent, TodoPageComponent]
})
export class AppRoutingModule {}
