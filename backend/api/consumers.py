import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from rest_framework.authtoken.models import Token

from .models import Chat
from .serializers import MessageSerializer


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
        self.group_name = f"chat_{self.chat_id}"  # odanin adi

        key = self.scope["url_route"]["kwargs"]["token"]
        token = Token.objects.filter(key=key).first()

        if token is None:  # token gecersiz
            self.close()
            return

        self.user = token.user

        self.chat = Chat.objects.filter(id=self.chat_id, users=self.user).first()

        if self.chat is None:  # bu sohbetin uyesi degil
            self.close()
            return

        async_to_sync(self.channel_layer.group_add)(self.group_name, self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.group_name, self.channel_name)

    def receive(self, text_data):  # tarayicidan mesaj geldi
        serializer = MessageSerializer(data=json.loads(text_data))

        if not serializer.is_valid():
            return

        message = serializer.save(chat=self.chat, sender=self.user)

        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {"type": "chat_message", "message": MessageSerializer(message).data},
        )

    def chat_message(self, event):  # odadan mesaj geldi
        self.send(text_data=json.dumps(event["message"]))
