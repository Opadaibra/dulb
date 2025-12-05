import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyDTO } from './Company.dto';
import { GenericApiService } from '../../core/services/genericApi.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends GenericApiService<CompanyDTO> {
    constructor(http: HttpClient) {
        super(http, 'api/companies'); 
    }


}
