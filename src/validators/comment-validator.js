import constants from "../constants";

function validateComment(commentStr) {
  if (commentStr.trim() === "")
    return {valid: false, msg: "Comment cannot be empty!"};
  
  if (commentStr.trim().length > constants.COMMENT_MAX_LENGTH) {
    const msg = `Comment must be less than ${constants.COMMENT_MAX_LENGTH} characters!`;

    return {valid: false, msg: msg};
  }

  return {valid: true};
}

export default validateComment;