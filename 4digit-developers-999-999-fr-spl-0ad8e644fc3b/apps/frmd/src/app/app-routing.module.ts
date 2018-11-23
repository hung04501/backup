import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './container/booking/booking.component';
import { BookingNewComponent } from './container/booking/booking-new/booking-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'booking', component: BookingComponent },
  { path: 'booking/new', component: BookingNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
