import { Location } from '@angular/common';
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'ysms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  pageTitle: string = 'YoSMS';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(location: Location, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    location.onUrlChange((url) => {
      this.activateMenu(url);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  activateMenu(url: string): void {
    let navs = document.querySelectorAll('.ys-nav-list > .nav-link');
    navs.forEach((nav) => {
      nav.classList.remove('active');
    });
    url = url.split('/')[1];
    let activeNav;
    switch (url) {
      case 'dashboard':
        activeNav = document.querySelector('#homeLink');
        break;
      case 'students':
        activeNav = document.querySelector('#studentLink');
        break;
      case 'exam':
        activeNav = document.querySelector('#examLink');
        break;
      default:
        break;
    }

    activeNav?.classList.add('active');
  }
}

// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogExampleComponent } from './dialog-example.component';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   title = 'YSMS';
//   constructor(public dialog: MatDialog) {}

//   openDialog() {
//     const dialogRef = this.dialog.open(DialogExampleComponent);

//     dialogRef.afterClosed().subscribe((result) => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }
// }
