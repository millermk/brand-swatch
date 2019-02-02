import * as React from 'react';

import { colorCodeVisibility } from '../Models/AppSettings';
import { hexColor } from '../Models/Brand';
import ColorSwatch from './ColorSwatch';

interface ColorCardProps { 
    colors: hexColor[];
    className?: string;
    showColorCodes: colorCodeVisibility;
}

interface ColorCardState { }

export default class ColorCard extends React.Component<ColorCardProps, ColorCardState> {
    public constructor(props: ColorCardProps) {
        super(props);
    }

    public render() {
        let colorCard: JSX.Element[];
        let length = this.props.colors.length;

        if (length > 6) {
            let leftCount = Math.ceil(this.props.colors.length/2)
            colorCard = 
                ([<div className="color-card color-card-left" key="color-card-left">
                    {this.props.colors.slice(0,leftCount).map(c => <ColorSwatch showColorCodes={this.props.showColorCodes} minLightnessBordered={80} minLightnessDarkLabel={80} color={c} key={c}/>)}
                </div>,
                <div className="color-card color-card-right" key="color-card-right">
                    {this.props.colors.slice(leftCount, length).map(c => <ColorSwatch showColorCodes={this.props.showColorCodes} minLightnessBordered={80} minLightnessDarkLabel={80} color={c} key={c}/>)}
                </div>]);
        } else {
            colorCard = 
                ([<div className="color-card color-card-full" key="color-card-full">
                    {this.props.colors.map(c => <ColorSwatch showColorCodes={this.props.showColorCodes} minLightnessBordered={80} minLightnessDarkLabel={80} color={c} key={c}/>)}
                </div>]);
        }

        return (
            <div className={(this.props.className || '') + " color-card-container"}>
                {colorCard}
            </div>
        );
    }
}