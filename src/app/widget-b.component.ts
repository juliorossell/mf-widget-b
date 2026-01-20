import { Component } from '@angular/core';
import { onTopic } from '@shared/mf-bus';
import { NotificationItem, Topics } from '@shared/mf-events';

@Component({
  selector: 'app-widget-b',
  imports: [],
  templateUrl: './widget-b.component.html',
  styleUrl: './widget-b.component.scss',
})
export class WidgetBComponent {
  alerts = 4;

  ngOnInit(): void {
    console.log('init listeners in Widget B...');
    onTopic<NotificationItem>(Topics.NotificationsEnqueue).subscribe(({ payload }) => {
      console.log('Nueva notificación recibida en Widget B:', payload);
    });
  }

  increment() {
    this.alerts++;
  }
}
