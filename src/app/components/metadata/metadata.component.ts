import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Metadata } from 'src/app/common/class/metadata';
import { ApiResponse } from 'src/app/common/interface/apiresponse';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})

export class MetadataComponent implements OnInit {

  metadataFormGroup!: FormGroup;
  title: Metadata = { id: 0, data: "" };
  description: Metadata = { id: 0, data: "" };
  architectures: ApiResponse[] = [];
  databases: ApiResponse[] = [];
  databasesEngineer: ApiResponse[] = [];
  developmentEnvironments: ApiResponse[] = [];
  forms: ApiResponse[] = [];

  architecturesDdl: string = "";
  databasesDdl: string = "";
  databasesEngineerDdl: string = "";
  developmentEnvironmentsDdl: string = "";
  formsDdl: string = "";

  constructor(private metadataService: MetadataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadMetadata();
    this.createForm();

    this.initializeSelectedOptionDropDownList();
  }

  loadMetadata(){
    this.metadataTitle();
    this.metadataDescription();
    this.metadataArchitectures();
    this.metadataDatabases();
    this.metadataDatabasesEngineer();
    this.metadataDevelopmentEnvironments();
    this.metadataForms();
  }

  metadataTitle() {
    this.metadataService.getMetadataTitle$().subscribe(
      (response) => {
        this.title = response.metadata;
      })
  }

  metadataDescription() {
    this.metadataService.getMetadataDescription$().subscribe(
      (response) => {
        this.description = response.metadata;
      })
  }

  metadataArchitectures() {
    this.metadataService.getMetadataArchitectures$().subscribe(
      (response) => {
        this.architectures = response;
      })
  }

  metadataDatabases() {
    this.metadataService.getMetadataDatabases$().subscribe(
      (response) => {
        this.databases = response;
      })
  }

  metadataDatabasesEngineer() {
    this.metadataService.getMetadataDatabasesEngineer$().subscribe(
      (response) => {
        this.databasesEngineer = response;
      })
  }

  metadataDevelopmentEnvironments() {
    this.metadataService.getMetadataDevelopmentEnvironment$().subscribe(
      (response) => {
        this.developmentEnvironments = response;
      })
  }

  metadataForms() {
    this.metadataService.getMetadataDevelopmentEnvironment$().subscribe(
      (response) => {
        this.forms = response;
      })
  }

  itemDescriptionFromList(itemId: number, itemData: string): string {
    return itemId === 0 ? "ITEMS" : itemData;
  }

  createForm() {
    this.metadataFormGroup = this.formBuilder.group({
      metadata: this.formBuilder.group({
        fDescription: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }),
      metadataItemList: this.formBuilder.group({
        fArchitecture: new FormControl('', [Validators.required, Validators.min(1)]),
        fDatabase: new FormControl('', [Validators.required, Validators.min(1)]),
        fDatabaseEngineer: new FormControl('', [Validators.required, Validators.min(1)]),
        fDevelopmentEnvironment: new FormControl('', [Validators.required, Validators.min(1)]),
        fForm: new FormControl('', [Validators.required, Validators.min(1)])
      })
    });
  }

  get getMetadataFormGroupDescription() { return this.metadataFormGroup.get('metadata.fDescription'); }
  get getMetadataFormGroupArchitecture() { return this.metadataFormGroup.get('metadataItemList.fArchitecture'); }
  get getMetadataFormGroupDatabase() { return this.metadataFormGroup.get('metadataItemList.fDatabase'); }
  get getMetadataFormGroupDatabaseEngineer() { return this.metadataFormGroup.get('metadataItemList.fDatabaseEngineer'); }
  get getMetadataFormGroupDevelopmentEnvironment() { return this.metadataFormGroup.get('metadataItemList.fDevelopmentEnvironment'); }
  get getMetadataFormGroupForm() { return this.metadataFormGroup.get('metadataItemList.fForm'); }

  metadataFormSubmit() {
    console.log("Form here");

    if (this.metadataFormGroup.invalid) {
      this.metadataFormGroup.markAllAsTouched();
    } else {
      console.log(this.metadataFormGroup.get("metadata")?.value);
      console.log(this.metadataFormGroup.get("metadataItemList")?.value);
    }
  }

  initializeSelectedOptionDropDownList() {
    this.architecturesDdl = "0"
    this.databasesDdl = "0"
    this.databasesEngineerDdl = "0"
    this.developmentEnvironmentsDdl = "0"
    this.formsDdl = "0"
  }
}