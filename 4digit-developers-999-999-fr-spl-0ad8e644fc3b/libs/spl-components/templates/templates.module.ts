import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismsModule } from '../organisms/organisms.module';

@NgModule({
  imports: [CommonModule, OrganismsModule],
  exports: [OrganismsModule],
  declarations: []
})
export class TemplatesModule {}
