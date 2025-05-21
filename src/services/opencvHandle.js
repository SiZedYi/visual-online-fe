import cv from 'opencv4nodejs';

export const convertMap = (mapName, imagePath, values = {}) => {
  const src = cv.imread(imagePath);
  const gray = src.bgrToGray();
  const blurred = gray.gaussianBlur(new cv.Size(5, 5), 0);
  const edges = blurred.canny(50, 150);

  const contours = edges.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  const svgParts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${src.cols}" height="${src.rows}">`,
    `<g id="${mapName}">`
  ];

  let spotId = 1;
  contours.forEach(contour => {
    const area = contour.area;
    if (area < 400 || area > 5000) return;

    const approx = contour.approxPolyDP(0.02 * contour.arcLength(true), true);
    if (approx.length === 4) {
      const points = approx.map(pt => `${pt.x},${pt.y}`).join(" ");
      svgParts.push(`<polygon id="spot-${spotId++}" points="${points}" fill="none" stroke="red" stroke-width="2"/>`);
    }
  });

  svgParts.push('</g></svg>');

  return svgParts.join('\n');
};
