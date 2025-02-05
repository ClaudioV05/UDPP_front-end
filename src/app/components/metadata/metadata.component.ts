import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Metadata } from 'src/app/common/class/metadata';
import { MetadataForm } from 'src/app/common/class/metadataform';
import { ApiResponse } from 'src/app/common/interface/apiresponse';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css'],
})
export class MetadataComponent implements OnInit {
  metadataFormGroup!: FormGroup;
  title: Metadata = { id: 0, data: '' };
  description: Metadata = { id: 0, data: '' };
  architectures: ApiResponse[] = [];
  databases: ApiResponse[] = [];
  databasesEngineer: ApiResponse[] = [];
  developmentEnvironments: ApiResponse[] = [];
  forms: ApiResponse[] = [];

  architecturesDdl: string = '';
  databasesDdl: string = '';
  databasesEngineerDdl: string = '';
  developmentEnvironmentsDdl: string = '';
  formsDdl: string = '';

  fileContent: string | ArrayBuffer | null = '';

  constructor(
    private metadataService: MetadataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadMetadata();
    this.createMetadataForm();

    this.initializeSelectedOptionDropDownList();
  }

  loadMetadata() {
    this.metadataTitle();
    this.metadataDescription();
    this.metadataArchitectures();
    this.metadataDatabases();
    this.metadataDatabasesEngineer();
    this.metadataDevelopmentEnvironments();
    this.metadataForms();
  }

  metadataTitle() {
    this.metadataService.getMetadataTitle$().subscribe((response) => {
      this.title = response.metadata;
    });
  }

  metadataDescription() {
    this.metadataService.getMetadataDescription$().subscribe((response) => {
      this.description = response.metadata;
    });
  }

  metadataArchitectures() {
    this.metadataService.getMetadataArchitectures$().subscribe((response) => {
      this.architectures = response;
    });
  }

  metadataDatabases() {
    this.metadataService.getMetadataDatabases$().subscribe((response) => {
      this.databases = response;
    });
  }

  metadataDatabasesEngineer() {
    this.metadataService
      .getMetadataDatabasesEngineer$()
      .subscribe((response) => {
        this.databasesEngineer = response;
      });
  }

  metadataDevelopmentEnvironments() {
    this.metadataService
      .getMetadataDevelopmentEnvironment$()
      .subscribe((response) => {
        this.developmentEnvironments = response;
      });
  }

  metadataForms() {
    this.metadataService
      .getMetadataDevelopmentEnvironment$()
      .subscribe((response) => {
        this.forms = response;
      });
  }

  sendMetadata(file: File): void {
    this.metadataService
      .sendMetadata(new MetadataForm('', '', 0, 0, 0, 0, 0, file))
      .subscribe({
        next: (response) => {
          console.log('File uploaded successfully', response);
        },
        error: (error) => {
          console.error('Error uploading file', error);
        },
      });
  }

  itemDescriptionFromList(itemId: number, itemData: string): string {
    return itemId === 0 ? 'ITEMS' : itemData;
  }

  createMetadataForm() {
    this.metadataFormGroup = this.formBuilder.group({ metadata: this.formBuilder.group({
      description: new FormControl('', [ Validators.required, Validators.minLength(2)]),
      }),
      metadataItemList: this.formBuilder.group({
        architecture: new FormControl('', [ Validators.required, Validators.min(1)]),
        database: new FormControl('', [ Validators.required, Validators.min(1)]),
        databaseEngineer: new FormControl('', [ Validators.required, Validators.min(1)]),
        developmentEnvironment: new FormControl('', [Validators.required, Validators.min(1)]),
        form: new FormControl('', [Validators.required, Validators.min(1)]),
      }),
    });
  }

  get getDescription() { return this.metadataFormGroup.get('metadata.description'); }
  get getArchitecture() { return this.metadataFormGroup.get('metadataItemList.architecture'); }
  get getDatabase() { return this.metadataFormGroup.get('metadataItemList.database'); }
  get getDatabaseEngineer() { return this.metadataFormGroup.get('metadataItemList.databaseEngineer'); }
  get getDevelopmentEnvironment() { return this.metadataFormGroup.get( 'metadataItemList.developmentEnvironment'); }
  get getForm() { return this.metadataFormGroup.get('metadataItemList.form'); }

  metadataFormSubmit() {
    console.log('Form here');

    if (this.metadataFormGroup.invalid) {
      this.metadataFormGroup.markAllAsTouched();
    } else {
      console.log(this.metadataFormGroup.get('metadata')?.value);
      console.log(this.metadataFormGroup.get('metadataItemList')?.value);
    }
  }

  initializeSelectedOptionDropDownList() {
    this.architecturesDdl = '0';
    this.databasesDdl = '0';
    this.databasesEngineerDdl = '0';
    this.developmentEnvironmentsDdl = '0';
    this.formsDdl = '0';
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result !== null) {
          this.fileContent = reader.result;
        }
      };
      reader.readAsText(file);
    }
  }
}
