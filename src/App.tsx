import * as React from 'react';
import * as tabletop from 'tabletop';
import './App.css';

import { default as BrandCard } from './Components/BrandCard';
import SettingsBar from './Components/SettingsBar';
import { AppSettings, colorCodeVisibility, greyVisibility } from './Models/AppSettings';
import { Brand } from './Models/Brand';

interface AppProps { }

interface AppState {
    brands: Brand[];
    settings: AppSettings;
}

class App extends React.Component<AppProps, AppState> {
    public constructor(props: AppProps) {
        super(props);

        this.state = {brands: [], settings: { greyVisibility: greyVisibility.NONE, colorCodeVisibility: colorCodeVisibility.ALWAYS}};

        tabletop.init({
            key: "https://docs.google.com/spreadsheets/d/1tzmTwVbh8Rnvfo9Hy9e9IlvJRZTZfoDK1nC_J-Z-UOo/edit?usp=sharing", 
            simpleSheet: true,
            callback: this.tabletopDataAvailable,
            postProcess: (e) => {
                e.colors = (e.colors as string).split(',');
            }
        });
    }

    private tabletopDataAvailable = (d: Brand[], t: {}) => {
        this.setState({brands: d});
    }

    private settingsChanged = (newSettings: AppSettings) => {
        this.setState({settings: newSettings});
    }

    public render() {
        return (
            <div className="app">
                <div>
                    <h1 className="app-header font-heading">Brand Swatch</h1>
                    <SettingsBar settings={this.state.settings} settingsChanged={this.settingsChanged} />
                </div>
                <div className="grid-container">
                    {this.state.brands.map((b) => <BrandCard showGreys={this.state.settings.greyVisibility} showColorCodes={this.state.settings.colorCodeVisibility} brand={b} key={b.id}/>)}
                </div>
            </div>
        );
    }
}

export default App;
