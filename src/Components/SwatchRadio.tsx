import * as React from 'react';

import './SwatchRadio.css';

interface SwatchRadioProps {
    prompt: string;
    groupName: string;
    options: Array<{
        name: string;
        id: string;
        selected: boolean;
    }>;
    className?: string;
    selectionChanged: (id: string) => void;
}

interface SwatchRadioState { }

export default class SwatchRadio extends React.Component<SwatchRadioProps, SwatchRadioState> {
    public constructor(props: SwatchRadioProps) {
        super(props);
    }

    public render() {
        return (
            <div className={(this.props.className || "") + " swatch-radio swatch-radio-mr"}>
                <div className="swatch-radio-mr">
                    {this.props.prompt}:
                </div>
                {this.props.options.map(o => (
                    <label className="swatch-radio-item swatch-radio-mr" key={o.id}>
                        <input className="swatch-radio-input" type="radio" name={this.props.groupName} id={o.id} checked={o.selected} onChange={this.selectionChanged} />
                        <span className="swatch-radio-label" >{o.name}</span>
                        <span className="swatch-radio-indicator">&#9632;</span>
                    </label>
                ))}
            </div>
        );
    }

    private selectionChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.selectionChanged(e.target.id);
    }
}