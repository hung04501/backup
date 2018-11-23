import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { BookingComponent } from './container/booking/booking.component';
import { BookingNewComponent } from './container/booking/booking-new/booking-new.component';
import { SplComponentsModule } from '../../../../libs/spl-components/spl-components.module';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, NxModule.forRoot(), SplComponentsModule],
  declarations: [AppComponent, BookingComponent, BookingNewComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
