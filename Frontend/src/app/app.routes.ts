import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SubscriptionComponent } from "./subscription/subscription.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "subscription",
    component: SubscriptionComponent,
    
  },

];
