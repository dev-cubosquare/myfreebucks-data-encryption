const crypto = require('crypto');

class MyFreeBucks {
  constructor(key, client_id) {
    this.key = key;
    this.client_id = client_id;
    this.url = 'https://www.offside.myfreebucks.com/sso?data=';
  }

  getLoginLink(data) {
    const vi = crypto.randomBytes(16);

    // Get Timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Generate HMAC Signature
    const signature = crypto.createHmac('sha256', this.key).update(timestamp.toString()).digest('hex');

    // Serialize and Encrypt Data
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.key), vi);
    let encrypted_data = cipher.update(JSON.stringify(data), 'utf-8', 'base64');
    encrypted_data += cipher.final('base64');

    // Base64 encode the encrypted data, client ID, IV, timestamp, and HMAC signature separately.
    const encoded_data = Buffer.from(encrypted_data).toString('base64');
    const encoded_client_id = Buffer.from(this.client_id).toString('base64');
    const encoded_vi = vi.toString('base64');
    const encoded_timestamp = Buffer.from(timestamp.toString()).toString('base64');
    const encoded_signature = Buffer.from(signature).toString('base64');

    // Concatenate Encrypted Components with a colon (:)
    const concatenated_data = `${encoded_data}:${encoded_client_id}:${encoded_vi}:${encoded_timestamp}:${encoded_signature}`;

    // Base64 encode the concatenated string
    const final_encoded_data = Buffer.from(concatenated_data).toString('base64');

    // Generate Login Link
    return `${this.url}${final_encoded_data}`;
  }
}

module.exports = MyFreeBucks;