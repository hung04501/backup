import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './btn/btn.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [CommonModule],
  exports: [BtnComponent, TextfieldComponent, IconComponent],
  declarations: [BtnComponent, TextfieldComponent, IconComponent]
})
export class AtomsModule {}
