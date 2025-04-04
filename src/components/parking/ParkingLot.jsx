// src/components/ParkingLot.js
import React, { useState, useEffect, useRef } from 'react';
import {ReactComponent as Logo } from '../../maps/map1.svg'
import { saveCarData } from '../../api/parking-lot/api';
import CarForm from './CarForm';
import { Button, Card, Typography, Spin, Row, Col, Badge, Alert } from 'antd';

const { Title, Text } = Typography;

const ParkingLot = ({ initialLayout, onLayoutChange }) => {
  const [parkedCars, setParkedCars] = useState({});
  const [layout, setLayout] = useState(initialLayout || { spots: [] });
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [svgContent, setSvgContent] = useState(null);
  const containerRef = useRef(null);
  
  // Car colors
  const carColors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3', '#000000', '#FFFFFF'];
  
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
        carData: defaultCarData
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
        carData: null // null indicates removal
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
            
            {/* Remove button */}
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
                  Remove
                </Button>
              </div>
            </foreignObject>
          </g>
        ) : (
          /* Add button for empty spots */
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
                onClick={() => setSelectedSpot(spot.id)}
                disabled={isLoading}
                style={{ zIndex: 10 }}
              >
                +
              </Button>
            </div>
          </foreignObject>
        )}
      </g>
    ));
  };
  
  return (
    <div style={{ padding: '24px' }}>
      <Row justify="center">
        <Col>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '16px' }}>
            Interactive Parking Lot
          </Title>
          
          <Card style={{ marginBottom: '16px', backgroundColor: '#001529', color: 'white' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Badge count={Object.keys(parkedCars).length} showZero>
                  <Text strong style={{ color: 'white', marginRight: '16px' }}>Cars</Text>
                </Badge>
              </Col>
              <Col>
                <Text style={{ color: 'white', fontSize: '12px' }}>
                  Layout: {layout.svgPath || 'Default'}
                </Text>
              </Col>
            </Row>
          </Card>
          
          <div
            style={{ 
              position: 'relative',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              overflow: 'auto' 
            }}
            ref={containerRef}
          >
            <Spin spinning={isLoading}>
              {/* SVG Background Layer */}
              <div style={{ 
                width: layout.width, 
                height: layout.height,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                // backgroundColor: '#505050'
              }}>
                {svgContent && (
                  // <div
                  //   style={{ 
                  //     width: '100%', 
                  //     height: '100%',
                  //     position: 'absolute',
                  //     top: 0,
                  //     left: 0
                  //   }}
                  //   dangerouslySetInnerHTML={{ __html: svgContent }}
                  // />
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
              {/* <span>Width: {layout.width}</span> */}
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
            <Card style={{ marginTop: '16px' }}>
              <Title level={4}>Add Car to Spot {selectedSpot}</Title>
              <CarForm 
                onSubmit={(data) => addCar(selectedSpot, data)} 
                onCancel={() => setSelectedSpot(null)}
                isLoading={isLoading}
              />
            </Card>
          )}
          
          <Alert
            message="Instructions"
            description="Click 'Add' to place a car in a parking spot. Click 'Remove' to take it away."
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