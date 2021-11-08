import React, { useState } from 'react';
import { DataFrameView, DataHoverEvent, DisplayValue, PanelProps } from '@grafana/data';
import { Gauge, getTheme } from '@grafana/ui';
import { getNearestTime } from 'functions';

export interface RealTimeGaugePanelProps {
  props: PanelProps; // Stock panel props for the eventbus, data etc.
}

/// Stock Gauge panel but the data refears to the crosshover pointer
export const RealTimeGaugePanel: React.FC<RealTimeGaugePanelProps> = ({ props }) => {
  const [time, setTime] = useState(0);

  props.onOptionsChange.bind((_: any) => {
    setTime(0);
  }); // Forcing update
  props.eventBus.getStream(DataHoverEvent).subscribe((data) => {
    setTime(data.payload.point.time);
  }); // On mouse hover any time series gets the time and stores it in the time variable

  const isHorizontal = props.height < props.width; // Checks if the current panel is in horizontal mode
  const seriesLength = props.data.series.length; // Count of the series to display

  return (
    <div style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column' }}>
      {props.data.series.map((serie) => {
        //Data constants
        const view = new DataFrameView(serie);
        const nearestIndex = getNearestTime(view, time);
        const value: number = view.get(nearestIndex)[1]; // [1] means the value, [0] is the time
        const graphicalValue: DisplayValue = {
          // Refear to DisplayValue interface
          text: value.toFixed(2),
          numeric: value,
          color: 'hsl(' + (Math.round(value) * 240) / 255 + ', 100%, 50%)', // Gradient using the hsl encoding
        };

        //Graphical constants
        const height = isHorizontal ? props.height : props.height / seriesLength; // Adapts the heigth to the number of series to display
        const width = isHorizontal ? props.width / seriesLength : props.width; // Adapts the width to the number of series to display
        const theme = getTheme();

        return <Gauge height={height} width={width} theme={theme} value={graphicalValue} />;
      })}
    </div>
  );
};
