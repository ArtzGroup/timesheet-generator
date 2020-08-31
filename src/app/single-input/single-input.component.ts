import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-single-input',
  templateUrl: './single-input.component.html',
  styleUrls: ['./single-input.component.scss']
})
export class SingleInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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
  error: string;
  str: string;

  dateArray: any = [];
  d = new Date();
  date = this.d.getDate();
  month = this.d.getMonth() + 1;
  year = this.d.getFullYear();
  dateStr: string = this.year + '-' + this.month;
  dateStr1: string;

  now = moment().format('LLLL');
  myMoment: moment.Moment;
  currentDate: string;

  ExportTOExcel() {
    var ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    var header = this.dateArray;

    /* add row objects to sheet starting from cell A6 */

    // XLSX.utils.sheet_add_json(ws, [
    //   { data: '' }
    // ], { origin: "D1:D4", header: header });


    // XLSX.utils.sheet_add_aoa(ws, [
    //   ["Data 1", 1],
    //   ["Data 2", 2]
    // ], { origin: -1 });
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  timeSheetForm = new FormGroup({
    hoursInput: new FormControl('16'),
    projectCodeInput: new FormControl('232')
  });

  onSubmit() {
    this.getdate();

    this.str = String(this.timeSheetForm.value.hoursInput / 8);
    this.values.push(this.str);

    if (this.timeSheetForm.value.hoursInput % 8 == 0) {
      this.error = '';
      this.calculatedArray.push(this.timeSheetForm.value);
      console.log(this.calculatedArray)

      for (let i = 0; i <= this.calculatedArray.length - 1; i++) {

        this.calculatedArrayElement = Object.assign({}, this.calculatedArray[i]);
        this.hoursInput = this.calculatedArrayElement.hoursInput / 8;
        this.calculatedArrayElement.item = [];
        // this.calculatedArrayElement.datesArray = [];

        for (let j = 0; j <= this.hoursInput - 1; j++) {
          this.calculatedArrayElement.item.push(this.hoursInput)

          // this.dateStr1 = this.month + '/' + (j + 1) + '/' + this.year;

          // Useful Commented Code
          // this.myMoment = moment(this.dateStr1);
          // console.log(this.myMoment);
          // if (this.myMoment.weekday() == 6 || this.myMoment.weekday() == 0) {
          // } else {
          //   this.dateArray.push(this.dateStr1)
          // }
          //Ends here

          // this.currentDate = this.month + '/' + (j + 1) + '/' + this.year;
          // this.calculatedArrayElement.datesArray.push(this.currentDate)


          // this.calculatedArrayElement.item.input = this.hoursInput
          // this.calculatedArrayElement.item.datesArray = this.currentDate;
          // this.calculatedArrayElement.item.length = this.hoursInput;
        }
        this.array[i] = this.calculatedArrayElement;
        this.dateArray.length = this.array[i].item.length;
        console.log(this.dateArray.length)
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
            for (let j = 0; j < this.hoursInput + 0.5; j++) {
              this.calculatedArrayElement.item.push(this.hoursInput)
              // this.calculatedArrayElement.item.length = j + 1;
            }
            this.array[i] = this.calculatedArrayElement;
          }
        }
        else {
          this.error = "please enter proper value"
        }
      }
      console.log(this.array);
    } else {
      this.error = "Please Enter multiple of 8"
    }
    console.log(this.dateArray)

  }

  getdate() {
    for (let i = 1; i <= moment().daysInMonth(); i++) {
      this.dateStr1 = this.month + '/' + i + '/' + this.year;
      this.myMoment = moment(this.dateStr1);
      if (this.myMoment.weekday() == 6 || this.myMoment.weekday() == 0) {
        // console.log(this.dateStr1=this.month+'/'+i+'/'+this.year)
      } else {
        this.dateArray.push(this.dateStr1)
        console.log(this.dateArray)

      }
    }
  }

}
