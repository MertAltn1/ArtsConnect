from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .forms import LoginForm, ProfilePhotoForm, RegistrationForm
from .models import Chat, Message
from .serializers import (
    ChatSerializer,
    MeSerializer,
    MessageSerializer,
    UserSerializer,
)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        form = RegistrationForm(request.data)

        if form.is_valid():
            data = form.cleaned_data
            User = get_user_model()

            user = User.objects.create_user(
                username=data["username"],
                email=data["email"],
                password=data["password"],
                role=data["role"],
            )

            token, _ = Token.objects.get_or_create(user=user)

            return Response(
                {"message": "Registration successful.", "token": token.key}
            )

        return Response({"errors": form.errors}, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        form = LoginForm(request.data)

        if not form.is_valid():
            return Response({"errors": form.errors}, status=400)

        data = form.cleaned_data
        user = authenticate(
            username=data["username"], password=data["password"]
        )

        if user is None:
            return Response(
                {"error": "Invalid username or password."}, status=400
            )

        token, _ = Token.objects.get_or_create(user=user)

        return Response({"message": "Login successfully", "token": token.key})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()

        return Response({"message": "Logout successful."})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = MeSerializer(request.user)

        return Response(serializer.data)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        User = get_user_model()

        user = User.objects.filter(id=user_id).first()
        if user is None:
            return Response({"error": "user not found"}, status=404)
        serializer = MeSerializer(user)

        return Response(serializer.data)


class ChatListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chats = (
            Chat.objects.filter(users=request.user)
            .exclude(deleted_by=request.user)
            .order_by("-id")  # yeni sohbet uste
        )

        serializer = ChatSerializer(
            chats, many=True, context={"request": request}
        )

        data = []

        for chat in serializer.data:
            if chat["user"] is None:  # karsi taraf silinmisse listeleme
                continue

            data.append(chat)

        return Response(data)

    def post(self, request):
        User = get_user_model()

        other_user = (
            User.objects.filter(id=request.data.get("user_id"))
            .exclude(id=request.user.id)
            .first()
        )

        if other_user is None:
            return Response({"error": "User not found."}, status=404)

        # kullanıcı sohbetleri ikiside
        chat = (
            Chat.objects.filter(users=request.user)
            .filter(users=other_user)
            .first()
        )

        if chat is None:
            chat = Chat.objects.create()
            chat.users.add(request.user, other_user)

        serializer = ChatSerializer(chat, context={"request": request})

        return Response(serializer.data)


class MessageListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, chat_id):
        chat = Chat.objects.filter(id=chat_id, users=request.user).first()

        if chat is None:
            return Response({"error": "Chat not found."}, status=404)

        messages = Message.objects.filter(chat=chat).order_by("created_at")

        # queryset ondan many
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data)

    def delete(self, request, chat_id):
        chat = Chat.objects.filter(id=chat_id, users=request.user).first()

        if chat is None:
            return Response({"error": "Chat not found."}, status=404)

        chat.deleted_by.add(request.user)  # sadece benden silinsin

        return Response({"message": "Chat deleted."})

class ProfilePhotoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        form = ProfilePhotoForm(request.data, request.FILES)
        if not form.is_valid():
            return Response({"errors": form.errors}, status=400)
        photo = form.cleaned_data["profile_photo"]

        request.user.profile_photo = photo
        request.user.save()  # ormde atıyorum sadece ramde bırakmıyorum

        return Response({"profile_photo": request.user.profile_photo.url})


class SearchUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # search/?username=mert
        username = request.query_params.get("username", "")

        User = get_user_model()

        users = User.objects.filter(
            username__icontains=username  # icontains==contain
        ).exclude(id=request.user.id)

        # simdilik 50 kisi yeter, hepsini cekince yavasliyor
        users = users[:50]

        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
