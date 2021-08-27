import { Directive, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[appNgMatTableQueryReflector]'
})
export class NgMatTableQueryReflectorDirective {
  @Input()
  dataSource!: MatTableDataSource<any>;

  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

}
