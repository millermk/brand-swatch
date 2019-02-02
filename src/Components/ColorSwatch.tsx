import * as React from 'react';

import { colorCodeVisibility } from 'src/Models/AppSettings';
import { hexColor } from '../Models/Brand';
import { Color } from '../Models/Color';

interface ColorSwatchProps { 
    color: hexColor;
    minLightnessBordered: number;
    minLightnessDarkLabel: number;
    showColorCodes: colorCodeVisibility;
}

interface ColorSwatchState { }

export default class ColorSwatch extends React.Component<ColorSwatchProps, ColorSwatchState> {
    public constructor(props: ColorSwatchProps) {
        super(props);
    }

    private color = new Color(this.props.color);

    public render() {
        return (
            <div className={"color-swatch" + (this.color.getHSL().l > this.props.minLightnessBordered ? " border-thick border-dark" : "")} style={ {background: this.props.color} }>
                <p className={"color-code font-mono " + (this.props.showColorCodes === colorCodeVisibility.HOVER ? "visibility-hidden " : "") + (this.color.getHSL().l > this.props.minLightnessDarkLabel ? "text-dark" : "text-light")}>{this.props.color}</p>
            </div>
        );
    }
}