import React, { useState } from 'react';
import { Table, Input, Space, Image, Button, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ParkingMapTable = ({ data, onEdit, onDelete }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(searchText)
  );

  const columns = [
    {
      title: 'Parking Lot Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true, // Truncate long content with ellipses
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || '—',
      ellipsis: true, // Truncate long content with ellipses
    },
    {
      title: 'Width (px)',
      dataIndex: 'width',
      key: 'width',
      sorter: (a, b) => a.width - b.width,
    },
    {
      title: 'Height (px)',
      dataIndex: 'height',
      key: 'height',
      sorter: (a, b) => a.height - b.height,
    },
    {
      title: 'View Map',
      dataIndex: 'svgPath',
      key: 'svgPath',
      render: (svgPath) =>
        svgPath ? (
          <Image
            src={svgPath}
            width={100}
            height={80}
            style={{ objectFit: 'cover' }}
            alt="Map Preview"
            preview={{ mask: 'View Larger' }}
          />
        ) : (
          'No Image'
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            type="link"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this map?"
            onConfirm={() => onDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>Map List</h2>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Search by parking lot name..."
          prefix={<SearchOutlined />}
          allowClear
          onChange={handleSearch}
          style={{ width: 300, padding: '8px 12px' }}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record.id || record.name}
          pagination={{ pageSize: 8 }}
        />
      </Space>
    </>
  );
};

export default ParkingMapTable;
