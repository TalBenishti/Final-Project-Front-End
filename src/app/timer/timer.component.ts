import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  standalone: true,
  imports: [MatIconModule]
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 0;
  @Output() reportTimeLeft = new EventEmitter<number>();

  private intervalId: any;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.duration > 0) {
        this.duration--;
        this.reportTimeLeft.emit(this.duration);
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get formattedTime(): string {
    const minutes: number = Math.floor(this.duration / 60);
    const seconds: number = this.duration % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
