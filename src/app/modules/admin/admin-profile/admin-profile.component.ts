import { Component, ViewChild } from '@angular/core';
import { CustomPanelComponent } from '@app/components/custom-panel/custom-panel.component';

@Component({
  selector: 'app-admin-profile.component',
  imports: [CustomPanelComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {
    @ViewChild('panel') panel!: CustomPanelComponent;

  toggleProfilePanel(event: Event) {
    event.stopPropagation(); // ✅ Prevent immediate close
    this.panel.toggle();
  }
}
