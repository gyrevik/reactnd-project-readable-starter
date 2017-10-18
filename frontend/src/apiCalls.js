const url = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
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
