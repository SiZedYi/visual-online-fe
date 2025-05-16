import React, { useState, useEffect, useRef } from "react";
import {
  getCarDetail,
  getParkingSpots,
  saveCarData,
  saveNewSpot,
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
} from "antd";
import TopViewCar from "../canvas/Canvas";
import CarDetail from "./CarDetail";
import { ReloadOutlined } from "@ant-design/icons";

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

const ParkingLot = ({ initialLayout, onLayoutChange, parkingLotId, user }) => {
  const [parkedCars, setParkedCars] = useState({});
  const [userOptions, setUserOptions] = useState([]);
  const [currentParkingLotId, setCurrentParkingLotId] = useState(parkingLotId);
  const [layout, setLayout] = useState({
    ...initialLayout,
    parkingSpots: initialLayout?.parkingSpots || [],
    width: initialLayout?.width || 800,
    height: initialLayout?.height || 600
  });
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);
  const [currentLayout, setCurrentLayout] = useState("map1");
  const [selectedCar, setSelectedCar] = useState(null);
  const [carDetailsLoading, setCarDetailsLoading] = useState(false);
  const [carDetails, setCarDetails] = useState(null);
  const [DynamicSVG, setDynamicSVG] = useState(null);

  // State for spot creation
  const [isAddingSpot, setIsAddingSpot] = useState(false);
  const [newSpot, setNewSpot] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [spotCounter, setSpotCounter] = useState(1); // Start with 1 for spot counter
  const [addSpotEnabled, setAddSpotEnabled] = useState(false); // Toggle for Add Spot functionality
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin); // Toggle for Add Spot functionality
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

  // Load initial SVG on component mount
  useEffect(() => {
    loadSVG(currentLayout);
    fetch('http://localhost:5000/api/auth/users')
      .then(res => res.json())
      .then(result => {
        const userOptions = result.data.map(user => ({
          value: user._id,
          label: user.fullName
        }));
        setUserOptions(userOptions);
      });

  }, []);

  const loadSVG = async (layoutName) => {
    try {
      const module = await import(`../../maps/${layoutName}.svg`);
      setDynamicSVG(() => module.ReactComponent);
    } catch (error) {
      console.error(`Failed to load SVG for ${layoutName}:`, error);
      setError(`Failed to load floor layout for ${layoutName}`);
    }
  };

  const fetchParkingData = async () => {
    if (!currentParkingLotId) {
      setDataLoading(false);
      return;
    }
    setDataLoading(true);
    try {
      // const isAdmin = user?.isAdmin || false;
      const response = await getParkingSpots(currentParkingLotId, isAdmin);
      const carMap = {};

      // Find highest spot ID to properly set counter
      let highestSpotNumber = 0;

      if (response.data && response.data.parkingSpots) {
        response.data.parkingSpots.forEach((spot) => {
          if (spot.currentCar) {
            carMap[spot.spotId] = {
              id: spot.currentCar,
              color: spot.currentCarColor,
            };
          }

          // Extract spot number if it follows the Z{number} format
          if (spot.spotId && spot.spotId.startsWith('Z')) {
            const spotNumber = parseInt(spot.spotId.substring(1), 10);
            if (!isNaN(spotNumber) && spotNumber > highestSpotNumber) {
              highestSpotNumber = spotNumber;
            }
          }
        });
      }

      // Set spot counter to one higher than highest existing spot number
      setSpotCounter(highestSpotNumber + 1);

      setParkedCars(carMap);
      setError(null);
    } catch (err) {
      console.error("Failed to load parking data:", err);
      setError("Failed to load parking data. Please try again later.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingData();
  }, [currentParkingLotId]);

  useEffect(() => {
    if (onLayoutChange && layout) {
      onLayoutChange(layout);
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
      setCarDetails(response.data);
    } catch (err) {
      console.error("Failed to fetch car details:", err);
      import("antd").then(({ message }) =>
        message.error(err.response.data.error)
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
        // If clicking the same car, close the modal
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
      // First load the SVG to ensure it's available
      await loadSVG(layoutName);

      // Then fetch the parking data for this floor - update parkingLotId
      let floorId = layoutName.replace("map", "floor");

      // Cập nhật currentParkingLotId thành floorId mới
      setCurrentParkingLotId(floorId);

      const response = await getParkingSpots(floorId);

      // Transform the API response to match the expected layout structure
      const layoutData = {
        ...response.data,
        parkingSpots: response.data.parkingSpots || [],
        width: response.data.width || 800,
        height: response.data.height || 600
      };

      // Update the layout state
      setLayout(layoutData);

      // Reset selections and errors
      setSelectedSpot(null);
      setSelectedCar(null);
      setCarDetails(null);
      setError(null);

      // IMPORTANT FIX: Reset or update the parkedCars state with the new floor's data
      const newCarMap = {};
      if (response.data && response.data.parkingSpots) {
        response.data.parkingSpots.forEach((spot) => {
          if (spot.currentCar) {
            newCarMap[spot.spotId] = {
              id: spot.currentCar,
              color: spot.currentCarColor,
            };
          }
        });
      }
      setParkedCars(newCarMap);

    } catch (err) {
      console.error("Failed to load layout:", err);
      setError("Failed to load floor layout. Please try again later.");
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
        parkingLotId: currentParkingLotId, // Sử dụng currentParkingLotId thay vì parkingLotId
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
      await saveCarData({
        spotId,
        carData: null,
        parkingLotId: currentParkingLotId  // Sử dụng currentParkingLotId thay vì parkingLotId
      });
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
      // Exiting edit mode
      setSelectedSpot(null);
      setModalOpen(false);
      setIsAddingSpot(false);
      setNewSpot(null);
      setAddSpotEnabled(false); // Reset add spot toggle when exiting edit mode

      // If exiting edit mode, save any new spots
      if (layout.parkingSpots.some(spot => spot.isNew)) {
        saveNewSpots();
      }
    }
    // Close car details when entering edit mode
    setSelectedCar(null);
    setCarDetails(null);
  };

  const handleSpotClick = (spotId) => {
    if (isAddingSpot) return; // Don't open modal when adding spots
    setSelectedSpot(spotId);
    setModalOpen(true);
  };

  // Toggle AddSpot functionality
  const toggleAddSpot = () => {
    const newState = !addSpotEnabled;
    setAddSpotEnabled(newState);

    // If turning off add spot mode, exit the adding spot state
    if (!newState) {
      setIsAddingSpot(false);
      setNewSpot(null);
    } else {
      // If turning on add spot mode, enter adding spot state
      setIsAddingSpot(true);
      setSelectedSpot(null);
      setModalOpen(false);
    }
  };

  const handleContainerMouseDown = (e) => {
    // Only allow creating new spots if conditions are met
    if (!editMode || !isAddingSpot || !addSpotEnabled || isDragging) return;

    // Check if we're clicking on the container itself, not on a child element
    // This helps prevent creating a new spot when trying to click a button
    if (e.target !== containerRef.current && e.target.tagName !== 'svg') {
      return;
    }

    // Get mouse position relative to the container
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Create new spot with a specific ID
    const spotId = `Z${spotCounter}`;

    const spot = {
      id: spotId,
      spotId: spotId,
      x: x,
      y: y,
      width: 60,
      height: 120,
      isNew: true,
    };

    setNewSpot(spot);

    // Add spot to layout
    setLayout(prev => ({
      ...prev,
      parkingSpots: [...(prev.parkingSpots || []), spot]
    }));

    // Increment counter for next spot
    setSpotCounter(prev => prev + 1);

    // Start dragging the new spot
    setIsDragging(true);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (!newSpot || !addSpotEnabled) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    if (isDragging) {
      // Update spot position - use parkingSpots consistently
      const updatedSpots = (layout.parkingSpots || []).map(spot => {
        if (spot.spotId === newSpot.id) {
          return {
            ...spot,
            x: mouseX - dragOffset.x,
            y: mouseY - dragOffset.y
          };
        }
        return spot;
      });

      setLayout(prev => ({
        ...prev,
        parkingSpots: updatedSpots
      }));

      // Update the newSpot reference
      setNewSpot(updatedSpots.find(spot => spot.spotId === newSpot.id));
    } else if (isResizing) {
      // Calculate new width and height based on mouse movement
      const dx = mouseX - resizeStartPos.x;
      const dy = mouseY - resizeStartPos.y;

      // Use parkingSpots consistently
      const updatedSpots = (layout.parkingSpots || []).map(spot => {
        if (spot.spotId === newSpot.id) {
          return {
            ...spot,
            width: Math.max(40, newSpot.width + dx),
            height: Math.max(80, newSpot.height + dy)
          };
        }
        return spot;
      });

      setLayout(prev => ({
        ...prev,
        parkingSpots: updatedSpots
      }));

      // Update resize start position
      setResizeStartPos({ x: mouseX, y: mouseY });

      // Update the newSpot reference
      setNewSpot(updatedSpots.find(spot => spot.spotId === newSpot.id));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleSpotMouseDown = (e, spotId) => {
    e.stopPropagation();
    // Only allow dragging if addSpotEnabled is true
    if (!editMode || !isAddingSpot || !addSpotEnabled) return;

    // Use parkingSpots consistently
    const spot = (layout.parkingSpots || []).find(s => s.spotId === spotId);
    if (!spot || !spot.isNew) return;

    setNewSpot(spot);

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    setIsDragging(true);
    setDragOffset({
      x: mouseX - spot.x,
      y: mouseY - spot.y
    });
  };

  const handleResizeHandleMouseDown = (e, spotId) => {
    e.stopPropagation();
    // Only allow resizing if addSpotEnabled is true
    if (!editMode || !isAddingSpot || !addSpotEnabled) return;

    // Use parkingSpots consistently
    const spot = (layout.parkingSpots || []).find(s => s.spotId === spotId);
    if (!spot || !spot.isNew) return;

    setNewSpot(spot);

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    setIsResizing(true);
    setResizeStartPos({ x: mouseX, y: mouseY });
  };

  // Remove spot
  const removeSpot = (spotId) => {
    // Allow removing spots regardless of addSpotEnabled state in edit mode
    if (!editMode) return;

    console.log("Removing spot:", spotId);

    // Use parkingSpots consistently
    setLayout(prev => ({
      ...prev,
      parkingSpots: (prev.parkingSpots || []).filter(spot => spot.spotId !== spotId)
    }));

    if (newSpot && newSpot.id === spotId) {
      setNewSpot(null);
    }
  };

  // Save new spots
  const saveNewSpots = async () => {
    setIsLoading(true);
    try {
      // Filter new spots - use parkingSpots consistently
      const newSpots = (layout.parkingSpots || []).filter(spot => spot.isNew);

      if (newSpots.length === 0) {
        return;
      }

      // Save new spots to backend
      await Promise.all(newSpots.map(spot => {
        // Use the spot's ID directly which was already set during creation
        const spotData = {
          x: spot.x,
          y: spot.y,
          width: spot.width,
          height: spot.height,
          parkingLotId: currentParkingLotId, // Sử dụng currentParkingLotId thay vì parkingLotId
          spotId: spot.spotId // Use the existing ID that was already assigned
        };

        return saveNewSpot(spotData);
      }));

      // Mark spots as no longer new - use parkingSpots consistently
      setLayout(prev => ({
        ...prev,
        parkingSpots: (prev.parkingSpots || []).map(spot => ({
          ...spot,
          isNew: false
        }))
      }));

      import("antd").then(({ message }) =>
        message.success("New parking spots saved successfully")
      );
    } catch (err) {
      console.error("Failed to save new spots:", err);
      import("antd").then(({ message }) =>
        message.error("Failed to save new parking spots")
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Car details popup content
  const renderCarDetails = () => {
    return (
      <Modal
        header={null}
        closable={false}
        centered
        width={1000}
        open={!!selectedCar}
        onCancel={() => {
          setSelectedCar(null);
          setCarDetails(null);
        }}
        footer={null}
      >
        {carDetailsLoading ? (
          <Spin tip="Loading car details..." />
        ) : carDetails ? (
          <CarDetail carDetails={carDetails} />
        ) : (
          <Text>No details available</Text>
        )}
      </Modal>
    );
  };

  const renderSpots = () => {
    if (!layout.parkingSpots || !Array.isArray(layout.parkingSpots)) {
      return null;
    }

    return layout.parkingSpots.map((spot) => {
      const isCarSelected = selectedCar === spot.spotId;
      const isNewSpot = spot.isNew;

      return (
        <g key={spot.spotId}>
          <rect
            x={spot.x}
            y={spot.y}
            width={spot.width}
            height={spot.height}
            stroke={isNewSpot ? "#1890ff" : "white"}
            strokeWidth={isNewSpot ? 2 : 1}
            fill={isNewSpot ? "rgba(24,144,255,0.2)" : "rgba(80,80,80,0.3)"}
            strokeDasharray={isNewSpot ? "" : "5,3"}
            onMouseDown={(e) => handleSpotMouseDown(e, spot.spotId)}
            style={{ cursor: isNewSpot && editMode && addSpotEnabled ? "move" : "default" }}
          />
          <text
            x={spot.x + 5}
            y={spot.y + 15}
            fill="white"
            fontSize="12"
            fontWeight="bold"
            style={{ pointerEvents: "none" }}
          >
            {spot.spotId}
          </text>
          {/* Resize handle for new spots - only visible when addSpotEnabled is true */}
          {isNewSpot && editMode && addSpotEnabled && (
            <g>
              <circle
                cx={spot.x + spot.width}
                cy={spot.y + spot.height}
                r={6}
                fill="#1890ff"
                stroke="white"
                strokeWidth={1}
                onMouseDown={(e) => {
                  e.stopPropagation(); // Stop event from bubbling
                  handleResizeHandleMouseDown(e, spot.spotId);
                }}
                style={{ cursor: "nwse-resize" }}
              />

              {/* Improved delete button for new spot */}
              <foreignObject
                x={spot.x + spot.width - 24}
                y={spot.y}
                width={24}
                height={24}
              >
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="primary"
                    danger
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop event from bubbling
                      e.preventDefault(); // Prevent default behavior
                      removeSpot(spot.spotId);
                    }}
                    disabled={isLoading}
                  >
                    x
                  </Button>
                </div>
              </foreignObject>
            </g>
          )}

          {parkedCars[spot.spotId] ? (
            <g>
              {/* Car with click handler */}
              <TopViewCar
                x={spot.x}
                y={spot.y}
                width={spot.width}
                height={spot.height}
                color={parkedCars[spot.spotId].color}
                onClick={() => handleCarClick(spot.spotId)}
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

              {/* Remove car button only in edit mode */}
              {editMode && !isNewSpot && (
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
                      onClick={() => removeCar(spot.spotId)}
                      disabled={isLoading}
                    >
                      x
                    </Button>
                  </div>
                </foreignObject>
              )}
            </g>
          ) : (
            // Add car button (+) for empty spots in edit mode
            editMode && !isNewSpot && (
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
                    onClick={() => handleSpotClick(spot.spotId)}
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
  };

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
                  icon={<ReloadOutlined />}
                  onClick={fetchParkingData}
                  style={{ marginRight: "8px" }}
                  disabled={dataLoading}
                >
                </Button>

                {editMode && (
                  <Button
                    type={addSpotEnabled ? "primary" : "default"}
                    onClick={toggleAddSpot}
                    style={{ marginRight: "8px" }}
                    disabled={dataLoading || isLoading}
                  >
                    {addSpotEnabled ? "Disable Add Spot" : "Enable Add Spot"}
                  </Button>
                )}
                {isAdmin && (
                  <Button
                  type={editMode ? "primary" : "default"}
                  onClick={toggleEditMode}
                  disabled={dataLoading}
                >
                  {editMode ? "Done" : "Edit"}
                </Button>)}

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
              width: layout.width || 800,
              height: layout.height || 600,
            }}
            ref={containerRef}
            // Only attach mousedown if we're in the right mode
            onMouseDown={editMode && isAddingSpot && addSpotEnabled ? handleContainerMouseDown : undefined}
            onMouseMove={editMode && (isDragging || isResizing) && addSpotEnabled ? handleMouseMove : undefined}
            onMouseUp={editMode && (isDragging || isResizing) ? handleMouseUp : undefined}
            onMouseLeave={editMode && (isDragging || isResizing) ? handleMouseUp : undefined}
          >
            <Spin
              spinning={isLoading || dataLoading}
              tip={dataLoading ? "Loading parking data..." : "Processing..."}
            >
              {DynamicSVG && (
                <DynamicSVG
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              )}
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${layout.width || 800} ${layout.height || 600}`}
                style={{ position: "relative", zIndex: 2 }}
                onClick={(e) => {
                  // Prevent creating spots when clicking on the SVG but not on the container
                  if (editMode && isAddingSpot && addSpotEnabled) {
                    e.stopPropagation();
                  }
                }}
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
              description={
                addSpotEnabled
                  ? "Click on the map to create new parking spots. Drag to position them and use the resize handle to adjust size. Click 'x' to remove cars or spots."
                  : "Click '+' to place a car in a parking spot. Click 'x' to remove a car. Enable 'Add Spot' to create new parking spots."
              }
              type="info"
              showIcon
              style={{ marginTop: "16px" }}
            />
          )}

          {renderCarDetails()}

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
                users={userOptions}
              />
            </Modal>
          )}
        </Col>
      </Row>
    </main>
  );
};

export default ParkingLot;