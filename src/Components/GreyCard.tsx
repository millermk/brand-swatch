import * as React from 'react';

import { colorCodeVisibility } from '../Models/AppSettings';
import { hexColor } from '../Models/Brand';
import GreySwatch from './GreySwatch';

interface GreyCardProps { 
    colors: hexColor[];
    className?: string;
    showColorCodes: colorCodeVisibility;
}

interface GreyCardState { }

export default class GreyCard extends React.Component<GreyCardProps, GreyCardState> {
    public constructor(props: GreyCardProps) {
        super(props);
    }

    public render() {
        return (
            <div className={(this.props.className || '') + " grey-card"}>
                {this.props.colors.map(c => <GreySwatch showColorCodes={this.props.showColorCodes} minLightnessBordered={80} minLightnessDarkLabel={80} color={c} key={c}/>)}
            </div>
        );
    }
}