import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-text',
  templateUrl: './simple-text.component.html',
  styleUrls: [],
})
export class SimpleTextComponent {
  @Input() text: string | undefined;
}
