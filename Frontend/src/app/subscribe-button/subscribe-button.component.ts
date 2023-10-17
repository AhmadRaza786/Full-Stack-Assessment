import { Component, Input, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-subscribe-button",
  templateUrl: "./subscribe-button.component.html",
  styleUrls: ["./subscribe-button.component.scss"],
  imports: [IonicModule, RouterModule],
  standalone: true,
})
export class SubscribeButtonComponent implements OnInit {
  @Input() buttonText: any;

  constructor() {}

  ngOnInit() {}
}
