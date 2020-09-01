import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-multiple-inputs',
  templateUrl: './multiple-inputs.component.html',
  styleUrls: ['./multiple-inputs.component.scss']
})
export class MultipleInputsComponent implements OnInit {
  title = 'TimeSheet Generator';
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  timeSheetForm: FormGroup;
  submitted = false;
  hoursInput: number;
  projectCodeInput: number;
  calculatedHours: number;
  calculatedArrayElement: any;
  error: string;
  str: string;

  calculatedArray: any = [];
  values: any = [];
  array: any = [];
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
  userName: string = "Amar";
  monthName: string;
  numberOfTickets: any;
  currentIndex: number = 0;
  showButton: boolean = false;
  sum: number;
  currentWorkingDays: number;
  currentMonthHours: number;
  popup: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.monthName = moment().startOf("months").format('MMM');
    this.getdate();
    this.currentWorkingDays = this.dateArray.length;
    this.currentMonthHours = this.currentWorkingDays * 8;

    this.timeSheetForm = this.formBuilder.group({
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([])
    });
  }

  // convenience getters for easy access to form fields
  get f() { return this.timeSheetForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  onChangeTickets(e) {
    this.showButton = false;
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          hoursInput: ['', Validators.required],
          projectCodeInput: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }


  ExportTOExcel() {
    var ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, this.monthName + this.year);
    XLSX.writeFile(wb, this.monthName + 'TimeSheet.xlsx');
  }

  onSubmit() {
    this.error = "";
    this.getdate();
    this.submitted = true;
    this.numberOfTickets = this.timeSheetForm.value.numberOfTickets;

    // stop here if form is invalid
    if (this.timeSheetForm.invalid) {
      return;
    }

    // display form values on success

    for (let z = 0; z <= this.timeSheetForm.value.numberOfTickets - 1; z++) {
      this.str = String(this.timeSheetForm.value.tickets[z].hoursInput / 8);
      this.values.push(this.str);
      if (this.timeSheetForm.value.tickets[z].hoursInput % 8 == 0 || this.timeSheetForm.value.tickets[z].hoursInput % 7.5 == 0) {
        this.showButton = true;
        this.calculatedArray.push(this.timeSheetForm.value.tickets[z]);

        for (let i = 0 + z; i <= this.calculatedArray.length - 1; i++) {

          this.calculatedArrayElement = Object.assign({}, this.calculatedArray[i]);
          if (this.timeSheetForm.value.tickets[z].hoursInput % 8 == 0) {
            this.hoursInput = this.calculatedArrayElement.hoursInput / 8;
          } else if (this.timeSheetForm.value.tickets[z].hoursInput % 7.5 == 0) {
            this.hoursInput = this.calculatedArrayElement.hoursInput / 7.5;
          }
          this.calculatedArrayElement.hours = [];
          this.calculatedArrayElement.item = [];
          this.calculatedArrayElement.datesArray = [];

          for (let j = 0; j <= this.hoursInput - 1; j++) {
            if (this.timeSheetForm.value.tickets[z].hoursInput % 8 == 0) {
              this.calculatedArrayElement.hours.push(8);
            } else if (this.timeSheetForm.value.tickets[z].hoursInput % 7.5 == 0) {
              this.calculatedArrayElement.hours.push(7.5);
            }
            this.calculatedArrayElement.item.push(this.hoursInput)
            this.calculatedArrayElement.datesArray.push(this.dateArray[this.currentIndex]);
            this.currentIndex++
          }
          this.array[i] = this.calculatedArrayElement;
          // this.sum = this.array[i].hours.reduce(function (a, b) {
          //   return a + b;
          // }, 0);
        }
        console.log(this.array);
      }
      // else if (this.str.length == 3) {
      //   this.calculatedArray.push(this.timeSheetForm.value.tickets[z]);

      //   for (let k = 0 + z; k <= this.values.length - 1; k++) {
      //     if (parseInt((this.values[k] + '').charAt(2)) == 5) {
      //       this.error = "true"
      //       for (let i = 0 + z; i <= this.calculatedArray.length - 1; i++) {
      //         this.calculatedArrayElement = Object.assign({}, this.calculatedArray[i]);
      //         this.hoursInput = this.calculatedArrayElement.hoursInput / 8;
      //         this.calculatedArrayElement.hours = [];
      //         this.calculatedArrayElement.item = [];
      //         this.calculatedArrayElement.datesArray = [];

      //         for (let j = 0; j < this.hoursInput + 0.5; j++) {
      //           // this.calculatedArrayElement.hours.push(8)
      //           if (j == this.hoursInput + 0.5 - 1) {
      //             this.calculatedArrayElement.hours.push(4);
      //           } else {
      //             this.calculatedArrayElement.hours.push(8);
      //           }
      //           this.calculatedArrayElement.item.push(8)
      //           this.calculatedArrayElement.datesArray.push(this.dateArray[this.currentIndex]);
      //           this.currentIndex++
      //         }
      //         this.array[i] = this.calculatedArrayElement;
      //       }
      //     }
      //     else {
      //       this.error = "please enter proper value"
      //     }
      //   }
      //   console.log(this.array);
      // } 
      else {
        alert("Please enter only full day hours. Ex: If you are entering hours for 2 days with 7.5 hours each day, Enter 15 hours");
      }
    }

  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.showButton = false;
    this, this.calculatedArray = [];
    this.array = [];
    this.values = [];
    this.timeSheetForm.reset();
    this.t.clear();
    this.error = "";
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.showButton = false;
    this.t.reset();
    this.error = "";
  }

  getdate() {
    for (let i = 1; i <= moment().daysInMonth(); i++) {
      this.dateStr1 = this.month + '/' + i + '/' + this.year;
      this.myMoment = moment(this.dateStr1);
      if (this.myMoment.weekday() == 6 || this.myMoment.weekday() == 0) {
        // console.log(this.dateStr1=this.month+'/'+i+'/'+this.year)
      } else {
        this.dateArray.push(this.dateStr1)
        // console.log(this.dateArray)

      }
    }
  }

}
