import React, {useState} from 'react';
import {DataFrameView, DataHoverEvent, DisplayValue, PanelProps} from "@grafana/data";
import { Gauge, getTheme} from '@grafana/ui';
import { getNearestTime } from 'functions';

export interface RealTimeGaugePanelProps {
    props: PanelProps,
}

 
export const RealTimeGaugePanel: React.FC<RealTimeGaugePanelProps> = ({props}) =>{
    const [time, setTime] = useState(0);
    
    props.onOptionsChange.bind((_: any)=>{setTime(0)}) // Forcing update
    props.eventBus.getStream(DataHoverEvent).subscribe((data)=>{setTime(data.payload.point.time);}) // On mouse hover any time series gets the time and stores it in the time variable

    const isHorizontal = props.height < props.width;
    const seriesLength = props.data.series.length;

    return (
        <div style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column'}}>
            {props.data.series.map((serie)=>{
                    
                    //Data constants
                    const view = new DataFrameView(serie);
                    const nearestIndex = getNearestTime(view, time);
                    const value: number = view.get(nearestIndex)[1];
                    const graphicalValue: DisplayValue = {
                        text: value.toFixed(2),
                        numeric: value,
                        color: 'hsl('+Math.round(value)*240/255 + ', 100%, 50%)',
                        description: 'aaaa'
                    };


                    //Graphical constants
                    const height = isHorizontal ? props.height : props.height / seriesLength;
                    const width = isHorizontal ? props.width / seriesLength : props.width; 
                    const theme = getTheme();


                    return (
                        <Gauge 
                            height={height} width={width} theme={theme}
                            value = {graphicalValue}/>
                    );
                })}
        </div>
    );
}