import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { Icountry } from './interfaces';
import { HeoresService } from './services/heoresService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Heroes';
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  FiltersForm!: FormGroup;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  displayedColumns: string[] = ['position', 'name'];
  dataSource!: MatTableDataSource<PeriodicElement>;
  isExpanded: boolean = true;
  countries!: Icountry[];
  constructor(private formBuilder: FormBuilder,
    private HeroService: HeoresService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initForm();
    this.getCountryList();
  }
  toggleFilters() {
    this.isExpanded = !this.isExpanded;
  }
  getCountryList() {
    this.HeroService.getCountries().subscribe(res => {
      if (res.IsSuccess) {
        this.countries = res.Response as Icountry[]
        console.log(res.Response);
      }
    });
  }
  initForm() {
    this.FiltersForm = this.formBuilder.group({
      email: new FormControl(),
      name: new FormControl(),
      phone: new FormControl(),
      company: new FormControl(),
      country: new FormControl(),
    });
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen' },
  { position: 2, name: 'Helium' },
  { position: 3, name: 'Lithium' },
  { position: 4, name: 'Beryllium' },
  { position: 5, name: 'Boron' },
  { position: 6, name: 'Carbon' },
  { position: 7, name: 'Nitrogen' },
  { position: 8, name: 'Oxygen' },
  { position: 9, name: 'Fluorine' },
  { position: 10, name: 'Neon' }
];
