import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TimeSheet Generator';
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  values: any = [];
  hoursInput: number;
  projectCodeInput: number;
  calculatedHours: number;
  calculatedArray: any = [];
  array: any = [];
  // calculatedArrayElement = { hoursInput: 8, projectCodeInput: 8, item: [] };
  calculatedArrayElement: any;
  array2: any = [];
  error: string;
  str: string;
  forHalfDay: boolean = false;


  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  timeSheetForm = new FormGroup({
    hoursInput: new FormControl('12'),
    projectCodeInput: new FormControl('232')
  });

  onSubmit() {
    this.str = String(this.timeSheetForm.value.hoursInput / 8);
    this.values.push(this.str);

    if (this.timeSheetForm.value.hoursInput % 8 == 0) {
      this.error = '';
      this.calculatedArray.push(this.timeSheetForm.value);
      console.log(this.calculatedArray)

      for (let i = 0; i <= this.calculatedArray.length - 1; i++) {
        this.calculatedArrayElement = Object.assign({}, this.calculatedArray[i]);
        // this.calculatedArrayElement.hoursInput = this.calculatedArray[i].hoursInput;
        // this.calculatedArrayElement.projectCodeInput = this.calculatedArray[i].projectCodeInput;
        this.hoursInput = this.calculatedArrayElement.hoursInput / 8;
        console.log(this.calculatedArrayElement.item)
        this.calculatedArrayElement.item = [];

        for (let j = 0; j <= this.hoursInput - 1; j++) {
          this.calculatedArrayElement.item.push(this.hoursInput)
        }
        this.array[i] = this.calculatedArrayElement;
      }
      console.log(this.array);
    } else if (this.str.length == 3) {
      this.calculatedArray.push(this.timeSheetForm.value);
      console.log(this.calculatedArray)

      for (let k = 0; k <= this.values.length - 1; k++) {
        if (parseInt((this.values[k] + '').charAt(2)) == 5) {
          this.error = "true"
          for (let i = 0; i <= this.calculatedArray.length - 1; i++) {
            this.calculatedArrayElement = Object.assign({}, this.calculatedArray[i]);
            // this.calculatedArrayElement.hoursInput = this.calculatedArray[i].hoursInput;
            // this.calculatedArrayElement.projectCodeInput = this.calculatedArray[i].projectCodeInput;
            this.hoursInput = this.calculatedArrayElement.hoursInput / 8;
            console.log(this.calculatedArrayElement.item)
            this.calculatedArrayElement.item = [];
            console.log(this.hoursInput)
            for (let j = 0; j < this.hoursInput + 0.5; j++) {
              this.calculatedArrayElement.item.push(this.hoursInput)
              // this.calculatedArrayElement.item.length = j + 1;
            }
            this.array[i] = this.calculatedArrayElement;
          }
        }
        else {
          this.forHalfDay = false;
          this.error = "please enter proper value"
        }
      }
      console.log(this.array);
    } else {
      this.error = "Please Enter multiple of 8"
    }
  }

}