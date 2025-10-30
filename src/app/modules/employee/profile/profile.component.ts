import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CustomPanelComponent } from '@app/components/custom-panel/custom-panel.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, CustomPanelComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild('panel') panel!: CustomPanelComponent;

  toggleProfilePanel(event: Event) {
    event.stopPropagation(); //Prevent immediate close
    this.panel.toggle();
  }
}
