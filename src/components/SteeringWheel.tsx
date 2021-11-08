import { DataFrameView, DataHoverEvent, PanelProps } from '@grafana/data';
import { getNearestTime } from 'functions';
import React, { useState } from 'react';

export interface SteeringWheelProps {
  props: PanelProps;
}

export const SteeringWheel: React.FC<SteeringWheelProps> = ({ props }) => {
  const [time, setTime] = useState(0);

  props.eventBus.getStream(DataHoverEvent).subscribe((data) => {
    setTime(data.payload.point.time);
  }); // Bus for reading the poistion of the cursor
  props.onOptionsChange.bind((e: any) => {
    setTime(0);
  });

  // Data constants
  const serie = props.data.series[0];
  const view = new DataFrameView(serie);

  var degree = 0;
  if (props.options.realtime) {
    // If the real time option is set it gets the last value
    degree = view.get(view.length - 1)[1];
  } else {
    const nearestIndex = getNearestTime(view, time); // Gets the nearest point in the dataFrame in relation to the time of the pointer
    degree = view.get(nearestIndex)[1]; // [0] is the time, [1] is the value
  }

  // Grafical constants
  const height = props.height;
  const width = props.width;

  // Padding for fitting the steering wheel inside the box
  const isHorizontal = width > height;
  const padding = Math.abs(height - width) / 2;

  const color = 'hsl(' + (120 - Math.abs(degree)) + ', 100%, 50%)'; // Color using the hsl encoding

  return (
    <div>
      <svg
        height={height}
        width={width}
        viewBox="0 0 374.43 212.87"
        transform={'rotate(' + degree + ')'}
        style={
          isHorizontal
            ? { paddingLeft: padding, paddingRight: padding }
            : { paddingTop: padding, paddingBottom: padding }
        }
      >
        <path
          fill={color} // Outer path (coloured)
          d="M16.54,208.07a18,18,0,0,0,.37-2.87,65.7,65.7,0,0,0-.37-11.53c-1.09-10.25-36.66-66.76,0-150.32C33.34,8.87,53.55.15,64.46,0,78.57,1.89,172.52,12.09,191.74,9.75c33.6.43,70.69-5.1,127-9.75,71.56,32.44,60.07,146.31,42.33,194.76,0,0-1.75,7.86.43,13.31s-9.16,4.58-9.16,4.58S335.74,210,334,205.2,327.88,190,330.06,183s6.11-11.34,6.55-20.07,4.36-26.18-.44-27.93-7.42-8.73-21.38-4.36c-4.36-7-19.64,1.74-18.33,9.16s4.37,19.64-.43,26.62-23.57,9.16-35.78,11.78-33.6-1.74-66.33-1.31-66.33,3.93-77.24,1.75-31.42-3.06-35.78-14,3-10.47.44-23.56-9.17-13.53-19.2-9.16-3.56,1-13.53-1.31c-17.46,8.73-1.75,49.74-1.75,49.74s4.8,17.82-4.36,24.84c-13.53,7.89-12.22,8-19.64,7.51S16.54,208.07,16.54,208.07Z"
        />
        <path
          fill="#000" // Inner path (black)
          d="M26.32,207.2c-.77,0-1.79-.07-3.09-.15-.3,0-.56-.05-.79-.08,0-.4.09-.86.13-1.36a71.84,71.84,0,0,0-.4-12.54c-.26-2.46-1.41-5.48-3.33-10.48-8-20.83-26.63-69.59,2.84-136.86C39.63,9,59.46,5.87,64.17,5.68c12,1.56,89,10.08,119.5,10.08a80.05,80.05,0,0,0,8.36-.34l3.49,0c21.7,0,44.63-2.27,73.67-5.14,14.34-1.42,30.54-3,48.5-4.53,35.91,17.09,47.05,56.19,50,86.17,3.95,39.48-4,79-12,100.87l-.13.36-.08.36a35.66,35.66,0,0,0-.24,13.47c-.38,0-.82,0-1.31,0s-.79,0-1,0c-5.8-1-12.13-2.95-13.83-4.3l-.31-.81c-1.54-4.12-4.75-12.69-3.34-17.23a52.28,52.28,0,0,1,2.44-6c1.89-4.1,4-8.74,4.36-15.51.11-2.08.45-4.87.81-7.82,1.44-11.77,2.81-22.89-5-25.72a11.74,11.74,0,0,1-2.11-1.36c-2.59-1.89-6.5-4.75-13.17-4.75a29.07,29.07,0,0,0-6.44.77,12.07,12.07,0,0,0-6.69-1.92c-5.4,0-11.61,3.08-15.46,7.67-2.8,3.34-4,7.14-3.36,10.71.15.83.31,1.71.49,2.65,1.16,6.17,2.92,15.49,0,19.77-2.6,3.77-16.56,6.41-24.9,8-2.62.5-5.09,1-7.4,1.46a44,44,0,0,1-8.9.71c-4.83,0-10.64-.38-17.38-.82-9.28-.6-20.84-1.36-34.2-1.36l-4.74,0c-13.16.18-26.51.85-38.29,1.44-11,.55-20.46,1-27.74,1a58,58,0,0,1-10-.6c-2.11-.42-4.48-.79-7-1.17-8.86-1.37-22.26-3.42-24.63-9.34-1.47-3.69-1.11-4.75-.23-7.32,1.07-3.13,2.53-7.42,1-15.25-2.15-10.75-7.36-16.2-15.47-16.2-3.25,0-6.92.93-11.55,3-.61.26-1.86.8-2.86,1.21a20.83,20.83,0,0,0-7.12-2.84l-2-.47-1.84.92c-21,10.51-6.86,50.58-4.62,56.53,1,3.85,2.42,14.54-2.17,18.43-1.92,1.12-3.53,2.09-4.91,2.91C28.19,207.1,27.87,207.2,26.32,207.2Z"
        />
        <text transform="translate(200 111.8)" fill="#fff" fontSize={87} textAnchor="middle">
          {Math.round(degree)}°
        </text>
      </svg>
    </div>
  );
};

// Am I happy? 😄 no.
