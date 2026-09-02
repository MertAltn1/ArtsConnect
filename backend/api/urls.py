from django.urls import path

from .views import (
    ChatListView,
    LoginView,
    LogoutView,
    MessageListView,
    MeView,
    ProfilePhotoView,
    RegisterView,
    SearchUserView,
)

urlpatterns = [
    path("api/register/", RegisterView.as_view()),
    path("api/login/", LoginView.as_view()),
    path("api/me/", MeView.as_view()),
    path("api/chats/", ChatListView.as_view()),
    path("api/logout/", LogoutView.as_view()),
    path("api/chats/<int:chat_id>/messages/", MessageListView.as_view()),
    path("api/profile-photo/", ProfilePhotoView.as_view()),
    path("api/users/search/", SearchUserView.as_view()),
]
