import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { IonButton } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: "app-empty-state",
  templateUrl: "./empty-state.component.html",
  styleUrls: ["./empty-state.component.scss"],
  imports: [
    IonButton
  ]
})
export class EmptyStateComponent {
  public showBtn = input<boolean>(false);
  private readonly router = inject(Router);

  navigateToCreateTask() {
    this.router.navigate(['/create-task']);
  }
}