// UserGroupCreate.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select, message, Table, Tag } from 'antd';
import axios from 'axios';
import { fetchUserGroups, getAuthHeader } from '../../api/parking-lot/api';
import './index.css'
const { Option } = Select;
const resources = ['car', 'parkingSpot', 'parkingLot', 'user', 'userGroup', 'parkingRequest', 'payment'];
const actions = ['create', 'read', 'update', 'delete'];
const actionColors = {
    create: 'green',
    read: 'blue',
    update: 'orange',
    delete: 'red',
};
const renderPermissionsTable = (permissions) => {
    const columns = [
        {
            title: 'Resource',
            dataIndex: 'resource',
            key: 'resource',
            render: (text) => <strong style={{ textTransform: 'capitalize' }}>{text}</strong>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (actions) => (
                <>
                    {actions.map((action) => (
                        <Tag key={action} color={actionColors[action]}>
                            {action}
                        </Tag>
                    ))}
                </>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={permissions.map((perm, idx) => ({ ...perm, key: idx }))}
            pagination={false}
            size="small"
            bordered
        />
    );
};
const UserGroupCreate = () => {
    const [loading, setLoading] = useState(false);
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        const loadUserGroups = async () => {
            setLoading(true);
            try {
                const res = await fetchUserGroups();
                setUserGroups(res.data); // giả sử API trả về { success: true, data: [...] }
            } catch (error) {
                console.error('Error fetching user groups:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserGroups();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        const formattedPermissions = values.permissions.map((item) => {
            const [resource, action] = item.split(':');
            return { resource, action };
        });

        const grouped = Object.groupBy(formattedPermissions, p => p.resource); // Requires Node 20+
        const permissions = Object.entries(grouped).map(([resource, list]) => ({
            resource,
            actions: list.map(l => l.action),
        }));

        try {
            await axios.post('http://localhost:5000/api/user-groups', {
                name: values.name,
                description: values.description,
                isActive: values.isActive,
                permissions
            }, {
                headers: getAuthHeader(),
            });
            message.success('User group created successfully!');
        } catch (error) {
            console.error(error);
            message.error('Failed to create user group.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <h2>User Permission</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Group Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Permissions" name="permissions" rules={[{ required: true }]}>
                    <Select mode="multiple" placeholder="Select permissions">
                        {resources.map(resource =>
                            actions.map(action => (
                                <Option key={`${resource}:${action}`} value={`${resource}:${action}`}>
                                    {`${resource} - ${action}`}
                                </Option>
                            ))
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label="Active" name="isActive" valuePropName="checked" initialValue={true}>
                    <Checkbox>Active</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create User Group
                    </Button>
                </Form.Item>
            </Form>


            <Table
                columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Active', dataIndex: 'isActive', key: 'isActive', render: (val) => (val ? 'Yes' : 'No') },
                ]}
                dataSource={userGroups.map((group, idx) => ({ ...group, key: idx }))}
                expandable={{
                    expandedRowRender: (record) => renderPermissionsTable(record.permissions),
                    rowExpandable: (record) => record.permissions && record.permissions.length > 0,
                }}
                rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
            />

        </>
    );
};

export default UserGroupCreate;
