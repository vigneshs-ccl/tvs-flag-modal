import { Component, ViewChild } from '@angular/core';
import { CustomPanelComponent } from '@app/components/custom-panel/custom-panel.component';

@Component({
  selector: 'app-coach-profile',
  imports: [CustomPanelComponent],
  templateUrl: './coach-profile.component.html',
  styleUrl: './coach-profile.component.scss',
})
export class CoachProfileComponent {
  @ViewChild('panel') panel!: CustomPanelComponent;

  toggleProfilePanel(event: Event) {
    event.stopPropagation(); // ✅ Prevent immediate close
    this.panel.toggle();
  }
}
