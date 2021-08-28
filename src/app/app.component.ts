import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { Icountry, Ihero } from './interfaces';
import { HeoresService } from './services/heoresService';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  title = 'Heroes';
  FiltersForm!: FormGroup;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  public dataSource = new MatTableDataSource<Ihero>();
  //for sorting
  public dataSourcelength = 0;
  public retrivedData!: Ihero[];
  isExpanded: boolean = true;
  countries!: Icountry[];
  displayedColumns: string[] = ['name', 'phone', 'email', 'date', 'country', 'company'];
  filterValues = {
    name: '',
    phone: '',
    email: '',
    date: '',
    country: '',
    company: ''
  };
  constructor(private formBuilder: FormBuilder,
    private HeroService: HeoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Ihero>();
    this.initForm();
    this.getCountryList();
    this.getTableData();
  }


  //toggle filters div
  toggleFilters() {
    this.isExpanded = !this.isExpanded;
  }

  //get county list for ddl
  getCountryList() {
    this.HeroService.getCountries().subscribe(res => {
      if (res.IsSuccess) {
        this.countries = res.Response as Icountry[]
      }
    });
  }

  //intiate form
  initForm() {
    const EmailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    const PhonePattern = '[- +()0-9]+';
    this.activatedRoute.queryParams.subscribe(queryParams => {
      const queryExist = queryParams && Object.keys(queryParams).length;
      this.FiltersForm = this.formBuilder.group({
        email: [queryExist ? queryParams.email : '', [Validators.pattern(EmailPattern)]],
        name: [queryExist ? queryParams.name : ''],
        phone: [queryExist ? queryParams.phone : '', [Validators.pattern(PhonePattern)]],
        company: [queryExist ? queryParams.company : ''],
        country: [queryExist ? queryParams.country : null],
        date: [queryExist ? queryParams.date : ''],
      });

    })
  }

  //get table data
  getTableData() {
    this.HeroService.getHeroList().subscribe(res => {
      if (res.IsSuccess) {
        this.retrivedData = res.Response as Ihero[];
        this.dataSource = new MatTableDataSource<Ihero>(this.retrivedData);
        //sorting
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'name', direction: 'asc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      }
    });
  }

  //Search function 
  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetForm() {
    this.FiltersForm.reset();
    this.getTableData();
    this.router.navigateByUrl('');

  }


  applyFilters() {

    if (this.FiltersForm.value != null) {

      this.router.navigate(
        ['filter/'],
        { queryParams: { ...this.FiltersForm.value }, queryParamsHandling: 'merge' },
      )

      this.filterValues['name'] = this.FiltersForm.controls.name.value;
      this.filterValues['phone'] = this.FiltersForm.controls.phone.value;
      this.filterValues['email'] = this.FiltersForm.controls.email.value;
      this.filterValues['date'] = this.FiltersForm.controls.date.value;
      this.filterValues['country'] = this.FiltersForm.controls.country.value;
      this.filterValues['company'] = this.FiltersForm.controls.company.value;

      this.dataSource.filter = JSON.stringify(this.filterValues)
      const filterValue = this.FiltersForm.controls.phone.value;
      this.dataSource.filter = filterValue.trim().toLowerCase();




    }


  }
}




