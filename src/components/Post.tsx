import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author {
	avatarUrl: string;
	name: string;
	role: string;
}

interface Content {
	type: 'paragraph' | 'link';
	content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  hashtags: string[];
  publishedAt: Date;
}

export function Post({ author, content, hashtags, publishedAt }: PostProps) {
  const [comments, setComments] = useState<string[]>([]);

  const [newCommentText, setNewCommentText] = useState('');


  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
		locale: ptBR,
	});

	const relativePublishedDate = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	})

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");  
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Por favor, digite um comentário");
  }

  function deleteComment(commentId: number) {
    const commentsWithoutDeleted = comments.filter((comment, index) => {
      return index !== commentId;
    });

    setComments(commentsWithoutDeleted);
  }
	
  const isNewCommentEmpty = newCommentText.trim().length === 0;

	return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {relativePublishedDate}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
					if (line.type === 'paragraph') {
						return <p key={line.content}>{line.content}</p>
					} else if (line.type === 'link') {
						return <p key={line.content}><a href='#' >{line.content}</a></p>
					}
				})}
        <p>
          {hashtags.map(hashtag => {
					  return <a href="#" key={hashtag}>{hashtag + " "}</a>
				  })}
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu Feedback</strong>

        <textarea 
          name="input"
          placeholder='Deixe seu comentário...'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty} >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return (
            <Comment 
            key={index} 
            id={index}
            content={comment} 
            onDeleteComment={deleteComment}/>
          )
        })}
      </div>
    </article>
  );
}
