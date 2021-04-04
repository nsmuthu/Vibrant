import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    page= 1;
    pageSize=6;
    totalLength=0;
    previousPage: any;
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users['data'];
                this.totalLength = 800;
            });
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

    loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.accountService.getAll({
      page: this.page - 1
    })
            .pipe(first())
            .subscribe(users => {
                this.users = users['data'];
                this.totalLength = 800;
            });
  }
}