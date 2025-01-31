import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from '../common/metadata';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private readonly _basePath = 'http://localhost:3000/api/udppparameters/';
  private readonly _applicationTitle = "applicationTitle";
  private readonly _applicationDescription = "applicationDescription";
  private readonly _architectures = "architectures";
  private readonly _databases = "databases";
  private readonly _databasesEngineer = "databasesEngineer";
  private readonly _developmentEnvironment = "developmentEnvironment";
  private readonly _form = "form";

  private baseUrlMetadataApplicationTitle = `${this._basePath}${this._applicationTitle}`;
  private baseUrlMetadataApplicationDescription = `${this._basePath}${this._applicationDescription}`;
  private baseUrlMetadata_architectures = `${this._basePath}${this._architectures}`;
  private baseUrlMetadata_databases = `${this._basePath}${this._databases}`;
  private baseUrlMetadata_databasesEngineer = `${this._basePath}${this._databasesEngineer}`;
  private baseUrlMetadata_developmentEnvironment = `${this._basePath}${this._developmentEnvironment}`;
  private baseUrlMetadata_form = `${this._basePath}${this._form}`;

  constructor(private httpClient: HttpClient) { }

  getMetadataTitle(): Observable<GetEmbedded> {
    return this.httpClient.get<GetEmbedded>(this.baseUrlMetadataApplicationTitle).pipe(map(response => response));
  }

  getMetadataDescription(): Observable<Metadata> {
    return this.httpClient.get<Metadata>(this.baseUrlMetadataApplicationDescription);
  }

  getMetadataArchitectures(): Observable<Metadata[]> {
    return this.httpClient.get<Metadata[]>(this.baseUrlMetadata_architectures);//.pipe(map(response => response));
  }

  getMetadataDatabases(): Observable<Metadata[]> {
    return this.httpClient.get<Metadata[]>(this.baseUrlMetadata_databases);//.pipe(map(response => response));
  }

  getMetadataDatabasesEngineer(): Observable<Metadata[]> {
    return this.httpClient.get<Metadata[]>(this.baseUrlMetadata_databasesEngineer);//.pipe(map(response => response));
  }

  getMetadataDevelopmentEnvironment(): Observable<Metadata[]> {
    return this.httpClient.get<Metadata[]>(this.baseUrlMetadata_developmentEnvironment);//.pipe(map(response => response));
  }

  getMetadataForm(): Observable<Metadata[]> {
    return this.httpClient.get<Metadata[]>(this.baseUrlMetadata_form);//.pipe(map(response => response));
  }
}

interface GetEmbedded {
  metadata: Metadata
}

interface IMetadataList {
  metadata: Metadata[];
}
