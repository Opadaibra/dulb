import { Component, Injector, OnInit } from '@angular/core';
import { GenericApiService } from '../../core/services/genericApi.service';
import { CompanyDTO } from '../../features/company/Company.dto';
import { CompanyService } from '../../features/company/company.service';
import { BaseApiService } from '../../core/services/base.api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-companies',
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent extends BaseApiService<CompanyDTO, CompanyService> implements OnInit {
  constructor(service: CompanyService) {
    super(service);
  }

  
  ngOnInit(): void {
    this.loadCompanies(); // 🚀 أول ما يفتح يجيب كل الكتب
  }

  // ✅ Read All
  loadCompanies() {
    this.loadAll().subscribe({
      next: () => console.log('Books loaded:', this.items)
    });
  }

  // ✅ Read One
  loadOne() {
    this.loadItem(1).subscribe({
      next: () => console.log('Loaded single book:', this.item)
    });
  }

  // ✅ Create
  addBook() {
    const newCompany: CompanyDTO = {
      id: Math.floor(Math.random() * 1000),
      name: 'New Angular Book',
      founded_year: 2025,
    };

    this.createItem(newCompany).subscribe({
      next: (company) => console.log('Created:', company)
    });
  }

  // ✅ Update
  updateBook(company: CompanyDTO) {
    const { logo, ...rest } = company;
    const updatedBook = { ...company, name: company.name + ' (Updated)' };
    this.updateItem(company.id, { ...rest, name: company.name + ' (Updated)' }).subscribe({
      next: (b) => console.log('Updated:', b)
    });
  }

  // ✅ Delete
  deleteBook(id: number) {
    this.deleteItem(id).subscribe({
      next: () => console.log(`Deleted company with id ${id}`)
    });
  }

}
