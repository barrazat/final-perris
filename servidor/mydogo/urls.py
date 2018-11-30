from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from myblog import views
from django.conf import settings
from django.conf.urls.static import static

routers = routers.DefaultRouter()
routers.register(r'perros', views.PerroViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(routers.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)