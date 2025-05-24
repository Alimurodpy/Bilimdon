from django.urls import path
from .views import IndexView, StartView, RegistrationView, HomeView, ProfileView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('home/', HomeView.as_view(), name='home'),
    path('start/', StartView.as_view(), name='start'),
    path('registration/', RegistrationView.as_view(), name='registration'),
    path('profile/', ProfileView.as_view(), name='profile'),
    
]