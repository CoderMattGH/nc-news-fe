import axios from 'axios';
import {useState, useRef, useEffect, useContext} from 'react';

import constants from '../../../constants';

import CommentCard from './CommentCard';
import PostComment from './PostComment';
import Loading from '../../Loading';

import {UserContext} from '../../../contexts/User';

import './index.css';

function Comments({article}) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {user} = useContext(UserContext);

  const abortController = useRef(null);
  const currentReqCount = useRef(0);

  useEffect(() => {
    console.log("Mounting Comments Component!");

    setComments([]);

    abortController.current = new AbortController();

    fetchPopulateComments(article.article_id, abortController.current);

    return () => {
      abortController.current.abort();
    };
  }, []);

  const fetchPopulateComments = (articleId, abortController) => {
    console.log("Fetching comments!");

    currentReqCount.current++;
    setIsLoading(true);

    const url = `${constants.ARTICLES_API_URL}/${articleId}/comments`;

    const axOptions = {
      signal: abortController.signal
    };

    axios.get(url, axOptions)
        .then(({data}) => {
          console.log("Successfully fetched comments!");

          setComments(data.comments)
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR: Unable to fetch comments!");
        })
        .finally(() => {
          currentReqCount.current--;

          if(!currentReqCount.current)
            setIsLoading(false);
        });
  };

  let commentsBody;
  if (!article.comment_count) {
    commentsBody = (<p className="no-comments-msg">This article does not contain any comments</p>);
  } else {
    commentsBody = comments.map((comment) => {
      return (
        <CommentCard 
          comment={comment} key={comment.comment_id} setComments={setComments} 
        />
      );
    });
  }

  return (
    <>
      <h3 className="article-comments__comments_title">Comments ({article.comment_count})</h3>
      {isLoading ?  
          <Loading size={'small'} />
        :
          <>
            {user ?
                <PostComment articleId={article.article_id} setComments={setComments} />
              :
                null
            }

            {commentsBody}
          </>
      }
    </>
  );
};

export default Comments;