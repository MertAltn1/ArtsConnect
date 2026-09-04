from rest_framework import serializers
from .models import Chat
from .models import Message
from .models import User

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source="sender.username",read_only=True) #foreign key
    class Meta:
        model = Message
        fields = ["id","sender","content","created_at"]

class UserSerializer(serializers.ModelSerializer):
    department = serializers.CharField(source="department.name", read_only=True, default=None)

    class Meta:
        model = User
        fields = ["id", "username", "role", "department", "profile_photo"]

class MeSerializer(UserSerializer): #email, online, team
    team = serializers.SerializerMethodField() #ayni departmandakiler

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["email", "online", "team"]

    def get_team(self, user):
        if user.department is None:
            return []

        team = User.objects.filter(department=user.department).exclude(id=user.id)

        return UserSerializer(team, many=True).data

class ChatSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField() #karsi taraf hesaplaniyor

    class Meta:
        model = Chat
        fields = ["id", "user"]

    def get_user(self, chat):
        me = self.context["request"].user
        other_user = chat.users.exclude(id=me.id).first()

        return UserSerializer(other_user).data if other_user else None