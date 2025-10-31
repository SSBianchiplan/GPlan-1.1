"""
WSGI config for gplan_project project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gplan_project.settings')

application = get_wsgi_application()
