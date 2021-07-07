import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ysms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pageTitle: string = 'Dashboard';

  ngOnInit(): void {
  }
}
