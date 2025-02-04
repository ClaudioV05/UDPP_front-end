import { Component, OnInit } from '@angular/core';
import { Metadata } from 'src/app/common/class/metadata';
import { ApiResponse } from 'src/app/common/interface/apiresponse';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-metadata-principal',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})

export class MetadataComponent implements OnInit {

  title: Metadata = { id: 0, data: "" };
  description: Metadata = { id: 0, data: "" };
  architectures: ApiResponse[] = [];
  databases: ApiResponse[] = [];
  databasesEngineer: ApiResponse[] = [];
  developmentEnvironments: ApiResponse[] = [];
  forms: ApiResponse[] = [];

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

  metadataTitle() {
    this.metadataService.getMetadataTitle().subscribe(
      (response) => {
        this.title = response.metadata;
      })
  }

  metadataDescription() {
    this.metadataService.getMetadataDescription().subscribe(
      (data) => {
        this.description = data.metadata;
      })
  }

  metadataArchitectures() {
    this.metadataService.getMetadataArchitectures().subscribe(
      (response) => {
        this.architectures = response;
      })
  }

  metadataDatabases() {
    this.metadataService.getMetadataDatabases().subscribe(
      (response) => {
        this.databases = response;
      })
  }

  metadataDatabasesEngineer() {
    this.metadataService.getMetadataDatabasesEngineer().subscribe(
      (response) => {
        this.databasesEngineer = response;
      })
  }

  metadataDevelopmentEnvironments() {
    this.metadataService.getMetadataDevelopmentEnvironment().subscribe(
      (response) => {
        this.developmentEnvironments = response;
      })
  }

  metadataForms() {
    this.metadataService.getMetadataDevelopmentEnvironment().subscribe(
      (response) => {
        this.forms = response;
      })
  }
}