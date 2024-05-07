import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-points',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './current-points.component.html',
  styleUrl: './current-points.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentPointsComponent {
  @Input() currentPoints: number = 0;
}
