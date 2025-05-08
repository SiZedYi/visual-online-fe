import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, Row, Col, Select } from "antd";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const formatFloorName = (floor) => {
  if (!floor) return "";
  return floor.replace(/floor(\d+)/i, (match, number) => `Floor ${number}`);
};

const colorOptions = [
  { value: '#FF5733', label: 'Red' },
  { value: '#33FF57', label: 'Green' },
  { value: '#3357FF', label: 'Blue' },
  { value: '#FFD700', label: 'Yellow' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' }
];

const CarTable = ({ data, onEdit, loading }) => {
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  
  // Search field options
  const searchFields = [
    { value: "all", label: "All Fields" },
    { value: "licensePlate", label: "License Plate" },
    { value: "model", label: "Model" },
    { value: "color", label: "Color" },
    { value: "ownerInfo.name", label: "Owner Name" },
    { value: "ownerInfo.contactInfo", label: "Contact Info" },
    { value: "currentSpot.floor", label: "Floor" },
    { value: "currentSpot.spotId", label: "Spot ID" }
  ];

  // Filter data based on search input
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredData(data);
      return;
    }
    
    const searchLower = searchText.toLowerCase();
    
    const filtered = data.filter(car => {
      // Function to check nested properties using dot notation
      const getNestedValue = (obj, path) => {
        const parts = path.split('.');
        let value = obj;
        for (const part of parts) {
          if (!value) return null;
          value = value[part];
        }
        return value;
      };
      
      // Search in specific field if selected
      if (searchField !== "all") {
        const value = getNestedValue(car, searchField);
        if (!value) return false;
        
        // Handle color specially
        if (searchField === "color") {
          const colorOption = colorOptions.find(opt => opt.label.toLowerCase() === searchLower);
          if (colorOption && colorOption.value.toLowerCase() === value.toLowerCase()) {
            return true;
          }
        }
        
        return String(value).toLowerCase().includes(searchLower);
      }
      
      // Search in all fields
      if (
        car.licensePlate?.toLowerCase().includes(searchLower) ||
        car.model?.toLowerCase().includes(searchLower) ||
        car.ownerInfo?.name?.toLowerCase().includes(searchLower) ||
        car.ownerInfo?.contactInfo?.toLowerCase().includes(searchLower) ||
        car.currentSpot?.spotId?.toLowerCase().includes(searchLower)
      ) {
        return true;
      }
      
      // Color search - match by color name
      const colorOption = colorOptions.find(opt => opt.label.toLowerCase().includes(searchLower));
      if (colorOption && car.color?.toLowerCase() === colorOption.value.toLowerCase()) {
        return true;
      }
      
      // Floor search - match both raw and formatted floor name
      if (car.currentSpot?.floor) {
        const formattedFloor = formatFloorName(car.currentSpot.floor).toLowerCase();
        if (formattedFloor.includes(searchLower) || 
            car.currentSpot.floor.toLowerCase().includes(searchLower)) {
          return true;
        }
      }
      
      return false;
    });
    
    setFilteredData(filtered);
  }, [searchText, searchField, data]);

  const columns = [
    {
      title: "License Plate",
      dataIndex: "licensePlate",
      sorter: (a, b) => (a.licensePlate || "").localeCompare(b.licensePlate || ""),
    },
    {
      title: "Model",
      dataIndex: "model",
      sorter: (a, b) => (a.model || "").localeCompare(b.model || ""),
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (color) => {
        const matched = colorOptions.find(option => option.value.toLowerCase() === color?.toLowerCase());
        return matched ? matched.label : color || "Unknown";
      },
      sorter: (a, b) => {
        const getColorLabel = (color) => {
          const matched = colorOptions.find(option => option.value.toLowerCase() === color?.toLowerCase());
          return matched ? matched.label : color || "Unknown";
        };
        return getColorLabel(a.color).localeCompare(getColorLabel(b.color));
      },
    },
    {
      title: "Owner",
      dataIndex: "ownerInfo",
      render: (owner) => owner?.name || "N/A",
      sorter: (a, b) => (a.ownerInfo?.name || "").localeCompare(b.ownerInfo?.name || ""),
    },
    {
      title: "Contact Info",
      dataIndex: "ownerInfo",
      render: (owner) => owner?.contactInfo || "N/A",
      sorter: (a, b) => (a.ownerInfo?.contactInfo || "").localeCompare(b.ownerInfo?.contactInfo || ""),
    },
    {
      title: "Current Floor",
      dataIndex: "currentSpot",
      render: (currentSpot) => (currentSpot?.floor ? formatFloorName(currentSpot.floor) : "Not parked"),
      sorter: (a, b) => {
        const floorA = a.currentSpot?.floor ? formatFloorName(a.currentSpot.floor) : "Not parked";
        const floorB = b.currentSpot?.floor ? formatFloorName(b.currentSpot.floor) : "Not parked";
        return floorA.localeCompare(floorB);
      },
    },
    {
      title: "Current Spot",
      dataIndex: "currentSpot",
      render: (currentSpot) => (currentSpot?.spotId ? currentSpot.spotId : "Not parked"),
      sorter: (a, b) => {
        const spotA = a.currentSpot?.spotId || "zzz"; // Put empty values at the end
        const spotB = b.currentSpot?.spotId || "zzz";
        return spotA.localeCompare(spotB);
      },
    },
    {
      title: "Register Day",
      dataIndex: "updatedAt",
      render: (updatedAt) =>
        updatedAt ? dayjs(updatedAt).format("DD/MM/YYYY") : "Not entered",
      sorter: (a, b) => {
        if (!a.updatedAt && !b.updatedAt) return 0;
        if (!a.updatedAt) return 1;
        if (!b.updatedAt) return -1;
        return dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix();
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button type="link" onClick={() => onEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchFieldChange = (value) => {
    setSearchField(value);
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchField("all");
  };

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Select
            value={searchField}
            onChange={handleSearchFieldChange}
            style={{ width: '100%',  }}
            options={searchFields}
            suffixIcon={<CaretDownOutlined />}
          />
        </Col>
        <Col span={18}>
          <Input
            placeholder="Search cars..."
            value={searchText}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            style={{ padding: '8px' }}
            allowClear
            suffix={
              searchText && (
                <Button type="text" size="small" onClick={clearSearch}>
                  Clear
                </Button>
              )
            }
          />
        </Col>
      </Row>
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        loading={loading} 
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `Total ${total} cars`,
        }}
      />
    </>
  );
};

export default CarTable;