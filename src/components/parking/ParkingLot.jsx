import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Logo } from '../../maps/map1.svg';
import { getParkingSpots, saveCarData } from '../../api/parking-lot/api';
import CarForm from './CarForm';
import './index.css';
import { Button, Card, Typography, Spin, Row, Col, Alert, Modal, Segmented } from 'antd';
import { processImageToLayout } from '../../services/imageProcessing';
import TopViewCar from '../canvas/Canvas';

const { Title } = Typography;

const layoutOptions = ['floor','map1', 'map2', 'map3'];

const ParkingLot = ({ initialLayout, onLayoutChange, parkingLotId }) => {
  const [parkedCars, setParkedCars] = useState({});
  const [layout, setLayout] = useState(initialLayout || { spots: [] });
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [svgContent, setSvgContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);
  const [currentLayout, setCurrentLayout] = useState('map1');

  const carColors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3', '#000000', '#FFFFFF'];

  useEffect(() => {
    const fetchParkingData = async () => {
      if (!parkingLotId) {
        setDataLoading(false);
        return;
      }
      setDataLoading(true);
      try {
        const response = await getParkingSpots(parkingLotId);
        const carMap = {};
        response.data.forEach(spot => {
          if (spot.currentCar) {
            carMap[spot.spotId] = {
              id: spot.currentCar,
              color: spot.currentCarColor
            };
          }
        });
        setParkedCars(carMap);
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
    if (layout.svgPath) {
      fetch(layout.svgPath)
        .then(response => response.text())
        .then(setSvgContent)
        .catch(() => setSvgContent(null));
    }
  }, [layout, onLayoutChange]);

  const changeLayout = async (layoutName) => {
    setIsLoading(true);
    setCurrentLayout(layoutName);
    try {
      const mockFile = new File([""], `${layoutName}.jpg`, {
        type: "image/jpeg",
      });
      const layoutData = await processImageToLayout(mockFile);
      setLayout(layoutData);
    } catch (err) {
      setError('Failed to load layout.');
    } finally {
      setIsLoading(false);
    }
  };

  const addCar = async (spotId, carData = {}) => {
    if (parkedCars[spotId]) return;
    setIsLoading(true);
    const defaultCarData = {
      color: carColors[Math.floor(Math.random() * carColors.length)],
      model: 'Unknown',
      licensePlate: '',
      ...carData
    };
    try {
      const savedData = await saveCarData({ spotId, carData: defaultCarData, parkingLotId });
      setParkedCars({ ...parkedCars, [spotId]: savedData });
      setSelectedSpot(null);
    } catch {
      import('antd').then(({ message }) => message.error('Failed to save car data to database'));
    } finally {
      setIsLoading(false);
    }
  };

  const removeCar = async (spotId) => {
    setIsLoading(true);
    try {
      await saveCarData({ spotId, carData: null, parkingLotId });
      const updated = { ...parkedCars };
      delete updated[spotId];
      setParkedCars(updated);
    } catch {
      import('antd').then(({ message }) => message.error('Failed to remove car from database'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) setSelectedSpot(null);
  };

  const handleSpotClick = (spotId) => {
    setSelectedSpot(spotId);
    setModalOpen(true);
  };

  const renderSpots = () => layout.spots.map(spot => (
    <g key={spot.id}>
      <rect x={spot.x} y={spot.y} width={spot.width} height={spot.height} stroke="white" strokeWidth={1} fill="rgba(80,80,80,0.3)" strokeDasharray="5,3" />
      {parkedCars[spot.id] ? (
        <g>
          {/* Car image  */}
            <TopViewCar  
              x={spot.x}
              y={spot.y}
              width={spot.width}
              height={spot.height}
              color={parkedCars[spot.id].color}/>

          {editMode && (
            <foreignObject x={spot.x} y={spot.y + (spot.height / 2) - 15} width={spot.width} height={30}>
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" danger size="small" onClick={() => removeCar(spot.id)} disabled={isLoading}>x</Button>
              </div>
            </foreignObject>
          )}
        </g>
      ) : (
        editMode && (
          <foreignObject x={spot.x} y={spot.y + (spot.height / 2) - 15} width={spot.width} height={30}>
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" size="small" onClick={() => handleSpotClick(spot.id)} disabled={isLoading}>+</Button>
            </div>
          </foreignObject>
        )
      )}
    </g>
  ));

  return (
    <main>
      <Row justify="center">
        <Col>
          <Card style={{ marginBottom: '16px',  color: 'white', borderRadius: '20px',
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Segmented
                  value={currentLayout}
                  onChange={changeLayout}
                  options={layoutOptions.map(option => ({
                  label: option === 'floor' ? 'Floor: '
                    : option === 'map1' ? 'L1'
                    : option === 'map2' ? 'L2'
                    : option === 'map3' ? 'L3' : option.toUpperCase(),
                  value: option
                  }))}
                />
              </Col>
              <Col>
                <Button type={editMode ? "primary" : "default"} onClick={toggleEditMode} disabled={dataLoading}>
                  {editMode ? "Done" : "Edit"}
                </Button>
              </Col>
            </Row>
          </Card>

          {error && (
            <Alert message="Error" description={error} type="error" showIcon style={{ marginBottom: '16px' }} />
          )}

          <div
            style={{ position: 'relative', border: '1px solid #d9d9d9', backgroundColor: '#555555', borderRadius: '4px', overflow: 'auto' }}
            ref={containerRef}
          >
            <Spin spinning={isLoading || dataLoading} tip={dataLoading ? "Loading parking data..." : "Processing..."}>
              <div style={{ width: layout.width, height: layout.height, position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                {svgContent && (
                  <Logo
                    viewBox={`0 0 ${layout.width} ${layout.height}`}
                    style={{ width: layout.width, height: layout.height, position: 'absolute', top: 0, left: 0 }}
                  />
                )}
              </div>
              <svg
                width={layout.width}
                height={layout.height}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                style={{ position: 'relative', zIndex: 2 }}
              >
                {renderSpots()}
              </svg>
            </Spin>
          </div>

          {selectedSpot && (
            <Modal centered open={modalOpen} footer={null} closable={false}>
              <Title level={4}>Add Car to Spot {selectedSpot}</Title>
              <CarForm
                onSubmit={(data) => {
                  addCar(selectedSpot, data);
                  setModalOpen(false);
                }}
                onCancel={() => setSelectedSpot(null)}
                isLoading={isLoading}
              />
            </Modal>
          )}
        </Col>
      </Row>
    </main>
  );
};

export default ParkingLot;