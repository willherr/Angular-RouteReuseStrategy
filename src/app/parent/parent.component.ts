import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

console.log("Outside parent...");

const MOCK_DATA:string[] = [];
for (let i = 1; i <= 100; i++) {
  MOCK_DATA.push('Child ' + i);
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements AfterViewInit {   
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource<string>(MOCK_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  navigate(name: string) {
    this.router.navigate(['parent', name]);
  }
}
