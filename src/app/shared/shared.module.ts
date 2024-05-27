import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SimpleTextComponent } from './components/simple-text.component';

@NgModule({
  declarations: [SimpleTextComponent],
  imports: [CommonModule],
  exports: [],
  providers: [],
})
export class SharedModule {}
