import { Component, OnInit } from '@angular/core';
import { Metadata } from 'src/app/common/metadata';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-metadata-principal',
  templateUrl: './metadata-principal.component.html',
  styleUrls: ['./metadata-principal.component.css']
})

export class ProductListComponent implements OnInit {

  metadata: Metadata = { id: 0, data: "" };

  mTitle: Metadata = this.metadata;
  mDescription: Metadata = this.metadata;
  architectures: Metadata[] = [];
  databases: Metadata[] = [];
  databasesEngineer: Metadata[] = [];
  developmentEnvironments: Metadata[] = [];
  forms: Metadata[] = [];

  constructor(private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.metadataTitle();
    this.metadataDescription();
    this.metadataArchitectures();
    this.metadataDatabases();
    this.metadataDatabasesEngineer();
    this.metadataDevelopmentEnvironments();
    this.metadataForms();
  }

  metadataTitle = () => this.metadataService.getMetadataTitle().subscribe(data => { this.mTitle = data; });
  metadataDescription = () => this.metadataService.getMetadataDescription().subscribe(data => { this.mDescription = data; });
  metadataArchitectures = () => this.metadataService.getMetadataArchitectures().subscribe(data => { this.architectures = data; });
  metadataDatabases = () => this.metadataService.getMetadataDatabases().subscribe(data => { this.databases = data; });
  metadataDatabasesEngineer = () => this.metadataService.getMetadataDatabasesEngineer().subscribe(data => { this.databasesEngineer = data; });
  metadataDevelopmentEnvironments = () => this.metadataService.getMetadataDevelopmentEnvironment().subscribe(data => { this.developmentEnvironments = data; });
  metadataForms = () => this.metadataService.getMetadataDevelopmentEnvironment().subscribe(data => { this.forms = data; });
}