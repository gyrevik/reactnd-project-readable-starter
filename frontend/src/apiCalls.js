
const url = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
      
export const getPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

// DELETE /comments/:id
export const deleteComment = (id) =>
fetch(`${url}/comments/${id}`, {
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

  return fetch(`${url}/posts/${id}`, {
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

// PUT /comments/:id	Edit the details of an existing comment.	
// timestamp - timestamp. Get this however you want. 
// body - [String]
export const putComment = (comment) =>
  fetch(`${url}/comments/${comment.id}`, {
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
  fetch(`${url}/comments`, {
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
  fetch(`${url}/posts`, {
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
  fetch(`${url}/posts/${post.id}`, {
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
