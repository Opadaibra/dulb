import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedTableComponent } from "../../../shared/paginated-table/paginated-table.component";
import { BaseApiService } from '../../../core/services/base.api.service';
import { CompanyDTO } from '../../../features/company/Company.dto';
import { CompanyService } from '../../../features/company/company.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginatedTableComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends BaseApiService<CompanyDTO, CompanyService> implements OnInit {

  columns: { header: string; field: any }[] = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Founded Year', field: 'founded_year' },
    { header: 'Logo', field: 'logo' },
    { header: 'action', field: 'action' }
  ];
  

  // pagination data
  totalItems = 0;
  currentPage = 1;
  pageSize = 5; 

  constructor(protected override service: CompanyService) {
    super(service);
  }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies(page: number = 1) {
    this.loading = true;
    this.currentPage = page;

    this.service.getAll(page, this.pageSize).subscribe({
      next: (res: any) => {
        this.items = res.results || res; // لو ما كان paginated
        this.totalItems = res.count || this.items.length;
        this.loading = false;
      },
      error: (err) => this.handleError(err, null),
    });
  }

  loadPage(page: number) {
    this.loadCompanies(page);
  }

  triggerAction(event:any){
    console.log(event)
  }
}
