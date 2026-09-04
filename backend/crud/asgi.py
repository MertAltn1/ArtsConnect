"""
ASGI config for crud project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.1/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crud.settings")

django_asgi_app = get_asgi_application()

import api.routing  # modeller yuklendikten sonra import edilmeli

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": URLRouter(api.routing.websocket_urlpatterns),
    }
)
