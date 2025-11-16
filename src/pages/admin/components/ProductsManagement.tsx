import { Button, Form, Input, message, Popconfirm, Select, Table } from 'antd';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/store/productApi';
import { useGetBrandsQuery } from '@/store/brandsAPI';
import { Product } from '@/shared/types/interface';
import styles from '../index.module.scss';
import { Link } from 'react-router-dom';

interface ProductsManagementProps {
  onRefetch: () => void;
}

const ProductsManagement: React.FC<ProductsManagementProps> = ({ onRefetch }) => {
  const [form] = Form.useForm();
  const { data: products = [], refetch } = useGetProductsQuery('');
  const { data: brands = [] } = useGetBrandsQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleFinish = async (values: Omit<Product, 'id'>) => {
    try {
      const payload: Product = {
        ...values,
        id: `admin_${Date.now()}`,
        price: Number(values.price) || 0,
        rating: Number(values.rating) || 1,
        quantity: Number(values.quantity) || 1,
      };
      await createProduct(payload).unwrap();
      message.success('Товар добавлен!');
      form.resetFields();
      refetch();
      onRefetch();
    } catch (err) {
      message.error('Ошибка добавления товара');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      message.success('Товар удалён');
      refetch();
      onRefetch();
    } catch {
      message.error('Не удалось удалить товар');
    }
  };

  const productColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Название',
      key: 'title',
      render: (_: any, record: Product) => (
        <Link to={`/card/${record.id}`} className={styles.ProductLink}>
          {record.title}
        </Link>
      ),
    },
    { title: 'Бренд', dataIndex: 'brand', key: 'brand' },
    { title: 'Цена', dataIndex: 'price', key: 'price' },
    {
      title: 'Действия',
      render: (_: any, record: Product) => (
        <Popconfirm
          title={`Удалить "${record.title}"?`}
          onConfirm={() => handleDeleteProduct(record.id)}
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
      <Form
        className={styles.Form}
        layout="vertical"
        onFinish={handleFinish}
        form={form}
        initialValues={{ rating: 1, quantity: 1 }}
      >
        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input placeholder="Название товара" />
        </Form.Item>
        <Form.Item name="brand" label="Бренд" rules={[{ required: true }]}>
          <Select
            placeholder="Выберите бренд"
            options={brands.map(brand => ({ label: brand, value: brand }))}
          />
        </Form.Item>
        <Form.Item name="category" label="Категория" rules={[{ required: true }]}>
          <Select
            placeholder="Выберите категорию"
            options={[
              { label: 'Смартфон', value: 'phone' },
              { label: 'Смартчасы', value: 'smartwatch' },
              { label: 'Наушники', value: 'airpod' },
            ]}
          />
        </Form.Item>
        <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
          <Input type="number" placeholder="Цена в рублях" />
        </Form.Item>
        <Form.Item name="quantity" label="Количество" rules={[{ required: true }]}>
          <Input type="number" placeholder="Количество на складе" />
        </Form.Item>
        <Form.Item name="memory" label="Память">
          <Input placeholder="Например: 256" />
        </Form.Item>
        <Form.Item name="accum" label="Аккумулятор">
          <Input placeholder="Например: 5000" />
        </Form.Item>
        <Form.Item name="photo" label="Фото (URL)">
          <Input placeholder="/public/photo.webp" />
        </Form.Item>
        <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
          <Input.TextArea rows={4} placeholder="Описание товара" />
        </Form.Item>
        <Form.Item name="rating" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Добавить товар
        </Button>
      </Form>

      <Table
        dataSource={products}
        columns={productColumns}
        rowKey="id"
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

export default ProductsManagement;
