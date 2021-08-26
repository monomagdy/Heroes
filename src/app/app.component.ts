import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { Icountry, Ihero } from './interfaces';
import { HeoresService } from './services/heoresService';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  searchText: string = '';
 


  title = 'Heroes';

  FiltersForm!: FormGroup;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  public dataSource = new MatTableDataSource<Ihero>();
  public dataSourcelength = 0;
  public retrivedData!: Ihero[];
  public sortedData!: Ihero[];
  public sortBy!: string;

  isExpanded: boolean = true;
  countries!: Icountry[];
  displayedColumns: string[] = ['name', 'phone', 'email', 'date', 'country','company'];

  constructor(private formBuilder: FormBuilder,
    private HeroService: HeoresService) { }

  ngOnInit(): void {
 
   this.dataSource = new MatTableDataSource<Ihero>();
    this.dataSource.sort = this.sort;
    this.initForm();
    this.getCountryList();
    this.getTableData();
  }
  toggleFilters() {
    this.isExpanded = !this.isExpanded;
  }
  getCountryList() {
    this.HeroService.getCountries().subscribe(res => {
      if (res.IsSuccess) {
        this.countries = res.Response as Icountry[]
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
      date: new FormControl(),
    });
  }

 /**Filter function */
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  getTableData() {
    this.HeroService.getHeroList().subscribe(res => {
      debugger;
       if (res.IsSuccess) {
        this.retrivedData = res.Response as Ihero[];
        this.dataSource = new MatTableDataSource<Ihero>(this.retrivedData);

        console.log(this.retrivedData);      }
    });
  }


}

