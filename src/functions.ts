import { DataFrameView } from "@grafana/data";

/// Checks the nearest point in a DataFrame
export function getNearestTime(view: DataFrameView, time: number): number{
    let lastEpsilon = time;
    for(let i = 0; i < view.length; i++){
        if(Math.abs(view.get(i)[0] - time) > lastEpsilon){
            return i;
        }
        lastEpsilon = Math.abs(view.get(i)[0] - time);
    }
    return 0;
}