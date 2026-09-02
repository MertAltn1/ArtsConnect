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
    class Meta:
        model = User
        fields = ["id", "username", "role", "profile_photo"]

class MeSerializer(UserSerializer): #kendi bilgim, ustune email ve online
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["email", "online"]

class ChatSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField() #karsi taraf hesaplaniyor

    class Meta:
        model = Chat
        fields = ["id", "user"]

    def get_user(self, chat):
        me = self.context["request"].user
        other_user = chat.users.exclude(id=me.id).first()

        return UserSerializer(other_user).data if other_user else None