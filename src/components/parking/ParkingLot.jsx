import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Logo } from "../../maps/map1.svg";
import {
  getCarDetail,
  getParkingSpots,
  saveCarData,
} from "../../api/parking-lot/api";
import CarForm from "./CarForm";
import "./index.css";
import {
  Button,
  Card,
  Typography,
  Spin,
  Row,
  Col,
  Alert,
  Modal,
  Segmented,
  Popover,
} from "antd";
import { processImageToLayout } from "../../services/imageProcessing";
import TopViewCar from "../canvas/Canvas";
import axios from "axios";

const { Title, Text } = Typography;

const layoutOptions = [
  {
    label: "Floor: ",
    value: "floor",
    disabled: true,
  },
  {
    label: "L1",
    value: "map1",
  },
  {
    label: "L2",
    value: "map2",
  },
  {
    label: "L3",
    value: "map3",
  },
];

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
  const [currentLayout, setCurrentLayout] = useState("map1");
  const [selectedCar, setSelectedCar] = useState(null);
  const [carDetailsLoading, setCarDetailsLoading] = useState(false);
  const [carDetails, setCarDetails] = useState(null);

  const carColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3FF33",
    "#FF33F3",
    "#33FFF3",
    "#000000",
    "#FFFFFF",
  ];

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
        response.data.forEach((spot) => {
          if (spot.currentCar) {
            carMap[spot.spotId] = {
              id: spot.currentCar,
              color: spot.currentCarColor,
            };
          }
        });
        setParkedCars(carMap);
        setError(null);
      } catch (err) {
        setError("Failed to load parking data. Please try again later.");
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
        .then((response) => response.text())
        .then(setSvgContent)
        .catch(() => setSvgContent(null));
    }
  }, [layout, onLayoutChange]);

  const fetchCarDetails = async (carId) => {
    if (!carId) return;

    setCarDetailsLoading(true);
    try {
      const response = await getCarDetail(carId);
      if (!response.data) {
        setCarDetails(null);
        return;
      }
      // Check if the response contains car details
      setCarDetails(response.data);
    } catch (err) {
      console.error("Failed to fetch car details:", err);
      import("antd").then(({ message }) =>
        message.error("Failed to load car details")
      );
      setCarDetails(null);
    } finally {
      setCarDetailsLoading(false);
    }
  };

  const handleCarClick = (spotId) => {
    if (editMode) return; // Don't show details in edit mode

    const car = parkedCars[spotId];
    if (car) {
      if (selectedCar === spotId) {
        // If clicking the same car, close the popup
        setSelectedCar(null);
        setCarDetails(null);
      } else {
        // If clicking a different car, show its details
        setSelectedCar(spotId);
        fetchCarDetails(car.id);
      }
    }
  };

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
      setError("Failed to load layout.");
    } finally {
      setIsLoading(false);
    }
  };

  const addCar = async (spotId, carData = {}) => {
    if (parkedCars[spotId]) return;
    setIsLoading(true);
    const defaultCarData = {
      color: carColors[Math.floor(Math.random() * carColors.length)],
      model: "Unknown",
      licensePlate: "",
      ...carData,
    };
    try {
      const savedData = await saveCarData({
        spotId,
        carData: defaultCarData,
        parkingLotId,
      });
      setParkedCars({ ...parkedCars, [spotId]: savedData });
      setSelectedSpot(null);
    } catch {
      import("antd").then(({ message }) =>
        message.error("Failed to save car data to database")
      );
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

      // Clear selection if removing the selected car
      if (selectedCar === spotId) {
        setSelectedCar(null);
        setCarDetails(null);
      }
    } catch {
      import("antd").then(({ message }) =>
        message.error("Failed to remove car from database")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      setSelectedSpot(null);
      setModalOpen(false);
    }
    // Close car details when entering edit mode
    setSelectedCar(null);
    setCarDetails(null);
  };

  const handleSpotClick = (spotId) => {
    setSelectedSpot(spotId);
    setModalOpen(true);
  };

  // Car details popup content
  const renderCarDetails = () => {
    if (carDetailsLoading) {
      return <Spin tip="Loading car details..." />;
    }

    if (!carDetails) {
      return <Text>No details available</Text>;
    }

    return (
      <div className="car-details-bubble">
        <p>
          <strong>Current Spot:</strong> {carDetails.currentSpot || "Unknown"}
        </p>
        <p>
          <strong>License:</strong> {carDetails.licensePlate || "Unknown"}
        </p>
        <p>
          <strong>Model:</strong> {carDetails.model || "Unknown"}
        </p>
        <p>
          <strong>Owner:</strong> {carDetails.ownerUser || "Unknown"}
        </p>
        <p>
          <strong>Contact:</strong> {carDetails.ownerInfo || "Unknown"}
        </p>
        <p>
          <strong>Apartment:</strong> {carDetails.apartment || "Unknown"}
        </p>
      </div>
    );
  };

  const renderSpots = () =>
    layout.spots.map((spot) => {
      const isCarSelected = selectedCar === spot.id;

      return (
        <g key={spot.id}>
          <rect
            x={spot.x}
            y={spot.y}
            width={spot.width}
            height={spot.height}
            stroke="white"
            strokeWidth={1}
            fill="rgba(80,80,80,0.3)"
            strokeDasharray="5,3"
          />

          {parkedCars[spot.id] ? (
            <g>
              {/* Car with click handler */}
              <TopViewCar
                x={spot.x}
                y={spot.y}
                width={spot.width}
                height={spot.height}
                color={parkedCars[spot.id].color}
                onClick={() => handleCarClick(spot.id)}
                style={{ cursor: "pointer" }}
              />

              {/* Highlight selected car */}
              {isCarSelected && (
                <rect
                  x={spot.x}
                  y={spot.y}
                  width={spot.width}
                  height={spot.height}
                  stroke="#ffcc00"
                  strokeWidth={2}
                  fill="none"
                />
              )}

              {/* Car details bubble for selected car */}
              {isCarSelected && (
                <foreignObject
                  x={spot.x + spot.width + 5}
                  y={spot.y - 20}
                  width={180}
                  height={150}
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      padding: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      fontSize: "12px",
                      position: "relative",
                    }}
                  >
                    {/* Triangle pointer */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-10px",
                        top: "20px",
                        width: "0",
                        height: "0",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderRight: "10px solid white",
                      }}
                    />
                    {renderCarDetails()}
                  </div>
                </foreignObject>
              )}

              {/* Edit buttons only in edit mode */}
              {editMode && (
                <foreignObject
                  x={spot.x}
                  y={spot.y + spot.height / 2 - 15}
                  width={spot.width}
                  height={30}
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      type="primary"
                      danger
                      size="small"
                      onClick={() => removeCar(spot.id)}
                      disabled={isLoading}
                    >
                      x
                    </Button>
                  </div>
                </foreignObject>
              )}
            </g>
          ) : (
            editMode && (
              <foreignObject
                x={spot.x}
                y={spot.y + spot.height / 2 - 15}
                width={spot.width}
                height={30}
              >
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleSpotClick(spot.id)}
                    disabled={isLoading}
                  >
                    +
                  </Button>
                </div>
              </foreignObject>
            )
          )}
        </g>
      );
    });

  return (
    <main>
      <Row justify="center">
        <Col>
          <Card
            style={{
              marginBottom: "16px",
              color: "white",
              borderRadius: "20px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Segmented
                  value={currentLayout}
                  onChange={changeLayout}
                  options={layoutOptions}
                />
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
              style={{ marginBottom: "16px" }}
            />
          )}

          <div
            style={{
              position: "relative",
              border: "1px solid #d9d9d9",
              backgroundColor: "#555555",
              borderRadius: "4px",
              overflow: "auto",
            }}
            ref={containerRef}
          >
            <Spin
              spinning={isLoading || dataLoading}
              tip={dataLoading ? "Loading parking data..." : "Processing..."}
            >
              <div
                style={{
                  width: layout.width,
                  height: layout.height,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              >
                {svgContent && (
                  <Logo
                    viewBox={`0 0 ${layout.width} ${layout.height}`}
                    style={{
                      width: layout.width,
                      height: layout.height,
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
              <svg
                width={layout.width}
                height={layout.height}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                style={{ position: "relative", zIndex: 2 }}
              >
                {renderSpots()}
              </svg>
            </Spin>
          </div>

          {!editMode && (
            <Alert
              message="Instructions"
              description="Click on a car to view its details."
              type="info"
              showIcon
              style={{ marginTop: "16px" }}
            />
          )}

          {editMode && (
            <Alert
              message="Edit Mode"
              description="Click '+' to place a car in a parking spot. Click 'x' to remove a car. Click 'Done' when finished."
              type="warning"
              showIcon
              style={{ marginTop: "16px" }}
            />
          )}

          {selectedSpot && (
            <Modal centered open={modalOpen} footer={null} closable={false}>
              <Title level={4}>Add Car to Spot {selectedSpot}</Title>
              <CarForm
                onSubmit={(data) => {
                  addCar(selectedSpot, data);
                  setModalOpen(false);
                }}
                onCancel={() => {
                  setSelectedSpot(null);
                  setModalOpen(false);
                }}
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
