import React, { PureComponent } from 'react';
import { PanelProps, DataHoverEvent, FieldType, GrafanaTheme } from '@grafana/data';
import { Gauge, getTheme } from '@grafana/ui';
import { CustomPanelTypes } from "./types";

// Custom props for this panel
export interface CustomPanelTelemetryAnalysisProps {
  selector: CustomPanelTypes
}

// State of the component
interface CustomPanelTelemetryAnalysisState {
  position: number | undefined; // Percent of cursor in the series 
}

// Test component for hover data analysis
export class CustomPanelsTelemetryAnalysis extends PureComponent<PanelProps<CustomPanelTelemetryAnalysisProps>, CustomPanelTelemetryAnalysisState>  {

  theme: GrafanaTheme | undefined;  // Theme of the panel
  selectedGraph: CustomPanelTypes;

  constructor(props: PanelProps<CustomPanelTelemetryAnalysisProps>) {
    super(props);
    this.selectedGraph = props.options.selector;
  }


  componentDidMount() {
    // Subscribes to the event bus of the DataHover and memorize the percentage of position of the serie
    this.props.eventBus.getStream(DataHoverEvent).subscribe((data) => {
      this.setState({ position: (data.payload.rowIndex ?? 0) / (data.payload.data?.length ?? 1000) });
    });
  }

  /// Builds the Gauge panel
  private buildGauge() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
          this.props.data.series.map((s) => { // Repeat the Gauge for every Time series
            var data = s.fields.filter((a) => a.type !== FieldType.time)[0]; // Gets the first field that isn't the time
            var x: number = data.values.get((Math.round((this.state?.position ?? 0.5) * data.values.length))); // Value mapped
            return (
              <Gauge
                height={this.props.height} // Adapts to the panel height
                width={this.props.width / this.props.data.series.length}  // Adapts to the panel width in correlation to the number of series
                theme={getTheme()} // Use the default theme
                value={{
                  numeric: x,
                  text: x?.toFixed(2),
                  color: 'hsl(' + Math.round(x) * 240 / 255 + ',100%, 50%)' // Changes the color of the gauge bar in correlation to the value
                }} />
            );
          })
        }
      </div>
    );
  }



  render() {
    switch (this.selectedGraph) {
      case CustomPanelTypes.Gauge:
        return this.buildGauge(); // Returns the Gauge section
      case CustomPanelTypes.Map:
        return (
          <div>
            <p>map</p>
          </div>
        )
    }
  }
}

// Am I happy? 😄 no.