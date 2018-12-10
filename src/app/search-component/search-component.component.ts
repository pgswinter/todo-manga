import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {SearchService} from '../providers/search.service';
import {Administrators} from '../interfaces/administrator.interface';
import {Hero} from '../interfaces/heroes.interface';
import {CorporateEmployee} from '../interfaces/user.interface';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {
  loadingIndicator: boolean;

  administrators: Administrators[];
  heroes: Hero[];
  // administrators$: Observable<Administrators[]>;
  administratorsSearch: Observable<Administrators[]>;
  heroes$: Observable<Hero[]>;

  // rows: Observable<CorporateEmployee[]>;
  // rows: Promise<CorporateEmployee[]>;
  rows: CorporateEmployee[];
  private searchTerms = new Subject<string>();
  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.getAdministrators();
    this.getHeroes();
    // this.rows = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.searchService.searchData(term)),
    // );
    // this.administratorsSearch = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.searchService.searchData(term)),
    // );
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchHeroes(term)),
    );
  }

  submitSearch(term: string) {
    // Case 1:
    this.searchService.searchData(term).subscribe(res => this.rows = res);
    // ---
    // Case 2
    // this.searchTerms.next(term);
    // this.searchService.searchData(term).then(res => this.rows = res);
  }

  getAdministrators(): void {
    this.searchService.getData().subscribe(admins => this.administrators = admins);
  }

  getHeroes(): void {
    this.searchService.getHeroes().subscribe(heroes => {
      return this.heroes = heroes;
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
