from django.contrib import admin

from .models import Chat, Department, Message, User

# Register your models here.

admin.site.register(User)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Department)
