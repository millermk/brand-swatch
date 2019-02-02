import * as React from 'react';

import { colorCodeVisibility } from '../Models/AppSettings';
import { hexColor } from '../Models/Brand';
import { Color } from '../Models/Color';

interface GreySwatchProps { 
    color: hexColor;
    minLightnessBordered: number;
    minLightnessDarkLabel: number;
    showColorCodes: colorCodeVisibility;
}

interface GreySwatchState { }

export default class GreySwatch extends React.Component<GreySwatchProps, GreySwatchState> {
    public constructor(props: GreySwatchProps) {
        super(props);
    }

    private color = new Color(this.props.color);

    public render() {
        return (
            <div className="grey-swatch-container">
                <div className={"grey-swatch " + (this.color.getHSL().l > this.props.minLightnessBordered ? "border-thick border-dark" : "")} style={ {background: this.props.color} }>
                    <p className={"color-code font-mono " + (this.props.showColorCodes === colorCodeVisibility.HOVER ? "visibility-hidden " : "") + (this.color.getHSL().l > this.props.minLightnessDarkLabel ? "text-dark" : "text-light")}>{Math.round(this.color.getHSL().l) + '%'}</p>
                </div>
            </div>
        );
    }
}