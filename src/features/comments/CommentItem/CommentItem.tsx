import React, { useContext, useState } from 'react';
import { Button, Form, Input, Popconfirm, message } from 'antd';
import { CardContext } from '@/context/Context';
import { CardContextType, Comments as CommentType } from '@/shared/types/interface';
import styles from '../index.module.scss';

interface CommentItemProps {
  comment: CommentType & { replies?: CommentType[] };
  onReply: (data: Pick<CommentType, 'userName' | 'userComment'>, parent_id: number) => void;
  onEdit: (commentId: number, values: { userComment: string }) => void;
  onDelete: (commentId: number) => void;
  user: {
    login: string;
    id: number;
    role: string;
  } | null;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply, onEdit, onDelete, user }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyForm] = Form.useForm();
  const { formatDate } = useContext(CardContext) as CardContextType;

  const isAuthor = comment.user_id === user?.id;
  const isAdmin = user?.role === 'admin';
  const canEdit = isAuthor;
  const canDelete = isAuthor || isAdmin;

  const handleReplySubmit = (values: { userComment: string }) => {
    if (!user) {
      message.warning('Войдите в аккаунт, чтобы ответить');
      return;
    }
    onReply({ userName: user.login, userComment: values.userComment }, comment.id);
    setIsReplying(false);
    replyForm.resetFields();
  };

  return (
    <div className={styles.CommentsBlock}>
      <h3>Имя: {comment.userName}</h3>
      <p>Дата: {formatDate(comment.date)}</p>

      {isEditing ? (
        <Form
          className={styles.CommentsForm}
          initialValues={{ userComment: comment.userComment ?? '' }}
          onFinish={values => {
            onEdit(comment.id, values);
            setIsEditing(false);
          }}
        >
          <Form.Item name="userComment" className={styles.CommentsFormItem}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} style={{ resize: 'none' }} />
          </Form.Item>
          <div className={styles.BtnWrapper}>
            <Button size="small" type="primary" htmlType="submit">
              Сохранить
            </Button>
            <Button size="small" onClick={() => setIsEditing(false)}>
              Отмена
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <p key="comment-text">Комментарий: {comment.userComment}</p>
          {(canEdit || canDelete || user) && (
            <div className={styles.CommentActions}>
              <Button size="small" onClick={() => setIsReplying(true)}>
                Ответить
              </Button>
              {canEdit && (
                <Button size="small" onClick={() => setIsEditing(true)}>
                  Редактировать
                </Button>
              )}
              {canDelete && (
                <Popconfirm
                  title="Удалить комментарий?"
                  onConfirm={() => onDelete(comment.id)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button size="small" danger>
                    Удалить
                  </Button>
                </Popconfirm>
              )}
            </div>
          )}
        </>
      )}

      {/* Форма ответа */}
      {isReplying && (
        <Form className={styles.CommentsForm} form={replyForm} onFinish={handleReplySubmit}>
          <Form.Item
            name="userComment"
            rules={[{ required: true }]}
            className={styles.CommentsFormItem}
          >
            <Input.TextArea
              placeholder="Ваш ответ"
              autoSize={{ minRows: 3, maxRows: 10 }}
              style={{ resize: 'none' }}
            />
          </Form.Item>
          <div className={styles.BtnWrapper}>
            <Button type="primary" htmlType="submit" size="small">
              Отправить
            </Button>

            <Button size="small" onClick={() => setIsReplying(false)}>
              Отмена
            </Button>
          </div>
        </Form>
      )}

      {/* Рекурсивный рендер ответов */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.Comments}>
          {comment.replies.map(reply => (
            <CommentItem
              key={`reply-${reply.id}`}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
