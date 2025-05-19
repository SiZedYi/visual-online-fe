import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select, message, Table, Tag } from 'antd';
import axios from 'axios';
import { fetchUserGroups, fetchUsers, getAuthHeader } from '../../api/parking-lot/api';
import './index.css';

const { Option } = Select;
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

const UserCreate = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [userGroupOptions, setUserGroupOptions] = useState([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [usersRes, groupsRes] = await Promise.all([
                fetchUsers(),
                fetchUserGroups()
            ]);

            const fetchedUsers = usersRes.data;
            const fetchedGroups = groupsRes.data;

            setUsers(fetchedUsers);

            const groupOptions = fetchedGroups.map(group => ({
                id: group._id,
                name: group.name
            }));

            setUserGroupOptions(groupOptions);
        } catch (error) {
            console.error("Error fetching users or groups:", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadData();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post(
                'http://localhost:5000/api/auth/create-user',
                {
                    username: values.username,
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                    phoneNumber: values.phoneNumber,
                    address: values.address,
                    apartmentNumber: values.apartmentNumber,
                    isActive: values.isActive,
                    userGroups: values.userGroups,
                },
                { headers: getAuthHeader() }
            );
            message.success('User created successfully!');
            loadData();

        } catch (error) {
            console.error(error);
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>User Management</h2>
            <Form layout="vertical" onFinish={onFinish} >
                <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Phone Number" name="phoneNumber">
                    <Input />
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <Input />
                </Form.Item>
                <Form.Item label="Apartment Number" name="apartmentNumber">
                    <Input />
                </Form.Item>
                <Form.Item label="Active" name="isActive" valuePropName="checked" initialValue={true}>
                    <Checkbox>Active</Checkbox>
                </Form.Item>
                <Form.Item label="User Groups" name="userGroups">
                    <Select mode="multiple" placeholder="Select user groups">
                        {userGroupOptions.map((group) => (
                            <Option key={group.id} value={group.id}>
                                {group.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create User
                    </Button>
                </Form.Item>
            </Form>

            <Table
                columns={[
                    { title: 'Username', dataIndex: 'username', key: 'username' },
                    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                    { title: 'Active', dataIndex: 'isActive', key: 'isActive', render: (val) => (val ? 'Yes' : 'No') },
                ]}
                dataSource={users.map((user, idx) => ({ ...user, key: idx }))}
                expandable={{
                    expandedRowRender: (record) => (
                        <>
                            <p><strong>Phone:</strong> {record.phoneNumber}</p>
                            <p><strong>Address:</strong> {record.address}</p>
                            <p><strong>Apartment:</strong> {record.apartmentNumber}</p>
                            <p><strong>User Groups:</strong></p>
                            {record.userGroups && record.userGroups.length > 0 ? (
                                record.userGroups.map((group) => (
                                    <div key={group._id} style={{ marginBottom: '10px' }}>
                                        <strong>{group.name}</strong>
                                        {renderPermissionsTable(group.permissions)}
                                    </div>
                                ))
                            ) : (
                                <p>No user groups assigned.</p>
                            )}
                        </>
                    ),
                    rowExpandable: (record) => true,
                }}
                rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
            />
        </>
    );
};

export default UserCreate;
