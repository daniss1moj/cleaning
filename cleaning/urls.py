"""cleaning URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from services.views import index, opinion, services, application, success, application_ajax
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('opinion/', opinion, name='opinion'),
    path('services/', services, name='services'),
    path('services/<int:category_id>/', services, name='service'),
    path('application/', application, name='application'),
    path('application/<int:application_id>/', application, name='application_id'),
    path('ajax/application/<int:application_id>/', application_ajax, name='application_id_ajax'),
    path('success/', success, name='success'),
    path('', include('users.urls'))
] + static (settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
