# Dependencies Notes

## Djongo and PyMongo Versions

### Current State

The project uses:
- `djongo==1.3.6`
- `pymongo==3.12.3`

### Known Issue

Djongo 1.3.6 is the last stable version and only supports PyMongo 3.x. While there are security updates available for PyMongo 4.x and 5.x, Djongo does not officially support them.

### Alternatives

If you need more recent MongoDB driver versions, consider these alternatives:

#### Option 1: Use Djongo-Next (Community Fork)

```bash
# Replace in requirements.txt
djongo-next==1.3.7
pymongo==4.6.0
```

This is a community-maintained fork with better PyMongo support.

#### Option 2: Use MongoEngine

```bash
# Replace Djongo with MongoEngine
mongoengine==0.27.0
```

MongoEngine is another ODM (Object-Document Mapper) for MongoDB that's actively maintained.

#### Option 3: Use Pure PyMongo with Django

Create a custom database backend or use PyMongo directly in views without Django ORM integration.

### Production Recommendations

For production environments, consider:

1. **MongoDB Atlas**: Managed MongoDB service with built-in security
2. **Connection Encryption**: Enable SSL/TLS for MongoDB connections
3. **Network Security**: Use VPC/private networks
4. **Regular Updates**: Monitor for security advisories
5. **Access Control**: Implement proper MongoDB authentication and authorization

### Migration Path

If you decide to migrate away from Djongo:

```python
# Option 1: Use Django with PostgreSQL + MongoDB for documents
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        # ... PostgreSQL config
    }
}

# Use PyMongo directly for document storage
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
db = client['gplan_db']
```

```python
# Option 2: Use MongoEngine
from mongoengine import Document, StringField, IntField

class Product(Document):
    name = StringField(required=True)
    quantity = IntField()
    # ... other fields
```

### Security Considerations

While PyMongo 3.12.3 is older, to mitigate security risks:

1. **Network Level Security**
   - Use firewall rules to restrict MongoDB access
   - Use VPN or private networks
   - Enable MongoDB authentication

2. **Application Level Security**
   - Validate all inputs
   - Use parameterized queries (already done by Djongo)
   - Implement rate limiting
   - Regular security audits

3. **Monitoring**
   - Enable MongoDB audit logging
   - Monitor for unusual queries
   - Set up alerts for suspicious activity

### Future Plans

Monitor these projects for updates:
- Djongo: https://github.com/nesdis/djongo
- PyMongo: https://github.com/mongodb/mongo-python-driver
- Django-MongoDB: https://github.com/mongodb-labs/django-mongodb-backend (experimental)

### Temporary Solution

For now, the current setup works but should be:
- Used behind a firewall
- With MongoDB authentication enabled
- On a private network
- With regular security monitoring

We recommend planning a migration to a more actively maintained solution for production use.
