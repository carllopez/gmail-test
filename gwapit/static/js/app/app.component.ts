import { Component }         from '@angular/core';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'my-app',
  template: `
    <hero-list></hero-list>
  `
})
export class AppComponent { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/