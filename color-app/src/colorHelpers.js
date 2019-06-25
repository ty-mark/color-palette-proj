import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  }
  /* initialize the colors with the number of levels of brightness */
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of starterPalette.colors) { /* for ... of ... = for each */
    let scale = generateScale(color.color, 10).reverse(); /* match the bright -> dark pattern */
    for (let i in scale) { /* for ... in ... = for (int i = 0; i < ...) */
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')
      });
    }
  }
  return newPalette;
}

/* generate a 3-color scale: darken(color)->color->white */
function getRange(hexColor) {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
}

/* generate a multi-level color scales from the original color */
function generateScale(hexColor, numberOfColors) {
  return chroma
    .scale(getRange(hexColor))
    .mode('lab')
    .colors(numberOfColors);
}

export { generatePalette };