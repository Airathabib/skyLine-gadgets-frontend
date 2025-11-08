import { Button, message, Popconfirm, Table } from 'antd';
import { useDeleteUserMutation, useGetUsersQuery } from '@/store/usersApi';
import { UserType } from '@/shared/types/interface';

interface UsersManagementProps {
  onRefetch: () => void;
}

const UsersManagement: React.FC<UsersManagementProps> = ({ onRefetch }) => {
  const { data: users = [], refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: number, role: string) => {
    if (role === 'admin') {
      message.warning('Нельзя удалить админа');
      return;
    }
    try {
      await deleteUser(id).unwrap();
      message.success('Пользователь удалён');
      refetch();
      onRefetch();
    } catch {
      message.error('Не удалось удалить пользователя');
    }
  };

  const userColumns = [
    { title: 'Логин', dataIndex: 'login', key: 'login' },
    { title: 'Роль', dataIndex: 'role', key: 'role' },
    {
      title: 'Действия',
      render: (_: any, record: UserType) => (
        <Popconfirm
          title={`Удалить "${record.login}"?`}
          onConfirm={() => handleDeleteUser(record.id, record.role)}
          okText="Да"
          cancelText="Нет"
          disabled={record.role === 'admin'}
        >
          <Button danger size="small" disabled={record.role === 'admin'}>
            Удалить
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={userColumns}
      rowKey="id"
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
    />
  );
};

export default UsersManagement;
