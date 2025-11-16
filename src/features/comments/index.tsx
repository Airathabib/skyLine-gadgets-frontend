import React, { useContext, useEffect } from 'react';
import {
  useGetCommentsQuery,
  useAddCommentsMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '@/store/commentsApi';
import { Button, Form, Input, message } from 'antd';
import { CardContext } from '@/context/Context';
import { CardContextType, CreateCommentDto } from '@/shared/types/interface';
import { useAppSelector } from '@/hooks/reduxHooks';
import CommentItem from './CommentItem/CommentItem';

import styles from './index.module.scss';

const Comments: React.FC<{ productId: string }> = ({ productId }: { productId: string }) => {
  const { setIsFormValid, isTouched } = useContext(CardContext) as CardContextType;
  const { user } = useAppSelector(state => state.users);
  const [form] = Form.useForm();

  const { data: comments = [], error, isLoading } = useGetCommentsQuery(productId);
  const [addComments] = useAddCommentsMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const validateForm = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    if (isTouched) {
      validateForm();
    }
  }, [isTouched]);

  const handleAdd = (values: Pick<CreateCommentDto, 'userComment'>) => {
    if (!user) {
      message.warning('Войдите в аккаунт, чтобы оставить комментарий');
      return;
    }

    const date = new Date().toLocaleString();
    addComments({
      userName: user.login,
      userComment: values.userComment,
      date,
      productId,
      userId: user.id,
    })
      .unwrap()
      .then(() => {
        form.resetFields(); 
        message.success('Комментарий добавлен');
      })
      .catch(() => {
        message.error('Не удалось добавить комментарий');
      });
  };

  const handleEdit = (commentId: number, values: { userComment: string }) => {
    updateComment({ id: commentId, userComment: values.userComment });
  };

  const handleReply = (
    data: Pick<CreateCommentDto, 'userName' | 'userComment'>,
    parentId: number
  ) => {
    if (!user) return;
    const date = new Date().toLocaleString();
    addComments({
      ...data,
      date,
      productId,
      userId: user.id,
      parentId,
    });
  };

  const handleDelete = (comment_id: number) => {
    deleteComment(comment_id)
      .unwrap()
      .then(() => {
        message.success('Комментарий удалён');
      })
      .catch(() => {
        message.error('Не удалось удалить комментарий');
      });
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  if (error) return <h1>Ошибка загрузки комментариев...</h1>;

  return (
    <div className={styles.Comments}>
      <h2 className={styles.CommentsTitle}>Комментарии</h2>

      {/* Форма добавления корневого комментария */}
      {user && (
        <Form
          onFinish={handleAdd}
          form={form}
          className={styles.CommentsForm}
          onValuesChange={() => isTouched && validateForm()}
        >
          <Form.Item
            className={styles.CommentsFormItem}
            name="userComment"
            rules={[{ required: true, message: 'Введите комментарий' }]}
          >
            <Input.TextArea
              placeholder="Комментарий"
              autoSize={{ minRows: 3, maxRows: 10 }}
              style={{ resize: 'none' }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className={styles.CommentsButton}>
            Добавить
          </Button>
        </Form>
      )}

      <div className={styles.CommentsWrapper}>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
