import { PanelPlugin } from '@grafana/data';
import { CustomPanelsTelemetryAnalysis, CustomPanelTelemetryAnalysisProps } from './CustomPanelsTelemetryAnalysis';
import { CustomPanelTypes } from './types';
import _ from "lodash";

export const plugin = new PanelPlugin<CustomPanelTelemetryAnalysisProps>(CustomPanelsTelemetryAnalysis).setPanelOptions(builder => {

  var options: {
    value: CustomPanelTypes;
    label: string;
  }[] = [];
  
  _.forIn(CustomPanelTypes, (key, value)=>{
    options.push({
      value: key,
      label: value
    })
  }); 

  return builder.addRadio({
    name: 'Type of graph',
    path: 'selector',
    defaultValue: CustomPanelTypes.Gauge,
    settings: {
      options: options
    }
  });
});
