import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.metadataTitle();
    this.metadataDescription();
    this.metadataArchitectures();
    this.metadataDatabases();
    this.metadataDatabasesEngineer();
    this.metadataDevelopmentEnvironments();
    this.metadataForms();
    this.createForm();

    this.initializeSelectedOptionDropDownList();

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
        description: ['', Validators.required],
      }),
      metadataItemList: this.formBuilder.group({
        architecture: ['', Validators.required],
        database: ['', Validators.required],
        databaseEngineer: ['', Validators.required],
        developmentEnvironment: ['', Validators.required],
        form: ['', Validators.required]
      })
    });
  }

  formSubmit() {
    console.log("Form here");
    console.log(this.metadataFormGroup.get("metadata")?.value);
    console.log(this.metadataFormGroup.get("metadataItemList")?.value);
  }

  initializeSelectedOptionDropDownList() {
    this.architecturesDdl = "0"
    this.databasesDdl = "0"
    this.databasesEngineerDdl = "0"
    this.developmentEnvironmentsDdl = "0"
    this.formsDdl = "0"
  }
}