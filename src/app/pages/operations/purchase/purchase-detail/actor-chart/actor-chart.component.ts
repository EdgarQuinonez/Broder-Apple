import { Component } from '@angular/core';
import {
  Chart,
  ChartType,
  ChartOptions,
  ChartData,
  ChartConfiguration,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-actor-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './actor-chart.component.html',
  styleUrl: './actor-chart.component.scss',
})
export class ActorChartComponent {
  // ------------------ Doughnut Chart Configuration ------------------

  public doughnutChartLabels: string[] = ['Investor 1', 'Investor 2'];
  // TODO: Have a switch case to determine the colors based on the number of actors.
  // TODO: Fix colors and change stroke width to be thinner. Fix dimensions and make it responsive.
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      {
        // TODO: Data comes from actors quantity array.
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A'],
        hoverBackgroundColor: ['#64B5F6', '#81C784'],
      },
    ];

  // TODO: Remove labels. Only the doughnut chart should be displayed.
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $${value}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  // -------------------------------------------------------------------
}
