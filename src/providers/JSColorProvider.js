/** Provides ColorPicker for p5.js color functions - background(), stroke(), fill() and color(). */
export default class JSColorProvider {
    regex = /(?<=(?:background|fill|stroke|color)\s*\()\s*(?:(?:[0-9]*[.]?[0-9]+)+[,\s]*)+(?=\))/gm;
    provideColorPresentations(model, colorInfo) {
        const color = colorInfo.color;
        const colR = Math.round(color.red * 255);
        const colG = Math.round(color.green * 255);
        const colB = Math.round(color.blue * 255);
        const colA = Math.round(color.alpha * 255);
        if (colB === colG && colG === colR) {
            if (colA === 255) {
                return [{ label: `${colR}` }];
            }
            else {
                return [{ label: `${colR}, ${colA}` }];
            }
        }
        else {
            if (colA === 255) {
                return [{ label: `${colR}, ${colG}, ${colB}` }];
            }
            else {
                return [{ label: `${colR}, ${colG}, ${colB}, ${colA}` }];
            }
        }
    }
    provideDocumentColors(model, token) {
        const matches = model.findMatches(this.regex, false, true, true, null, true);
        return matches
            .map((match) => {
            if (!match.matches)
                return null;
            const colors = match.matches[0]
                .split(",")
                .map((x) => x.trim())
                .filter((x) => x)
                .map((x) => +x);
            switch (colors.length) {
                case 1:
                    return {
                        color: {
                            red: colors[0] / 255,
                            green: colors[0] / 255,
                            blue: colors[0] / 255,
                            alpha: 1,
                        },
                        range: match.range,
                    };
                case 2:
                    return {
                        color: {
                            red: colors[0] / 255,
                            green: colors[0] / 255,
                            blue: colors[0] / 255,
                            alpha: colors[1] / 255,
                        },
                        range: match.range,
                    };
                case 3:
                    return {
                        color: {
                            red: colors[0] / 255,
                            green: colors[1] / 255,
                            blue: colors[2] / 255,
                            alpha: 1,
                        },
                        range: match.range,
                    };
                case 4:
                    return {
                        color: {
                            red: colors[0] / 255,
                            green: colors[1] / 255,
                            blue: colors[2] / 255,
                            alpha: colors[3] / 255,
                        },
                        range: match.range,
                    };
                default: {
                    return null;
                }
            }
        })
            .filter((x) => x);
    }
}
