import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Metadata } from 'src/app/common/class/metadata';
import { MetadataForm } from 'src/app/common/class/metadataform';
import { ApiResponse } from 'src/app/common/interface/apiresponse';
import { MetadataValidation } from 'src/app/common/validators/metadatavalidation';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css'],
})
export class MetadataComponent implements OnInit {
  public metadataFormGroup!: FormGroup;
  public title: Metadata = { id: 0, data: '' };
  public description: Metadata = { id: 0, data: '' };
  public architectures: ApiResponse[] = [];
  public databases: ApiResponse[] = [];
  public databasesEngineer: ApiResponse[] = [];
  public developmentEnvironments: ApiResponse[] = [];
  public forms: ApiResponse[] = [];

  public fileContent: string | ArrayBuffer | null = '';

  public startValidation: boolean = false;

  constructor(
    private metadataService: MetadataService,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMetadata();
    this.createMetadataForm();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
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

  private metadataTitle() {
    this.metadataService.getMetadataTitle$().subscribe((response) => {
      this.title = response.metadata;
    });
  }

  private metadataDescription() {
    this.metadataService.getMetadataDescription$().subscribe((response) => {
      this.description = response.metadata;
      //this.metadataFormGroup.patchValue({ metadataFormDescription: response });
    });
  }

  private metadataArchitectures() {
    this.metadataService.getMetadataArchitectures$().subscribe((response) => {
      this.architectures = response;
    });
  }

  private metadataDatabases() {
    this.metadataService.getMetadataDatabases$().subscribe((response) => {
      this.databases = response;
    });
  }

  private metadataDatabasesEngineer() {
    this.metadataService
      .getMetadataDatabasesEngineer$()
      .subscribe((response) => {
        this.databasesEngineer = response;
      });
  }

  private metadataDevelopmentEnvironments() {
    this.metadataService
      .getMetadataDevelopmentEnvironment$()
      .subscribe((response) => {
        this.developmentEnvironments = response;
      });
  }

  private metadataForms() {
    this.metadataService
      .getMetadataDevelopmentEnvironment$()
      .subscribe((response) => {
        this.forms = response;
      });
  }

  public sendMetadata(file: File): void {
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

  public itemDescriptionFromList(itemId: number, itemData: string): string {
    return itemId === 0 ? 'ITEMS' : itemData;
  }

  public createMetadataForm() {
    let formInitialValue: string = '0';

    this.metadataFormGroup = this.formBuilder.group({
      metadata: this.formBuilder.group({
        metadataFormDescription: new FormControl('', [Validators.required, Validators.minLength(2), MetadataValidation.notOnlyWhitespace, MetadataValidation.textContainsInicialValue]),
      }),
      metadataItemList: this.formBuilder.group({
        metadataFormArchitecture: new FormControl(formInitialValue, [Validators.required, Validators.min(1)]),
        metadataFormDatabase: new FormControl(formInitialValue, [Validators.required, Validators.min(1)]),
        metadataFormDatabaseEngineer: new FormControl(formInitialValue, [Validators.required, Validators.min(1)]),
        metadataFormDevelopmentEnvironment: new FormControl(formInitialValue, [Validators.required, Validators.min(1)]),
        metadataFormForm: new FormControl(formInitialValue, [Validators.required, Validators.min(1)]),
      }),
    });
  }

  get getDescription() { return this.metadataFormGroup.get('metadata.metadataFormDescription'); }
  get getArchitecture() { return this.metadataFormGroup.get('metadataItemList.metadataFormArchitecture'); }
  get getDatabase() { return this.metadataFormGroup.get('metadataItemList.metadataFormDatabase'); }
  get getDatabaseEngineer() { return this.metadataFormGroup.get('metadataItemList.metadataFormDatabaseEngineer'); }
  get getDevelopmentEnvironment() { return this.metadataFormGroup.get('metadataItemList.metadataFormDevelopmentEnvironment'); }
  get getForm() { return this.metadataFormGroup.get('metadataItemList.metadataFormForm'); }

  public metadataFormSubmit() {
    console.log('Form here');

    if (this.metadataFormGroup.invalid) {
      this.startValidation = true;
      this.metadataFormGroup.markAllAsTouched();
    } else {
      console.log(this.metadataFormGroup.get('metadata')?.value);
      console.log(this.metadataFormGroup.get('metadataItemList')?.value);
    }
  }

  public onFileSelected(event: any) {
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
