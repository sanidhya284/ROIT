import AWS from 'aws-sdk';
import { uploadToIPFS } from './ipfs';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1'
});

export const uploadToS3 = async (file) => {
  const params = {
    Bucket: 'your-s3-bucket-name',
    Key: `uploads/${file.name}`,
    Body: file,
    ContentType: file.type
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading file to S3: ', error);
    throw error; // Re-throw the error for proper handling in calling functions
  }
};

export const uploadHybrid = async (file) => {
  try {
    const ipfsLink = await uploadToIPFS(file);
    const s3Link = await uploadToS3(file);

    return { ipfsLink, s3Link };
  } catch (error) {
    console.error('Error uploading file to hybrid storage: ', error);
    throw error; // Re-throw the error for proper handling in calling functions
  }
};