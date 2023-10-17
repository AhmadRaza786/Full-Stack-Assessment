import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { CardComponent } from "src/app/components/card/card.component";
import { SubscribeButtonComponent } from "src/app/components/subscribe-button/subscribe-button.component";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    IonicModule,
    CardComponent,
    CommonModule,
    SubscribeButtonComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class HomeComponent implements OnInit {
  cardData: any[] = [
    {
      title: "Step 1: Subscribe",
      description:
        "Select a subscription plan that suits your child's learning needs and preferences.",
      icon: "assets//subscribe.svg",
    },
    {
      title: "Step 2: Personalise Your Box",
      description:
        "Tell us about your child's age, interests, and learning goals, and we'll customize their surprise box accordingly.",
      icon: "assets//Personalise.svg",
    },
    {
      title: "Step 3: Receive Your Surprise Box",
      description:
        "Sit back and relax as your child eagerly awaits the arrival of their monthly surprise box filled with engaging learning materials.",
      icon: "assets//SurpriseBox.svg",
    },
  ];
  constructor() {}

  ngOnInit() {}
}
