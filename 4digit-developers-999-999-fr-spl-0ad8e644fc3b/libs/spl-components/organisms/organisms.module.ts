import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculesModule } from '../molecules/molecules.module';

import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [CommonModule, MoleculesModule],
  declarations: [MenuComponent],
  exports: [MoleculesModule, MenuComponent]
})
export class OrganismsModule {}
