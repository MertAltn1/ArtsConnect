from django.db.models import Count
from rest_framework import serializers
from .models import Chat
from .models import Message
from .models import User

class MessageSerializer(serializers.ModelSerializer):
    # foreign key
    sender = serializers.CharField(source="sender.username", read_only=True)
    class Meta:
        model = Message
        fields = ["id","sender","topic","content","image","created_at"]

class UserSerializer(serializers.ModelSerializer):
    department = serializers.CharField(
        source="department.name", read_only=True, default=None
    )
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id", "username", "full_name", "role", "department", "online",
            "profile_photo"
        ]

    def get_full_name(self, user):
        name = f"{user.first_name} {user.last_name}".strip()
        return name or user.username  # ad soyad yoksa username'e don

class MeSerializer(UserSerializer): #email, online, team
    team = serializers.SerializerMethodField() #ayni dept
    message_count = serializers.SerializerMethodField() #kac mesaj attim

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + [
            "email", "team", "message_count"
        ]

    def get_message_count(self, user):
        return Message.objects.filter(sender=user).aggregate(
            total=Count("id")
        )["total"]

    def get_team(self, user):
        if user.department is None:
            return []

        team = User.objects.filter(
            department=user.department
        ).exclude(id=user.id)

        return UserSerializer(team, many=True).data

class ChatSerializer(serializers.ModelSerializer):
    # karsıdaki kişiyi de hesaplıyorum
    user = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    last_message_at = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ["id", "user", "last_message", "last_message_at"]

    def get_user(self, chat):
        me = self.context["request"].user
        other_user = chat.users.exclude(id=me.id).first()

        return UserSerializer(other_user).data if other_user else None

    def get_last_message(self, chat):
        message = chat.messages.order_by("-created_at").first()
        return message.content if message else None

    def get_last_message_at(self, chat):
        message = chat.messages.order_by("-created_at").first()
        return message.created_at if message else None
