// src/services/imageProcessing.js
// Modified to handle different layouts based on filename

export const processImageToLayout = async (imageFile) => {
    try {
      // Extract filename from the image file
      const filename = imageFile.name.toLowerCase();
      console.log('Processing image:', filename);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Select layout based on filename
      let layoutName = 'map1';
      if (filename.includes('map1')) {
        layoutName = 'map1';
      } else if (filename.includes('map2')) {
        layoutName = 'map2';
      } else if (filename.includes('map3')) {
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
        width: 1200,
        height: 800,
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
        width: 1200,
        height: 800,
        svgPath: '/maps/map2.svg',
        spots: [
          { id: 'C1', x: 200, y: 100, width: 30, height: 60 },
          { id: 'C2', x: 240, y: 100, width: 30, height: 60 },
          { id: 'C3', x: 280, y: 100, width: 30, height: 60 },
          { id: 'D1', x: 200, y: 170, width: 30, height: 60 },
          { id: 'D2', x: 240, y: 170, width: 30, height: 60 },
          { id: 'D3', x: 280, y: 170, width: 30, height: 60 },
          // More spots
        ]
      },
      'map3': {
        width: 1200,
        height: 800,
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