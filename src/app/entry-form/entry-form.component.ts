import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends MultipleInputsComponent {


}
