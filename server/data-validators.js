import validator from 'validator'

const validateComment = (req, res, next)=>{
  res.locals.errors = []
  let commentInput = req.body.newComment

  if(commentInput.length < 1 || commentInput.length > 30){
    res.locals.errors.push({
        "field": "commentInput",
        "message": "Your comment should not be empty and be no longer than 30 characters"
    })
  }
  next()
}

export default validateComment;