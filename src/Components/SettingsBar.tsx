import * as React from 'react';
import { AppSettings, colorCodeVisibility, greyVisibility } from '../Models/AppSettings';
import SwatchRadio from './SwatchRadio';

interface SettingsBarProps {
    settings: AppSettings;
    settingsChanged: (settings: AppSettings) => void;
}

interface SettingsBarState { }

export default class SettingsBar extends React.Component<SettingsBarProps, SettingsBarState> {
    public constructor(props: SettingsBarProps) {
        super(props);
    }

    public render() {
        return (
            <div className="settings-bar">
                <SwatchRadio 
                    className="settings-bar-radio font-body"
                    prompt="Show grays"
                    groupName="greyVisibility"
                    options={
                        Object.keys(greyVisibility).map(vs => {
                            let v = greyVisibility[vs];
                            return {
                                name: this.getGreyOptionSymbol(v),
                                selected: v === this.props.settings.greyVisibility,
                                id: vs
                            };
                        })
                    }
                    selectionChanged={this.greyVisibilityChanged}
                />
                <SwatchRadio 
                    className="settings-bar-radio font-body"
                    prompt="Show values"
                    groupName="colorCodeVisibility"
                    options={
                        Object.keys(colorCodeVisibility).map(vs => {
                            let v = colorCodeVisibility[vs];
                            return {
                                name: this.getColorCodeOptionSymbol(v),
                                selected: v === this.props.settings.colorCodeVisibility,
                                id: vs
                            };
                        })
                    }
                    selectionChanged={this.colorCodeVisibilityChanged}
                />
            </div>
        );
    }

    private greyVisibilityChanged = (newSelection: string) => {
        this.props.settingsChanged({...this.props.settings, greyVisibility: greyVisibility[newSelection]});
    }

    private getGreyOptionSymbol(option: greyVisibility) {
        switch (option) {
            case greyVisibility.BELOW: {
                return '⬇\uFE0E';
            }
            case greyVisibility.INTEGRATED: {
                return '▣\uFE0E';
            }
            case greyVisibility.NONE: {
                return '✕\uFE0E';
            }
            default: {
                throw Error('Unknown greyVisibility type');
            }
        }
    }

    private colorCodeVisibilityChanged = (newSelection: string) => {
        this.props.settingsChanged({...this.props.settings, colorCodeVisibility: colorCodeVisibility[newSelection]});
    }

    private getColorCodeOptionSymbol(option: colorCodeVisibility) {
        switch (option) {
            case colorCodeVisibility.ALWAYS: {
                return '👁\uFE0E';
            }
            case colorCodeVisibility.HOVER: {
                return '⬚\uFE0E';
            }
            default: {
                throw Error('Unknown colorCodeVisibility type');
            }
        }
    }
}