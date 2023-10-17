import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { SubscribeButtonComponent } from "src/app/components/subscribe-button/subscribe-button.component";
import { DateInputComponent } from "src/app/components/date-input/date-input.component";
import { HeaderComponent } from "src/app/components/header/header.component";

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
    HeaderComponent,
  ],
})
export class SubscriptionComponent implements OnInit {
  selectedGrade: string = "default";

  constructor() {}

  ngOnInit() {}
}
