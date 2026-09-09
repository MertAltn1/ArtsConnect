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
        fields = ["id","sender","topic","content","created_at"]

class UserSerializer(serializers.ModelSerializer):
    department = serializers.CharField(
        source="department.name", read_only=True, default=None
    )

    class Meta:
        model = User
        fields = [
            "id", "username", "role", "department", "online", "profile_photo"
        ]

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

    class Meta:
        model = Chat
        fields = ["id", "user"]

    def get_user(self, chat):
        me = self.context["request"].user
        other_user = chat.users.exclude(id=me.id).first()

        return UserSerializer(other_user).data if other_user else None
