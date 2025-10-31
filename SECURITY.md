# Security Policy - GPlan

## 🔒 Security Measures Implemented

### Authentication & Authorization

1. **JWT (JSON Web Tokens)**
   - Token-based authentication
   - Access tokens (60 minutes lifetime)
   - Refresh tokens (24 hours lifetime)
   - Automatic token refresh mechanism

2. **Password Security**
   - Django's built-in password hashing (PBKDF2)
   - Password validation rules enforced
   - Minimum length requirements
   - Common password checking

3. **API Security**
   - All sensitive endpoints require authentication
   - Permission classes enforced on ViewSets
   - User-specific data access control

### Web Security

1. **CSRF Protection**
   - Django CSRF middleware enabled
   - CSRF tokens for state-changing operations
   - Secure cookie settings in production

2. **XSS Protection**
   - `SECURE_BROWSER_XSS_FILTER = True`
   - `SECURE_CONTENT_TYPE_NOSNIFF = True`
   - React's built-in XSS prevention

3. **Clickjacking Protection**
   - `X_FRAME_OPTIONS = 'DENY'`
   - Prevents iframe embedding

4. **CORS Configuration**
   - Configured allowed origins
   - Credentials allowed for authenticated requests
   - Prevents unauthorized cross-origin requests

### Data Security

1. **Environment Variables**
   - Sensitive data stored in `.env` files
   - `.env` files excluded from git
   - Example files provided without sensitive data

2. **Database Security**
   - MongoDB authentication configured
   - Connection strings secured
   - No default credentials in production

3. **Session Security**
   - HTTP-only cookies
   - Secure cookies in production
   - Session timeout configured

### Dependency Security

1. **Updated Dependencies**
   - Django 4.2.24 (patched vulnerabilities)
   - Axios 1.12.0 (patched DoS and SSRF)
   - Gunicorn 22.0.0 (patched request smuggling)

2. **Security Checks**
   - Dependencies scanned with gh-advisory-database
   - Vulnerabilities identified and fixed

## 🚨 Known Security Considerations

### Development Mode

When `DEBUG=True` (development):
- Detailed error pages are shown
- Static files served by Django
- Less strict security headers

**Action Required:** Always set `DEBUG=False` in production

### Secret Key

The default `SECRET_KEY` in settings is for development only.

**Action Required:** Generate a strong secret key for production:
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### MongoDB Authentication

Default docker-compose uses simple credentials.

**Action Required:** Use strong passwords and enable SSL/TLS in production.

### HTTPS

Development setup uses HTTP.

**Action Required:** Use HTTPS in production with valid SSL certificates.

## 🛡️ Security Best Practices for Deployment

### Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Generate and use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS` properly
- [ ] Enable HTTPS/SSL
- [ ] Set secure cookie flags:
  - [ ] `SESSION_COOKIE_SECURE=True`
  - [ ] `CSRF_COOKIE_SECURE=True`
- [ ] Configure strong MongoDB credentials
- [ ] Enable MongoDB authentication
- [ ] Use MongoDB SSL/TLS
- [ ] Set up firewall rules
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Regular security updates
- [ ] Regular backups

### Recommended Additional Security Measures

1. **Rate Limiting**
   ```python
   # Install django-ratelimit
   pip install django-ratelimit
   
   # Apply to views
   from django_ratelimit.decorators import ratelimit
   
   @ratelimit(key='ip', rate='5/m')
   def my_view(request):
       pass
   ```

2. **Two-Factor Authentication**
   - Consider implementing 2FA for sensitive accounts
   - Use django-otp or similar packages

3. **API Rate Limiting**
   - Use Django REST Framework throttling
   - Configure in settings:
   ```python
   REST_FRAMEWORK = {
       'DEFAULT_THROTTLE_CLASSES': [
           'rest_framework.throttling.AnonRateThrottle',
           'rest_framework.throttling.UserRateThrottle'
       ],
       'DEFAULT_THROTTLE_RATES': {
           'anon': '100/hour',
           'user': '1000/hour'
       }
   }
   ```

4. **Security Headers**
   - Use django-security or similar
   - Configure additional headers:
     - `Strict-Transport-Security`
     - `Content-Security-Policy`
     - `Referrer-Policy`

5. **Logging & Monitoring**
   ```python
   LOGGING = {
       'version': 1,
       'handlers': {
           'file': {
               'level': 'WARNING',
               'class': 'logging.FileHandler',
               'filename': '/var/log/gplan/security.log',
           },
       },
       'loggers': {
           'django.security': {
               'handlers': ['file'],
               'level': 'WARNING',
               'propagate': False,
           },
       },
   }
   ```

6. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Apply patches promptly

## 🐛 Reporting Security Vulnerabilities

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security concerns to: [security contact - to be added]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## 📋 Security Audit History

| Date | Version | Auditor | Findings | Status |
|------|---------|---------|----------|--------|
| 2024-01-xx | 1.0 | Initial Setup | Dependencies updated | ✅ Fixed |

## 🔍 Security Testing

### Recommended Testing Tools

1. **Dependency Scanning**
   ```bash
   # Python
   pip install safety
   safety check
   
   # JavaScript
   npm audit
   ```

2. **Static Analysis**
   ```bash
   # Python
   pip install bandit
   bandit -r backend/
   
   # JavaScript
   npm run lint
   ```

3. **Penetration Testing**
   - OWASP ZAP
   - Burp Suite
   - SQLMap (for SQL injection)

### Regular Security Checks

Run these checks regularly:

```bash
# Check for outdated packages
pip list --outdated
npm outdated

# Security audit
npm audit
safety check

# Code analysis
bandit -r backend/
eslint frontend/src/
```

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Django Security](https://docs.djangoproject.com/en/4.2/topics/security/)
- [React Security](https://react.dev/learn/security)
- [MongoDB Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/)

## 📞 Contact

For security-related questions:
- Open a private security advisory on GitHub
- Contact: [To be configured]

---

**Last Updated:** 2024
**Version:** 1.0
