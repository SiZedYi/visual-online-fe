// src/services/imageProcessing.js
// Modified to handle different layouts based on filename

export const processImageToLayout = async (layoutName) => {
    try {
      // Extract filename from the image file
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Select layout based on filename
      let layoutName = 'map1';
      if (layoutName.includes('map1')) {
        layoutName = 'map1';
      } else if (layoutName.includes('map2')) {
        layoutName = 'map2';
      } else if (layoutName.includes('map3')) {
        layoutName = 'map3';
      }
      
      // Return the appropriate layout
      return getLayoutByName(layoutName);
    } catch (error) {
      console.error('Image Processing Error:', error);
      throw error;
    }
  };
  
  // Function to get predefined layouts
  const getLayoutByName = (name) => {
    const layouts = {
      'map1': {
        width: 1100,
        height: 700,
        svgPath: '/maps/map1.svg', // Path to the SVG file
        // Parking spot data structure
        spots: [
            // Left Section - Row 1
            { id: 'A1', x: 30, y: 10, width: 40, height: 70 },
            { id: 'A2', x: 80, y: 10, width: 30, height: 70 },
            { id: 'A3', x: 110, y: 10, width: 30, height: 70 },
            { id: 'A4', x: 140, y: 10, width: 30, height: 70 },
            { id: 'A5', x: 170, y: 10, width: 30, height: 70 },
            { id: 'A6', x: 200, y: 10, width: 30, height: 70 },
            { id: 'A7', x: 230, y: 10, width: 30, height: 70 },
            { id: 'A8', x: 260, y: 10, width: 30, height: 70 },
            { id: 'A9', x: 290, y: 10, width: 30, height: 70 },
            { id: 'A10', x: 320, y: 10, width: 30, height: 70 },
            { id: 'A11', x: 350, y: 10, width: 30, height: 70 },
            { id: 'A12', x: 380, y: 10, width: 30, height: 70 },
            { id: 'A13', x: 410, y: 10, width: 30, height: 70 },
            
            // Left Section - Row 2
            { id: 'B1', x: 30, y: 210, width: 40, height: 70 },
            { id: 'B2', x: 80, y: 210, width: 30, height: 70 },
            { id: 'B3', x: 110, y: 210, width: 30, height: 70 },
            { id: 'B4', x: 140, y: 210, width: 30, height: 70 },
            { id: 'B5', x: 170, y: 210, width: 30, height: 70 },
            { id: 'B6', x: 200, y: 210, width: 30, height: 70 },
            { id: 'B7', x: 230, y: 210, width: 30, height: 70 },
            { id: 'B8', x: 260, y: 210, width: 30, height: 70 },
            { id: 'B9', x: 290, y: 210, width: 30, height: 70 },
            { id: 'B10', x: 320, y: 210, width: 30, height: 70 },
            { id: 'B11', x: 350, y: 210, width: 30, height: 70 },
            { id: 'B12', x: 380, y: 210, width: 30, height: 70 },
            { id: 'B13', x: 410, y: 210, width: 30, height: 70 },
            
            // Left Section - Row 3
            { id: 'C1', x: 30, y: 410, width: 40, height: 70 },
            { id: 'C2', x: 80, y: 410, width: 30, height: 70 },
            { id: 'C3', x: 110, y: 410, width: 30, height: 70 },
            { id: 'C4', x: 140, y: 410, width: 30, height: 70 },
            { id: 'C5', x: 170, y: 410, width: 30, height: 70 },
            { id: 'C6', x: 200, y: 410, width: 30, height: 70 },
            { id: 'C7', x: 230, y: 410, width: 30, height: 70 },
            { id: 'C8', x: 260, y: 410, width: 30, height: 70 },
            { id: 'C9', x: 290, y: 410, width: 30, height: 70 },
            { id: 'C10', x: 320, y: 410, width: 30, height: 70 },
            { id: 'C11', x: 350, y: 410, width: 30, height: 70 },
            { id: 'C12', x: 380, y: 410, width: 30, height: 70 },
            { id: 'C13', x: 410, y: 410, width: 30, height: 70 },
            
            // Left Section - Row 4
            { id: 'D1', x: 30, y: 610, width: 40, height: 70 },
            { id: 'D2', x: 80, y: 610, width: 30, height: 70 },
            { id: 'D3', x: 110, y: 610, width: 30, height: 70 },
            { id: 'D4', x: 140, y: 610, width: 30, height: 70 },
            { id: 'D5', x: 170, y: 610, width: 30, height: 70 },
            { id: 'D6', x: 200, y: 610, width: 30, height: 70 },
            { id: 'D7', x: 230, y: 610, width: 30, height: 70 },
            { id: 'D8', x: 260, y: 610, width: 30, height: 70 },
            { id: 'D9', x: 290, y: 610, width: 30, height: 70 },
            { id: 'D10', x: 320, y: 610, width: 30, height: 70 },
            { id: 'D11', x: 350, y: 610, width: 30, height: 70 },
            { id: 'D12', x: 380, y: 610, width: 30, height: 70 },
            { id: 'D13', x: 410, y: 610, width: 30, height: 70 },
            
            // Right Section - Row 1
            { id: 'E1', x: 620, y: 10, width: 30, height: 70 },
            { id: 'E2', x: 650, y: 10, width: 30, height: 70 },
            { id: 'E3', x: 680, y: 10, width: 30, height: 70 },
            { id: 'E4', x: 710, y: 10, width: 30, height: 70 },
            { id: 'E5', x: 740, y: 10, width: 30, height: 70 },
            { id: 'E6', x: 770, y: 10, width: 30, height: 70 },
            { id: 'E7', x: 800, y: 10, width: 30, height: 70 },
            { id: 'E8', x: 830, y: 10, width: 30, height: 70 },
            { id: 'E9', x: 860, y: 10, width: 30, height: 70 },
            { id: 'E10', x: 890, y: 10, width: 30, height: 70 },
            
            // Right Section - Row 2
            { id: 'F1', x: 620, y: 210, width: 30, height: 70 },
            { id: 'F2', x: 650, y: 210, width: 30, height: 70 },
            { id: 'F3', x: 680, y: 210, width: 30, height: 70 },
            { id: 'F4', x: 710, y: 210, width: 30, height: 70 },
            { id: 'F5', x: 740, y: 210, width: 30, height: 70 },
            { id: 'F6', x: 770, y: 210, width: 30, height: 70 },
            { id: 'F7', x: 800, y: 210, width: 30, height: 70 },
            { id: 'F8', x: 830, y: 210, width: 30, height: 70 },
            { id: 'F9', x: 860, y: 210, width: 30, height: 70 },
            { id: 'F10', x: 890, y: 210, width: 30, height: 70 },
            
            // Right Section - Row 3
            { id: 'G1', x: 620, y: 410, width: 30, height: 70 },
            { id: 'G2', x: 650, y: 410, width: 30, height: 70 },
            { id: 'G3', x: 680, y: 410, width: 30, height: 70 },
            { id: 'G4', x: 710, y: 410, width: 30, height: 70 },
            { id: 'G5', x: 740, y: 410, width: 30, height: 70 },
            { id: 'G6', x: 770, y: 410, width: 30, height: 70 },
            { id: 'G7', x: 800, y: 410, width: 30, height: 70 },
            { id: 'G8', x: 830, y: 410, width: 30, height: 70 },
            { id: 'G9', x: 860, y: 410, width: 30, height: 70 },
            { id: 'G10', x: 890, y: 410, width: 30, height: 70 },
            
            // Right Section - Row 4
            { id: 'H1', x: 620, y: 610, width: 30, height: 70 },
            { id: 'H2', x: 650, y: 610, width: 30, height: 70 },
            { id: 'H3', x: 680, y: 610, width: 30, height: 70 },
            { id: 'H4', x: 710, y: 610, width: 30, height: 70 },
            { id: 'H5', x: 740, y: 610, width: 30, height: 70 },
            { id: 'H6', x: 770, y: 610, width: 30, height: 70 },
            { id: 'H7', x: 800, y: 610, width: 30, height: 70 },
            { id: 'H8', x: 830, y: 610, width: 30, height: 70 },
            { id: 'H9', x: 860, y: 610, width: 30, height: 70 },
            { id: 'H10', x: 890, y: 610, width: 30, height: 70 },
            
            // Handicap Spots
            { id: 'HC1', x: 980, y: 10, width: 15, height: 70 },
            { id: 'HC2', x: 980, y: 210, width: 15, height: 70 },
            { id: 'HC3', x: 980, y: 410, width: 15, height: 70 },
            { id: 'HC4', x: 980, y: 610, width: 15, height: 70 }
        ]
      },
      'map2': {
  width: 1100,
  height: 700,
  svgPath: '/maps/map2.svg',
  // Parking spot data structure
  spots: [
    // Top row (left to right)
    { id: 'A1', x: 130, y: 10, width: 20, height: 70 },
    { id: 'A2', x: 150, y: 10, width: 30, height: 70 },
    { id: 'A3', x: 180, y: 10, width: 30, height: 70 },
    { id: 'A4', x: 210, y: 10, width: 30, height: 70 },
    { id: 'A5', x: 240, y: 10, width: 30, height: 70 },
    { id: 'A6', x: 270, y: 10, width: 30, height: 70 },
    { id: 'A7', x: 300, y: 10, width: 30, height: 70 },
    { id: 'A8', x: 330, y: 10, width: 30, height: 70 },
    { id: 'A9', x: 360, y: 10, width: 30, height: 70 },
    { id: 'A10', x: 390, y: 10, width: 30, height: 70 },
    { id: 'A11', x: 420, y: 10, width: 30, height: 70 },
    { id: 'A12', x: 450, y: 10, width: 30, height: 70 },
    { id: 'A13', x: 480, y: 10, width: 30, height: 70 },
    { id: 'A14', x: 510, y: 10, width: 30, height: 70 },
    { id: 'A15', x: 540, y: 10, width: 30, height: 70 },
    { id: 'A16', x: 570, y: 10, width: 30, height: 70 },
    { id: 'A17', x: 600, y: 10, width: 30, height: 70 },
    { id: 'A18', x: 630, y: 10, width: 30, height: 70 },
    { id: 'A19', x: 660, y: 10, width: 30, height: 70 },
    { id: 'A20', x: 690, y: 10, width: 30, height: 70 },
    { id: 'A21', x: 720, y: 10, width: 30, height: 70 },
    { id: 'A22', x: 750, y: 10, width: 30, height: 70 },
    { id: 'A23', x: 780, y: 10, width: 30, height: 70 },
    { id: 'A24', x: 810, y: 10, width: 30, height: 70 },
    { id: 'A25', x: 840, y: 10, width: 30, height: 70 },
    { id: 'A26', x: 870, y: 10, width: 30, height: 70 },
    { id: 'A27', x: 900, y: 10, width: 30, height: 70 },
    { id: 'A28', x: 930, y: 10, width: 40, height: 70 },
    
    // Middle top row (left to right)
    { id: 'B1', x: 270, y: 235, width: 30, height: 115 },
    { id: 'B2', x: 300, y: 235, width: 30, height: 115 },
    { id: 'B3', x: 330, y: 235, width: 30, height: 115 },
    { id: 'B4', x: 360, y: 235, width: 30, height: 115 },
    { id: 'B5', x: 390, y: 235, width: 30, height: 115 },
    { id: 'B6', x: 420, y: 235, width: 30, height: 115 },
    { id: 'B7', x: 450, y: 235, width: 30, height: 115 },
    { id: 'B8', x: 480, y: 235, width: 30, height: 115 },
    { id: 'B9', x: 510, y: 235, width: 30, height: 115 },
    { id: 'B10', x: 540, y: 235, width: 30, height: 115 },
    { id: 'B11', x: 570, y: 235, width: 30, height: 115 },
    { id: 'B12', x: 600, y: 235, width: 30, height: 115 },
    { id: 'B13', x: 630, y: 235, width: 30, height: 115 },
    { id: 'B14', x: 660, y: 235, width: 30, height: 115 },
    { id: 'B15', x: 690, y: 235, width: 30, height: 115 },
    { id: 'B16', x: 720, y: 235, width: 30, height: 115 },
    { id: 'B17', x: 750, y: 235, width: 30, height: 115 },
    { id: 'B18', x: 780, y: 235, width: 30, height: 115 },
    { id: 'B19', x: 810, y: 235, width: 30, height: 115 },
    
    // Middle bottom row (left to right)
    { id: 'C1', x: 270, y: 350, width: 30, height: 115 },
    { id: 'C2', x: 300, y: 350, width: 30, height: 115 },
    { id: 'C3', x: 330, y: 350, width: 30, height: 115 },
    { id: 'C4', x: 360, y: 350, width: 30, height: 115 },
    { id: 'C5', x: 390, y: 350, width: 30, height: 115 },
    { id: 'C6', x: 420, y: 350, width: 30, height: 115 },
    { id: 'C7', x: 450, y: 350, width: 30, height: 115 },
    { id: 'C8', x: 480, y: 350, width: 30, height: 115 },
    { id: 'C9', x: 510, y: 350, width: 30, height: 115 },
    { id: 'C10', x: 540, y: 350, width: 30, height: 115 },
    { id: 'C11', x: 570, y: 350, width: 30, height: 115 },
    { id: 'C12', x: 600, y: 350, width: 30, height: 115 },
    { id: 'C13', x: 630, y: 350, width: 30, height: 115 },
    { id: 'C14', x: 660, y: 350, width: 30, height: 115 },
    { id: 'C15', x: 690, y: 350, width: 30, height: 115 },
    { id: 'C16', x: 720, y: 350, width: 30, height: 115 },
    { id: 'C17', x: 750, y: 350, width: 30, height: 115 },
    { id: 'C18', x: 780, y: 350, width: 30, height: 115 },
    { id: 'C19', x: 810, y: 350, width: 30, height: 115 },
    
    // Bottom row (left to right)
    { id: 'D1', x: 130, y: 620, width: 20, height: 70 },
    { id: 'D2', x: 150, y: 620, width: 30, height: 70 },
    { id: 'D3', x: 180, y: 620, width: 30, height: 70 },
    { id: 'D4', x: 210, y: 620, width: 30, height: 70 },
    { id: 'D5', x: 240, y: 620, width: 30, height: 70 },
    { id: 'D6', x: 270, y: 620, width: 30, height: 70 },
    { id: 'D7', x: 300, y: 620, width: 30, height: 70 },
    { id: 'D8', x: 330, y: 620, width: 30, height: 70 },
    { id: 'D9', x: 360, y: 620, width: 30, height: 70 },
    { id: 'D10', x: 390, y: 620, width: 30, height: 70 },
    { id: 'D11', x: 420, y: 620, width: 30, height: 70 },
    { id: 'D12', x: 450, y: 620, width: 30, height: 70 },
    { id: 'D13', x: 480, y: 620, width: 30, height: 70 },
    { id: 'D14', x: 510, y: 620, width: 30, height: 70 },
    { id: 'D15', x: 540, y: 620, width: 30, height: 70 },
    { id: 'D16', x: 570, y: 620, width: 30, height: 70 },
    { id: 'D17', x: 600, y: 620, width: 30, height: 70 },
    { id: 'D18', x: 630, y: 620, width: 30, height: 70 },
    { id: 'D19', x: 660, y: 620, width: 30, height: 70 },
    { id: 'D20', x: 690, y: 620, width: 30, height: 70 },
    { id: 'D21', x: 720, y: 620, width: 30, height: 70 },
    { id: 'D22', x: 750, y: 620, width: 30, height: 70 },
    { id: 'D23', x: 780, y: 620, width: 30, height: 70 },
    { id: 'D24', x: 810, y: 620, width: 30, height: 70 },
    { id: 'D25', x: 840, y: 620, width: 30, height: 70 },
    { id: 'D26', x: 870, y: 620, width: 30, height: 70 },
    { id: 'D27', x: 900, y: 620, width: 30, height: 70 },
    { id: 'D28', x: 930, y: 620, width: 40, height: 70 },
    
    // Left side row (top to bottom)
    { id: 'E1', x: 10, y: 150, width: 70, height: 20 },
    { id: 'E2', x: 10, y: 170, width: 70, height: 30 },
    { id: 'E3', x: 10, y: 200, width: 70, height: 30 },
    { id: 'E4', x: 10, y: 230, width: 70, height: 30 },
    { id: 'E5', x: 10, y: 260, width: 70, height: 30 },
    { id: 'E6', x: 10, y: 290, width: 70, height: 30 },
    { id: 'E7', x: 10, y: 320, width: 70, height: 30 },
    { id: 'E8', x: 10, y: 350, width: 70, height: 30 },
    { id: 'E9', x: 10, y: 380, width: 70, height: 30 },
    { id: 'E10', x: 10, y: 410, width: 70, height: 30 },
    { id: 'E11', x: 10, y: 440, width: 70, height: 30 },
    { id: 'E12', x: 10, y: 470, width: 70, height: 30 },
    { id: 'E13', x: 10, y: 500, width: 70, height: 30 },
    { id: 'E14', x: 10, y: 530, width: 70, height: 20 },
    
    // Right side row (top to bottom)
    { id: 'F1', x: 1020, y: 150, width: 70, height: 20 },
    { id: 'F2', x: 1020, y: 170, width: 70, height: 30 },
    { id: 'F3', x: 1020, y: 200, width: 70, height: 30 },
    { id: 'F4', x: 1020, y: 230, width: 70, height: 30 },
    { id: 'F5', x: 1020, y: 260, width: 70, height: 30 },
    { id: 'F6', x: 1020, y: 290, width: 70, height: 30 },
    { id: 'F7', x: 1020, y: 320, width: 70, height: 30 },
    { id: 'F8', x: 1020, y: 350, width: 70, height: 30 },
    { id: 'F9', x: 1020, y: 380, width: 70, height: 30 },
    { id: 'F10', x: 1020, y: 410, width: 70, height: 30 },
    { id: 'F11', x: 1020, y: 440, width: 70, height: 30 },
    { id: 'F12', x: 1020, y: 470, width: 70, height: 30 },
    { id: 'F13', x: 1020, y: 500, width: 70, height: 30 },
    { id: 'F14', x: 1020, y: 530, width: 70, height: 20 }
  ],
},
      'map3': {
        width: 1100,
        height: 700,
        svgPath: '/maps/map3.svg',
        spots: [
          { id: 'E1', x: 300, y: 200, width: 30, height: 60 },
          { id: 'E2', x: 340, y: 200, width: 30, height: 60 },
          { id: 'E3', x: 380, y: 200, width: 30, height: 60 },
          { id: 'F1', x: 300, y: 270, width: 30, height: 60 },
          { id: 'F2', x: 340, y: 270, width: 30, height: 60 },
          { id: 'F3', x: 380, y: 270, width: 30, height: 60 },
          // More spots
        ]
      },
      
    };
    
    return layouts[name] || layouts['default'];
  };