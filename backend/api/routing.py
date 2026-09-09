from django.urls import path

from .consumers import ChatConsumer

websocket_urlpatterns = [
    path("ws/chat/<int:chat_id>/<str:token>/", ChatConsumer.as_asgi()),
]
