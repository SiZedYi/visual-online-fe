import React, { useState, useEffect, useRef } from 'react';
import {ReactComponent as Logo } from '../../maps/map1.svg'
import { getParkingSpots, saveCarData } from '../../api/parking-lot/api';
import CarForm from './CarForm';
import { Button, Card, Typography, Spin, Row, Col, Badge, Alert, Modal } from 'antd';
const { Title, Text } = Typography;

const ParkingLot = ({ initialLayout, onLayoutChange, parkingLotId }) => {
const [parkedCars, setParkedCars] = useState({});
const [layout, setLayout] = useState(initialLayout || { spots: [] });
const [selectedSpot, setSelectedSpot] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [dataLoading, setDataLoading] = useState(true);
const [svgContent, setSvgContent] = useState(null);
const [editMode, setEditMode] = useState(false);
const [error, setError] = useState(null);
const containerRef = useRef(null);
const [modalOpen, setModalOpen] = useState(false);

// Car colors
const carColors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3', '#000000', '#FFFFFF'];

// Load parking spot data from database
useEffect(() => {
  const fetchParkingData = async () => {
    if (!parkingLotId) {
      setDataLoading(false);
      return;
    }
    
    setDataLoading(true);
    try {
      const response = await getParkingSpots(parkingLotId);
      const spotData = response.data;
      
      // Assuming the API returns an array of spots with car data
      // where each spot has an id and possibly a car object
      const carMap = {};
      
      spotData.forEach(spot => {
        if (spot.currentCar) {
          carMap[spot.spotId] = spot.currentCar;
        }
      });
      
      setParkedCars(carMap);
      console.log(carMap);
      
      setError(null);
    } catch (err) {
      setError('Failed to load parking data. Please try again later.');
    } finally {
      setDataLoading(false);
    }
  };
  
  fetchParkingData();
}, [parkingLotId]);

useEffect(() => {
  if (onLayoutChange && layout) {
    onLayoutChange(layout);
  }
  
  // Load SVG background
  if (layout.svgPath) {
    fetch(layout.svgPath)
      .then(response => response.text())
      .then(data => {
        console.log('SVG data loaded:', data);
        setSvgContent(data);
      })
      .catch(error => {
        console.error('Failed to load SVG background:', error);
        setSvgContent(null);
      });
  }
}, [layout, onLayoutChange]);

// Add a car to a specific spot
const addCar = async (spotId, carData = {}) => {
  if (parkedCars[spotId]) return; // Spot already occupied
  
  setIsLoading(true);
  
  // Default car data
  const defaultCarData = {
    color: carColors[Math.floor(Math.random() * carColors.length)],
    model: 'Unknown',
    licensePlate: '',
    owner: {
      name: 'Leon',
      contactInfo: 'abc'
    },
    entryTime: new Date().toISOString(),
    ...carData
  };
  
  try {
    // Send to database
    const savedData = await saveCarData({
      spotId,
      carData: defaultCarData,
      parkingLotId
    });
    
    // Update local state
    setParkedCars({
      ...parkedCars,
      [spotId]: savedData
    });
    
    setSelectedSpot(null);
  } catch (error) {
    console.error('Error saving car data:', error);
    // Use antd notification or message instead of Alert.error
    import('antd').then(({ message }) => {
      message.error('Failed to save car data to database');
    });
  } finally {
    setIsLoading(false);
  }
};

// Remove a car
const removeCar = async (spotId) => {
  try {
    setIsLoading(true);
    
    // Send remove request to database
    await saveCarData({
      spotId,
      carData: null, // null indicates removal,
      parkingLotId
    });
    
    // Update local state
    const newParkedCars = { ...parkedCars };
    delete newParkedCars[spotId];
    setParkedCars(newParkedCars);
  } catch (error) {
    console.error('Error removing car:', error);
    // Use antd notification or message instead of Alert.error
    import('antd').then(({ message }) => {
      message.error('Failed to remove car from database');
    });
  } finally {
    setIsLoading(false);
  }
};

// Toggle edit mode
const toggleEditMode = () => {
  setEditMode(!editMode);
  // If turning off edit mode, close any open forms
  if (editMode) {
    setSelectedSpot(null);
  }
};

// Render spots on top of the SVG background
const renderSpots = () => {
  return layout.spots.map(spot => (
    <g key={spot.id}>
      {/* Semi-transparent spot indicator */}
      <rect 
        x={spot.x} 
        y={spot.y} 
        width={spot.width} 
        height={spot.height} 
        stroke="white" 
        strokeWidth={1} 
        fill="rgba(80, 80, 80, 0.3)" 
        strokeDasharray="5,3"
      />
      
      {/* Parked car or Add button */}
      {parkedCars[spot.id] ? (
        <g>
          {/* Car visualization */}
          <rect 
            x={spot.x + 3} 
            y={spot.y + 5} 
            width={spot.width - 6} 
            height={spot.height - 10} 
            rx={5} 
            fill={parkedCars[spot.id].color} 
          />
          <circle 
            cx={spot.x + 8} 
            cy={spot.y + spot.height - 12} 
            r={3} 
            fill="#333" 
          />
          <circle 
            cx={spot.x + spot.width - 8} 
            cy={spot.y + spot.height - 12} 
            r={3} 
            fill="#333" 
          />
          <rect 
            x={spot.x + 5} 
            y={spot.y + 10} 
            width={spot.width - 10} 
            height={15} 
            fill="#ddd" 
            fillOpacity={0.5} 
          />
          
          {/* Remove button - only visible in edit mode */}
          {editMode && (
            <foreignObject 
              x={spot.x} 
              y={spot.y + (spot.height/2) - 15} 
              width={spot.width} 
              height={30}
            >
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() => removeCar(spot.id)}
                  disabled={isLoading}
                  style={{ zIndex: 10 }}
                >
                  x
                </Button>
              </div>
            </foreignObject>
          )}
        </g>
      ) : (
        /* Add button for empty spots - only visible in edit mode */
        editMode && (
          <foreignObject 
            x={spot.x} 
            y={spot.y + (spot.height/2) - 15} 
            width={spot.width} 
            height={30}
          >
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="primary"
                size="small"
                onClick={() => handleSpotClick(spot.id)}
                disabled={isLoading}
                style={{ zIndex: 10 }}
              >
                +
              </Button>
            </div>
          </foreignObject>
        )
      )}
    </g>
  ));
};

const handleSpotClick = (spotId) => {
  setSelectedSpot(spotId);
  setModalOpen(true);
}

return (
  <div style={{ padding: '24px' }}>
    <Row justify="center">
      <Col>
        <Card style={{ marginBottom: '16px', backgroundColor: '#001529', color: 'white' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Badge count={Object.keys(parkedCars).length} showZero>
                <Text strong style={{ color: 'white', marginRight: '16px' }}>Cars</Text>
              </Badge>
            </Col>
            <Col>
              <Button 
                type={editMode ? "primary" : "default"}
                onClick={toggleEditMode}
                disabled={dataLoading}
              >
                {editMode ? "Done" : "Edit"}
              </Button>
            </Col>
          </Row>
        </Card>
        
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
        )}
        
        <div
          style={{ 
            position: 'relative',
            border: '1px solid #d9d9d9',
            backgroundColor: '#555555',
            borderRadius: '4px',
            overflow: 'auto' 
          }}
          ref={containerRef}
        >
          <Spin spinning={isLoading || dataLoading} tip={dataLoading ? "Loading parking data..." : "Processing..."}>
            {/* SVG Background Layer */}
            <div style={{ 
              width: layout.width, 
              height: layout.height,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}>
              {svgContent && (
                <Logo 
                  viewBox={`0 0 ${layout.width} ${layout.height}`}
                  style={{ 
                    width: layout.width, 
                    height: layout.height,
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}/>
              )}
            </div>
            {/* Interactive Spots Layer */}
            <svg 
              width={layout.width} 
              height={layout.height} 
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              style={{ 
                position: 'relative',
                zIndex: 2
              }}
            >
              {renderSpots()}
            </svg>
          </Spin>
        </div>
        
        {selectedSpot && (
            <Modal
            centered
            open={modalOpen}
            footer={null}
            // onCancel={() => setSelectedSpot(null)} // Close the modal when cancel is clicked
            closable={false}
          >
            <Title level={4}>Add Car to Spot {selectedSpot}</Title>
            <CarForm 
              onSubmit={(data) => {
                addCar(selectedSpot, data); // Submit the form data
                setModalOpen(false); // Close the modal after submission
              }} 
              onCancel={() => setSelectedSpot(null)} // Close the modal when cancel is clicked
              isLoading={isLoading}
            />
          </Modal>
        )}
        
        <Alert
          message="Instructions"
          description={editMode 
            ? "Click '+' to place a car in a parking spot. Click 'x' to remove a car. Click 'Done' when finished." 
            : "Click 'Edit' to add or remove cars."}
          type="info"
          showIcon
          style={{ marginTop: '16px' }}
        />
      </Col>
    </Row>
  </div>
);
};

export default ParkingLot;