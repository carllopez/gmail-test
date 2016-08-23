// Observable Version
import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: 'static/js/app/test/hero-list.component.html',
  providers: [ HeroService ]
})
export class HeroListComponent implements OnInit {
  public loading: boolean;
  errorMessage: string;
  heroes: Hero[];
  mode = 'Observable';

  constructor (private heroService: HeroService) {}

  ngOnInit() { 
    this.loading = true;
    this.getHeroes(); 
  }

  getHeroes() {
    this.heroService.getHeroes()
                     .subscribe(
                       items => this.getDone(items),
                       error =>  this.errorMessage = <any>error);
  }

  getDone(items: object) {
    console.log('inside el metodo');
    console.log(typeof(items));
    this.heroes = items;
    this.loading = false;
  }

  addHero (name: string) {
    if (!name) { return; }
    this.heroService.addHero(name)
                     .subscribe(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/