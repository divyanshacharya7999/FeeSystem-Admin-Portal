import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Adjust the path if needed

@Injectable({
  providedIn: 'root',
})
export class IdleTimeoutService {
  private timeoutDuration = 15 * 60 * 1000; // ⏱️ 15 minutes

  private userActivityEvents$ = merge(
    fromEvent(window, 'mousemove'),
    fromEvent(window, 'keydown'),
    fromEvent(window, 'click'),
    fromEvent(window, 'scroll')
  );

  constructor(private authService: AuthService, private ngZone: NgZone) {}

  startMonitoring() {
    this.ngZone.runOutsideAngular(() => {
      this.userActivityEvents$
        .pipe(
          tap(() => this.resetTimer()),
          switchMap(() => timer(this.timeoutDuration))
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.authService.logout(); // 🔐 Call logout from AuthService
          });
        });
    });
  }

  private resetTimer() {
    // Resets the timer when user activity is detected
  }
}
