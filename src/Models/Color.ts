type colorEncoding = 'rgb' | 'hsv' | 'hsl';
type colorFormat = 'hex' | 'css';

export class Color {

    private r: number;
    private g: number;
    private b: number;
    private a: number;

    public constructor (colorString: string) {
        if (Color.isHex.test(colorString)) {
            let stripped = colorString.replace(Color.leadHex, '');
            if(stripped.length === 3) {
                stripped = stripped.replace(Color.hexBit, '$1$1');
            };

            let r = parseInt(stripped.slice(0, 2), 16);
            let g = parseInt(stripped.slice(2, 4), 16);
            let b = parseInt(stripped.slice(4, 6), 16);

            this.setFromValues(r, g, b, 1, 'rgb');
        }
        else if (Color.isRGB.test(colorString)) {
            let parts = colorString.match(Color.matchRGB) as string[];
            let r = Color.parseColorValue(parts[1]);
            let g = Color.parseColorValue(parts[2]);
            let b = Color.parseColorValue(parts[3]);
            let a = parseFloat(parts[5]);
            if (isNaN(a)) {a = 1;}

            this.setFromValues(r, g, b, a, 'rgb');
        }
        else if (Color.isHSL.test(colorString)) {
            let parts = colorString.match(Color.matchHSL) as string[];
            let h = Color.parseColorValue(parts[1]);
            let s = Color.parseColorValue(parts[2]);
            let l = Color.parseColorValue(parts[3]);
            let a = parseFloat(parts[5]);
            if (isNaN(a)) {a = 1;}

            this.setFromValues(h, s, l, a, 'rgb');
        }
        else if (Color.isHSV.test(colorString)) {
            let parts = colorString.match(Color.matchHSV) as string[];
            let h = Color.parseColorValue(parts[1]);
            let s = Color.parseColorValue(parts[2]);
            let v = Color.parseColorValue(parts[3]);
            let a = parseFloat(parts[5]);
            if (isNaN(a)) {a = 1;}

            this.setFromValues(h, s, v, a, 'rgb');
        }
        else {
            throw new Error();
        }
    }

    public getRGB() {
        return {r: this.r, g: this.g, b: this.b};
    }

    public getHSV() {
        return Color.rgbToHsv(this.r, this.g, this.b);
    }

    public getHSL() {
        return Color.rgbToHsl(this.r, this.g, this.b);
    }

    public getA() {
        return this.a;
    }
    
    public toString = (encoding: colorEncoding = 'rgb', format: colorFormat = 'hex') => {
        if (encoding !== 'rgb' || format !== 'hex') {
            this.a.toString();
            Color.rgbToHsl.toString();
            Color.rgbToHsv.toString();
            throw new Error();
        }

        return '#' + Color.componentToHex(this.r) + Color.componentToHex(this.g) + Color.componentToHex(this.b);
    }

    public isGrey() {
        return this.r === this.g && this.g === this.b;
    }

    private setFromValues(v1: number, v2: number, v3: number, a: number, encoding: colorEncoding) {
        this.a = a;
        switch (encoding) {
            case 'rgb': {
                this.r = v1;
                this.g = v2;
                this.b = v3;
                break;
            }
            case 'hsl': {
                const rgb = Color.hslToRgb(v1, v2, v3);
                this.r = rgb.r;
                this.g = rgb.g;
                this.b = rgb.b;
                break;
            }
            case 'hsv': {
                const rgb = Color.hsvToRgb(v1, v2, v3);
                this.r = rgb.r;
                this.g = rgb.g;
                this.b = rgb.b;
                break;
            }
            default: {
                throw new Error();
            }
        }
    }

    private static isHex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
    private static isHSL = /^hsla?\((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?\)$/;
    private static isHSV = /^hsva?\((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?\)$/;
    private static isRGB = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?\)$/;

    private static isPercent = /^\d+(\.\d+)*%$/;
    private static hexBit = /([0-9a-f])/gi;
    private static leadHex = /^#/;

    private static matchHSL = /^hsla?\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%(,\s*([01]?\.?\d*))?\)$/;
    private static matchHSV = /^hsva?\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%(,\s*([01]?\.?\d*))?\)$/;
    private static matchRGB = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*([01]?\.?\d*))?\)$/;

    private static componentToHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    private static parseColorValue(p: string){
        return Color.isPercent.test(p) ? Math.round(parseInt(p, 10) * 2.55) : parseInt(p, 10);
    };

    private static rgbToHsl(r: number, g: number, b: number) {
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b);
        let h;
        let s;
        let l = (max + min) / 2;
    
        if(max === min){
            h = s = 0; // achromatic
        }else{
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            if (max === r) { h = (g - b) / d + (g < b ? 6 : 0); }
            else if (max === g ) { h = (b - r) / d + 2; }
            else /* max === b */ { h = (r - g) / d + 4; }
            h /= 6;
        }
    
        h = Math.round(h*360);
        s = Math.round(s*100);
        l = Math.round(l*100);

        return {h, s, l};
    }
    
    private static hue2rgb(p: number, q: number, t: number){
        if(t < 0) {t += 1;}
        if(t > 1) {t -= 1;}
        if(t < 1/6) {return p + (q - p) * 6 * t;}
        if(t < 1/2) {return q;}
        if(t < 2/3) {return p + (q - p) * (2/3 - t) * 6;}
        return p;
    }

    private static hslToRgb(h: number, s: number, l: number){
        h /= 360, s /= 100, l /= 100;
        let r;
        let g;
        let b;
    
        if(s === 0){
            r = g = b = l; // achromatic
        }else{
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 1/3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1/3);
        }

        r = Math.round(r*255);
        g = Math.round(g*255);
        b = Math.round(b*255);
    
        return {r, g, b};
    }

    private static rgbToHsv(r: number, g: number, b: number){
        r = r/255, g = g/255, b = b/255;
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b);
        let h;
        let s;
        let v = max;
    
        let d = max - min;
        s = max === 0 ? 0 : d / max;
    
        if(max === min){
            h = 0; // achromatic
        }else{
            if (r === max) { h = (g - b) / d + (g < b ? 6 : 0); }
            else if (g === max) { h = (b - r) / d + 2; }
            else /* b === max */ { h = (r - g) / d + 4; }
            h /= 6;
        }
    
        h = Math.round(h*360);
        s = Math.round(s*100);
        v = Math.round(v*100);

        return {h, s, v};
    }

    private static hsvToRgb(h: number, s: number, v: number){
        h /= 360, s /= 100, v /= 100;
        let r;
        let g;
        let b;
    
        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);
    
        switch(i % 6){
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            default: r = v, g = p, b = q; break;
        }
    
        r = Math.round(r*255);
        g = Math.round(g*255);
        b = Math.round(b*255);
    
        return {r, g, b};
    }
}