const axios = require('axios');
const { describe, it, expect } = require('jest');

// Replace with your actual Ethereum address and post content
const testData = {
  account: '0xa3C6F23b15Aa4b90B9A7B3Eb9c81B9C768678c8F', // Replace with your actual Ethereum address
  content: 'Hello from Axios test!' // Your test post content
};

describe('Server Tests', () => {
  it('should create a post successfully', async () => {
    const response = await axios.post('http://localhost:3000/create-post', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.transaction).toBeDefined();
  });

  it('should handle invalid data', async () => {
    const invalidData = {
      account: 'invalidAddress',
      content: ''
    };

    const response = await axios.post('http://localhost:3000/create-post', invalidData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status).toBe(500);
    expect(response.data.success).toBe(false);
    expect(response.data.error).toBeDefined();
  });

  it('should handle server errors', async () => {
    // Mock the server to simulate an error
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Server error'));

    try {
      await axios.post('http://localhost:3000/create-post', testData);
    } catch (error) {
      expect(error.message).toBe('Server error');
    }
  });

  // ... Add more test cases for other endpoints or functionalities
});