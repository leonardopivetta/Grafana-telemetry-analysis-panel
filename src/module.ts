import { PanelPlugin } from '@grafana/data';
import { CustomPanelsTelemetryAnalysis, CustomPanelTelemetryAnalysisProps } from './CustomPanelsTelemetryAnalysis';
import { CustomPanelTypes } from './types';

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
