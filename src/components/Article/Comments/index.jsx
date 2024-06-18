import axios from 'axios';
import {useState, useRef, useEffect} from 'react';

import constants from '../../../constants';

import CommentCard from './CommentCard';

import './index.css';

function Comments({article}) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortController = useRef(null);
  const currentReqCount = useRef(0);

  // On component mount
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

    const url = `${constants.ARTICLE_BASE_API_URL}${articleId}/comments`;

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

  let commentsBody = (
    comments.map((comment) => {
      return (
        <CommentCard comment={comment} key={comment.comment_id}/>
      );
    })
  );

  return (
    <>
      <h3 className="article-comments__comments_title">Comments ({article.comment_count})</h3>
      {(!article.comment_count) ? 
          <p className="no-comments-msg">This article does not contain any comments</p>
        :
          commentsBody
      }
    </>
  );
};

export default Comments;