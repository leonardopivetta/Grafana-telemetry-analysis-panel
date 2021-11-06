import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { CustomPanelTypes } from "./types";
import { RealTimeGaugePanel } from 'components/RealTimeGaugePanel';
import { SteeringWheel } from 'components/SteeringWheel';

// Custom props for this panel
export interface CustomPanelTelemetryAnalysisProps {
  selector: CustomPanelTypes
}


// Test component for hover data analysis
export class CustomPanelsTelemetryAnalysis extends PureComponent<PanelProps<CustomPanelTelemetryAnalysisProps>>  {

  componentDidMount() {
    // Forced updates on option/configuration change
    this.props.onOptionsChange.bind(() => { this.setState({}); })
    this.props.onFieldConfigChange.bind(() => { this.setState({}) });
  }

  shouldComponentUpdate(nextProps: PanelProps<CustomPanelTelemetryAnalysisProps>) {
    return nextProps !== this.props || nextProps.options.selector !== this.props.options.selector
  }


  render() {
    switch (this.props.options.selector) {
      case CustomPanelTypes.Gauge:
        return <RealTimeGaugePanel props={this.props}/>;  // Returns the Gauge section
      case CustomPanelTypes.SteeringWheel:
        return <SteeringWheel props={this.props}/>;       // Returns the Steering wheel section
      case CustomPanelTypes.Map:
        return (<div><p>Map</p></div>);
    }
  }
}

// Am I happy? 😄 no.