import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../common/interface/apiresponse';
import { MetadataForm } from '../common/class/metadataform';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private readonly _basePath = 'http://localhost:3000/api/';
  private readonly _urlTitle = 'udppparameters/applicationTitle';
  private readonly _urlDescription = 'udppparameters/applicationDescription';
  private readonly _urlArchitectures = 'udppparameters/architectures';
  private readonly _urlDatabases = 'udppparameters/databases';
  private readonly _urlDatabasesEngineer = 'udppparameters/databasesEngineer';
  private readonly _urlDevelopmentEnvironment =
    'udppparameters/developmentEnvironment';
  private readonly _urlForm = 'udppparameters/form';
  private readonly _urlMetadata = 'udpp/metadata';

  private baseUrlMetadata_title = `${this._basePath}${this._urlTitle}`;
  private baseUrlMetadata_Description = `${this._basePath}${this._urlDescription}`;
  private baseUrlMetadata_architectures = `${this._basePath}${this._urlArchitectures}`;
  private baseUrlMetadata_databases = `${this._basePath}${this._urlDatabases}`;
  private baseUrlMetadata_databasesEngineer = `${this._basePath}${this._urlDatabasesEngineer}`;
  private baseUrlMetadata_developmentEnvironment = `${this._basePath}${this._urlDevelopmentEnvironment}`;
  private baseUrlMetadata_form = `${this._basePath}${this._urlForm}`;
  private baseUrlMetadata = `${this._basePath}${this._urlMetadata}`;

  constructor(private httpClient: HttpClient) { }

  getMetadataTitle$(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrlMetadata_title);
  }

  getMetadataDescription$(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrlMetadata_Description);
  }

  getMetadataArchitectures$(): Observable<ApiResponse[]> {
    return this.httpClient.get<ApiResponse[]>(
      this.baseUrlMetadata_architectures
    );
  }

  getMetadataDatabases$(): Observable<ApiResponse[]> {
    return this.httpClient.get<ApiResponse[]>(this.baseUrlMetadata_databases);
  }

  getMetadataDatabasesEngineer$(): Observable<ApiResponse[]> {
    return this.httpClient.get<ApiResponse[]>(
      this.baseUrlMetadata_databasesEngineer
    );
  }

  getMetadataDevelopmentEnvironment$(): Observable<ApiResponse[]> {
    return this.httpClient.get<ApiResponse[]>(
      this.baseUrlMetadata_developmentEnvironment
    );
  }

  getMetadataForm$(): Observable<ApiResponse[]> {
    return this.httpClient.get<ApiResponse[]>(this.baseUrlMetadata_form);
  }

  sendMetadata(metadataForm: MetadataForm): Observable<any> {
    const formData = new FormData();
    formData.append('data', metadataForm.data);

    return this.httpClient.post(this.baseUrlMetadata, formData, { headers: new HttpHeaders(), });
  }
}
