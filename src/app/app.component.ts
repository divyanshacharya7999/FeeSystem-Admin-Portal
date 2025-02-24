import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { IdleTimeoutService } from './services/idle-timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FeeSystem';

  constructor(
    public authService: AuthService,
    private idleTimeoutService: IdleTimeoutService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.idleTimeoutService.startMonitoring();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
