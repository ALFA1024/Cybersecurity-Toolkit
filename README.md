# Cybersecurity Toolkit

A comprehensive web-based security toolkit with various cryptographic and security utilities.

## Features

### Client-Side Tools (HTML/CSS/JavaScript)
- **Password Strength Checker** - Evaluate password security with real-time feedback
- **Password Generator** - Create strong, customizable passwords
- **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **URL Encoder/Decoder** - Encode and decode URL parameters
- **Cipher Tools** - Caesar Cipher, ROT13, and Atbash Cipher encoding/decoding

### Server-Side Services (Java/Spring Boot)
- RESTful API for cryptographic operations
- Hash generation using multiple algorithms
- Password generation and strength checking
- Base64 and URL encoding/decoding
- Secure random password generation

## Project Structure

```
cybersecurity-toolkit/
├── public/
│   ├── index.html          # Main application interface
│   ├── style.css           # Styling
│   └── script.js           # Client-side logic
├── src/
│   └── main/
│       ├── java/
│       │   └── com/security/
│       │       ├── CybersecurityToolkitApplication.java
│       │       ├── controller/
│       │       │   └── SecurityController.java
│       │       ├── service/
│       │       │   └── SecurityService.java
│       │       └── dto/
│       │           ├── HashRequest.java
│       │           └── HashResponse.java
│       └── resources/
│           └── application.properties
├── pom.xml                 # Maven configuration
└── README.md              # This file
```

## Technologies Used

### Frontend
- HTML5
- CSS3 (with modern gradients and animations)
- Vanilla JavaScript (ES6+)

### Backend
- Java 11
- Spring Boot 2.7.14
- Apache Commons Codec
- Bouncy Castle (for advanced cryptography)

## Installation & Setup

### Prerequisites
- Java 11 or higher
- Maven 3.6+
- Modern web browser

### Setup Instructions

1. **Clone or extract the project:**
   ```bash
   cd cybersecurity-toolkit
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application:**
   - Frontend: `http://localhost:8080` (serve static files via Spring Boot)
   - API: `http://localhost:8080/api/security`

## API Endpoints

### Health Check
```
GET /api/security/health
```

### Hash Generation
```
POST /api/security/hash
Content-Type: application/json

{
  "text": "text to hash",
  "algorithms": ["MD5", "SHA-256", "SHA-512"]
}
```

### Password Generation
```
POST /api/security/generate-password?length=16&uppercase=true&lowercase=true&numbers=true&symbols=true
```

### Password Strength Check
```
POST /api/security/check-password-strength?password=SecurePass123!
```

### Base64 Operations
```
POST /api/security/base64/encode?text=hello
POST /api/security/base64/decode?text=aGVsbG8=
```

### URL Operations
```
POST /api/security/url/encode?text=hello world
POST /api/security/url/decode?text=hello%20world
```

## Usage Examples

### Checking Password Strength
1. Navigate to "Password Checker" tab
2. Type your password
3. View real-time strength indicator and suggestions

### Generating Strong Password
1. Go to "Password Generator" tab
2. Set desired length (8-128 characters)
3. Select character types (uppercase, lowercase, numbers, symbols)
4. Click "Generate Password"
5. Copy the generated password

### Hash Text
1. Switch to "Hash Generator" tab
2. Enter text to hash
3. Select which algorithms to use
4. View the generated hashes

### Encode/Decode
- **Base64**: Use "Base64 Encoder" to encode/decode
- **URL**: Use "URL Encoder" to encode/decode parameters
- **Ciphers**: Use "Cipher Tools" for Caesar, ROT13, or Atbash ciphers

## Security Considerations

⚠️ **Important**: This toolkit is for **educational purposes only**.

- Do not transmit sensitive data over unencrypted connections
- Use HTTPS in production environments
- Do not rely on client-side security operations for critical data
- Always use server-side validation and encryption for sensitive operations
- Consider rate limiting for API endpoints in production
- Implement proper authentication and authorization

## Password Strength Criteria

A secure password should have:
- ✓ At least 8 characters (preferably 12+)
- ✓ Mix of uppercase letters (A-Z)
- ✓ Mix of lowercase letters (a-z)
- ✓ Numbers (0-9)
- ✓ Special characters (!@#$%^&*)
- ✗ No repeated characters
- ✗ No keyboard patterns
- ✗ No dictionary words

## Supported Hash Algorithms

- **MD5** - 128-bit hash (legacy, not recommended for security)
- **SHA-1** - 160-bit hash (deprecated for most uses)
- **SHA-256** - 256-bit hash (recommended)
- **SHA-512** - 512-bit hash (recommended)

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Running Tests
```bash
mvn test
```

### Building Production JAR
```bash
mvn clean package
```

## Future Enhancements

- [ ] AES encryption/decryption
- [ ] RSA key generation and encryption
- [ ] HMAC generation
- [ ] JWT token creation and validation
- [ ] 2FA code generation (TOTP/HOTP)
- [ ] File hashing
- [ ] Bulk operations
- [ ] API key management dashboard
- [ ] Password strength checker with breach database integration
- [ ] QR code generator/scanner

## License

This project is provided for educational purposes.

## Disclaimer

This toolkit is provided "as-is" without warranty. While efforts have been made to ensure accuracy, users should not rely solely on this tool for critical security decisions. Always follow security best practices and consult with security professionals for production systems.

## Support

For issues, questions, or suggestions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: March 2026
