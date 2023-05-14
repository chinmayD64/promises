const user = {
    name: "John Doe",
    lastActivityTime: null
  };
  
  // define the posts array
  const posts = [];
  
  // define the createPost function
  function createPost() {
    return new Promise((resolve) => {
      const post = { id: posts.length + 1, content: `Post ${posts.length + 1}` };
      posts.push(post);
      resolve(post);
    });
  }
  
  // define the updateLastUserActivityTime function
  function updateLastUserActivityTime(user, posts, createPost, updateLastUserActivityTime, deletePost) {
    const newPost = createPost();
    const newPost1 = createPost();
    const newPost2 = createPost();
    const newPost3 = createPost();
  
    const updateUserPromise = new Promise((resolve) => {
      setTimeout(() => {
        user.lastActivityTime = new Date();
        resolve();
      }, 1000);
    });
  
    Promise.all([newPost,newPost1,newPost2,newPost3, updateUserPromise])
      .then(() => {
  
        console.log(`All posts: ${JSON.stringify(posts)}`);
        console.log(`Last activity time of ${user.name}: ${user.lastActivityTime}`);
  
        const lastPost = posts[posts.length - 1];
        deletePost(lastPost.id)
          .then(() => {
  
            console.log(`Updated posts: ${JSON.stringify(posts)}`);
          })
          .catch((error) => {
            console.log(`Failed to delete post: ${error}`);
          });
      })
      .catch((error) => {
        console.log(`Failed to create post or update user: ${error}`);
      });
  }
  
  // define the deletePost function
  function deletePost(postId) {
    return new Promise((resolve, reject) => {
      const index = posts.findIndex((post) => post.id === 1);
      if (index !== -1) {
        posts.splice(index, 1);
        resolve();
      } else {
        reject(`Post with ID ${postId} not found`);
      }
    });
  }
  
  updateLastUserActivityTime(user, posts, createPost, updateLastUserActivityTime, deletePost);
  