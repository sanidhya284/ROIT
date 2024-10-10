const axios = require('axios');

// Replace with your actual Ethereum address and post content
const testData = {
  account: '0x6C094063Dc967d49D86a8A5a52051326B3fEccBE', // Replace with your actual Ethereum address
  content: 'Hello from Axios test!' // Your test post content
};

async function createPost() {
  try {
    const response = await axios.post('http://localhost:3000/create-post', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Post created successfully:', response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error creating post:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
  }
}

// Run the test
createPost();
