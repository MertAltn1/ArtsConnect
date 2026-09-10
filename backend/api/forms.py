from django import forms

from .models import User


class RegistrationForm(forms.Form):
    username = forms.CharField(max_length=100)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)
    role = forms.CharField(max_length=50, required=False)

    def clean(self):
        cleaned_data = super().clean()

        username = cleaned_data.get("username")
        email = cleaned_data.get("email")
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if username and User.objects.filter(username=username).exists():
            raise forms.ValidationError("This username already exists.")

        if email and User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email already exists.")

        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")

        return cleaned_data


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)


class ProfilePhotoForm(forms.Form):
    profile_photo = forms.ImageField()
