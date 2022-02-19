import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements AfterViewInit {
  children: string[] = [];   
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router) {
    for (let i = 1; i <= 100; i++) {
      this.children.push('Child ' + i);
    }
    this.dataSource = new MatTableDataSource<string>(this.children);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  navigate(name: string) {
    this.router.navigate(['parent', name]);
  }
}
