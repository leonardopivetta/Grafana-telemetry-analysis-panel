import { PanelPlugin } from '@grafana/data';
import { CustomPanelsTelemetryAnalysis, CustomPanelTelemetryAnalysisProps } from './CustomPanelsTelemetryAnalysis';

export enum CustomPanelTypes{
  Gauge = 'gauge_type',
  Map = 'map_type'
}

export const plugin = new PanelPlugin<CustomPanelTelemetryAnalysisProps>(CustomPanelsTelemetryAnalysis).setPanelOptions(builder => {
  return builder.addRadio({
    name: 'Type of graph',
    path: 'selector',
    defaultValue: CustomPanelTypes.Gauge,
    settings: {
      options: [
        {value: CustomPanelTypes.Gauge, label: 'Gauge'},
        {value: CustomPanelTypes.Map, label: 'Map'}
      ]
    }
  });
});
