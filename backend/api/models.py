from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(max_length=200, unique=True)
    online = models.BooleanField(default=False)
    birthday = models.DateField(
        null=True, blank=True
    )  # null blank sonradan ekledim kontrol et
    profile_photo = models.ImageField(
        upload_to="profile_photos/", null=True, blank=True
    )
    role = models.CharField(max_length=50, blank=True)


class Chat(models.Model):
    users = models.ManyToManyField(User, related_name="chats")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat {self.id}"  # bu syntaxi bir kontrol et hazır aldım


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sent_messages"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
