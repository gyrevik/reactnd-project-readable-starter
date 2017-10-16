
const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
      
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

//DELETE /posts/:id
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  }).then(res => res.json())

// DELETE /comments/:id
export const deleteComment = (id) =>
fetch(`${api}/comments/${id}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(id)
}).then(res => res.json())

// POST /posts/:id	Used for voting on a post.	option - [String]: Either "upVote" or "downVote"
export const votePost = (id, option) => {
  console.log(`in apiCalls.votePost(${id}, ${option})`);
  const params = JSON.stringify({ option: option });

  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: params,
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API votePost error: ', error);
    })
}

// POST /comments/:id	Used for voting on a comment. option - [String]: Either "upVote" or "downVote"
export const voteComment = (id, option) => {
  console.log(`in apiCalls.voteComment(${id}, ${option})`);
  const params = JSON.stringify({ option: option });
  
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: params,
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API voteComment error: ', error);
    })
}

// PUT /comments/:id	Edit the details of an existing comment.	
// timestamp - timestamp. Get this however you want. 
// body - [String]
export const putComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API putComment error: ', error);
    })

export const postComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API postComment error: ', error);
    })

export const postPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API postPost error: ', error);
    })

// PUT /posts/:id	Edit the details of an existing post.	title - [String] 
// body - [String]
export const putPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API putPost error: ', error);
    })
