import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';

const NotePage = props => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = `Note ID ${noteId} by ${String(authorUsername).replace(/^\w/, (c) => c.toUpperCase()) } — Notedly`;
  });

  // Сохраняем id из url в виде переменной
  const id = props.match.params.id;

  // Запрашиваем хук, передавая значение id в качестве переменной
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  // Если данные загружаются, отображаем сообщение о загрузке
  if (loading) return <p>Loading...</p>;

  // Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if (error) return <p>Error! Note not found</p>;

  let authorUsername;
  let noteId;
  if (data) {
    authorUsername = data.note.author.username;
    noteId = data.note.id;
  }

  // Если загрузка данных произошла успешно, отображаем их в UI
  return <Note note={data.note} />;
};

export default NotePage;
