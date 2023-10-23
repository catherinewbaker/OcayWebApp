import AWS from 'aws-sdk';

AWS.config.update({
    //accessKeyId: process.env.REACT_APP_AWS_ACCESS,
    //secretAccessKey: process.env.REACT_APP_AWS_SECRET,
    accessKeyId: "",
    secretAccessKey: "",
    region: 'us-east-1' // Update with your desired region
});

export default AWS
