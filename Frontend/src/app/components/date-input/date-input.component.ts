import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-date-input",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DateInputComponent implements OnInit {
  selectedDate: string = "Date"; 
  selectedMonth: string = "Month"; 
  selectedYear: string = "Year";
  // Arrays for populating options
  dates: string[] = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  months: { name: string; value: string }[] = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  years: string[] = Array.from({ length: 24 }, (_, i) => (2000 + i).toString());

  constructor() {}

  ngOnInit() {}
}
