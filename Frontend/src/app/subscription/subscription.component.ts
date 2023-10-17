import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { DateInputComponent } from "../date-input/date-input.component";
import { FormsModule } from "@angular/forms";
import { SubscribeButtonComponent } from "../subscribe-button/subscribe-button.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.scss"],
  standalone: true,
  imports: [
    IonicModule,
    DateInputComponent,
    FormsModule,
    SubscribeButtonComponent,
    HeaderComponent
  ],
})
export class SubscriptionComponent implements OnInit {
  selectedGrade: string = "default";

  constructor() {}

  ngOnInit() {}
}
