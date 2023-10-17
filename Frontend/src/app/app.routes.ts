import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { SubscriptionComponent } from "./pages/subscription/subscription.component";

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
