from django.shortcuts import render
from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'home.html'
class IndexView(TemplateView):
    template_name = 'index.html'
    
class StartView(TemplateView):
    template_name = 'start.html'

class RegistrationView(TemplateView):
    template_name = 'registration.html'

class ProfileView(TemplateView):
    template_name = 'profile.html'