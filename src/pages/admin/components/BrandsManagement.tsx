import { Button, Form, Input, message, Popconfirm, Table } from 'antd';
import { useAddBrandMutation, useDeleteBrandMutation, useGetBrandsQuery } from '@/store/brandsAPI';
import styles from '../index.module.scss';

interface BrandsManagementProps {
  onRefetch: () => void;
}

const BrandsManagement: React.FC<BrandsManagementProps> = ({ onRefetch }) => {
  const { data: brands = [], refetch } = useGetBrandsQuery();
  const [addBrand] = useAddBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [form] = Form.useForm();

  const handleAddBrand = async (values: { name: string }) => {
    try {
      await addBrand(values.name).unwrap();
      message.success('Бренд добавлен');
      refetch();
      onRefetch();

      form.resetFields();
    } catch {
      message.error('Не удалось добавить бренд');
    }
  };

  const handleDeleteBrand = async (name: string) => {
    try {
      await deleteBrand(name).unwrap();
      message.success('Бренд удалён');
      refetch();
      onRefetch();
    } catch {
      message.error('Не удалось удалить бренд');
    }
  };

  const brandColumns = [
    { title: 'Бренд', dataIndex: 'name', key: 'name' },
    {
      title: 'Действия',
      render: (_: any, record: { name: string }) => (
        <Popconfirm
          title={`Удалить бренд "${record.name}"?`}
          onConfirm={() => handleDeleteBrand(record.name)}
          okText="Да"
          cancelText="Нет"
        >
          <Button danger size="small">
            Удалить
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Form form={form} layout="inline" onFinish={handleAddBrand}>
        <Form.Item name="name" rules={[{ required: true, message: 'Введите бренд' }]}>
          <Input placeholder="Название бренда" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form>

      <Table
        dataSource={brands.map(name => ({ name }))}
        columns={brandColumns}
        rowKey="name"
        style={{ marginTop: 24 }}
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
          className: styles.pagination,
        }}
      />
    </>
  );
};

export default BrandsManagement;
