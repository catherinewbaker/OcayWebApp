import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1' // Update with your desired region
});

export default AWS
