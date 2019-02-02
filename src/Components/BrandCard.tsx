import * as React from 'react';

import { greyVisibility } from '../Models/AppSettings';
import { colorCodeVisibility } from '../Models/AppSettings';
import { Brand } from '../Models/Brand';
import { Color } from '../Models/Color';
import ColorCard from './ColorCard';
import GreyCard from './GreyCard';

interface BrandCardProps { 
    brand: Brand;
    showGreys: greyVisibility;
    showColorCodes: colorCodeVisibility;
}

interface BrandCardState { }

export default class BrandCard extends React.Component<BrandCardProps, BrandCardState> {
    public constructor(props: BrandCardProps) {
        super(props);

        
    }

    public render() {
        let mainColors: string[] = [];
        let greyColors: string[] = [];

        switch (this.props.showGreys) {
            case greyVisibility.INTEGRATED: {
                mainColors = this.props.brand.colors;
                break;
            }
            case greyVisibility.BELOW: {
                this.props.brand.colors.forEach(c => {
                    const color = new Color(c);
                    if (color.isGrey()) {
                        greyColors.push(c);
                    } else {
                        mainColors.push(c);
                    }
                })

                if (mainColors.length === 0) {
                    mainColors = greyColors;
                    greyColors = [];
                }
                break;
            }
            case greyVisibility.NONE: {
                this.props.brand.colors.forEach(c => {
                    const color = new Color(c);
                    if (!color.isGrey()) {
                        mainColors.push(c);
                    }
                });
                break;
            }
        }

        return (
            <div className="brand-card">
                <ColorCard colors={mainColors} showColorCodes={this.props.showColorCodes}/>
                {greyColors.length > 0 ? <GreyCard className="brand-card-space-above" colors={greyColors} showColorCodes={this.props.showColorCodes}/> : null}
                <div className="brand-card-bottom brand-card-space-above">
                    <h4 className="brand-card-name font-heading">{this.props.brand.name}</h4>
                    <p className="brand-card-description font-body">{this.props.brand.description}</p>
                </div>
            </div>
        );
    }
}