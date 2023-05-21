const user = {
    name: "John Doe",
    lastActivityTime: null
  };
  
  const posts = [];
  
  function createPost() {
    return new Promise((resolve) => {
      const post = { id: posts.length + 1, content: `Post ${posts.length + 1}` };
      posts.push(post);
      resolve(post);
    });
  }
  
  async function updateLastUserActivityTime(user, posts, createPost, updateLastUserActivityTime, deletePost) {
    try {
      const newPost = await createPost();
      const newPost1 = await createPost();
      const newPost2 = await createPost();
      const newPost3 = await createPost();
  
      await new Promise((resolve) => {
        setTimeout(() => {
          user.lastActivityTime = new Date();
          resolve();
        }, 1000);
      });
  
      console.log(`All posts: ${JSON.stringify(posts)}`);
      console.log(`Last activity time of ${user.name}: ${user.lastActivityTime}`);
  
      const lastPost = posts[posts.length - 1];
      try {
        await deletePost(lastPost.id);
        console.log(`Updated posts: ${JSON.stringify(posts)}`);
      } catch (error) {
        console.log(`Failed to delete post: ${error}`);
      }
    } catch (error) {
      console.log(`Failed to create post or update user: ${error}`);
    }
  }
  
  function deletePost(postId) {
    return new Promise((resolve, reject) => {
      const index = posts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        posts.splice(index, 1);
        resolve();
      } else {
        reject(`Post with ID ${postId} not found`);
      }
    });
  }
  
  updateLastUserActivityTime(user, posts, createPost, updateLastUserActivityTime, deletePost);
  