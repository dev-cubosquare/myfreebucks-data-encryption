```js
// Import
const MyFeebucks = require('./myfreebucks');

// API Key and Client ID
const api_key = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
const client_id = '50';

// Data Preparation
const data = {
    'id': '500'
};

// Create Instance
const freebucks = new MyFeebucks(api_key, client_id);

// Get Login Link
const login_link = freebucks.getLoginLink(data);
```