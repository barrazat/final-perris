from .models import Perro
from rest_framework import viewsets
from myblog.serializers import PerroSerializer

class PerroViewSet(viewsets.ModelViewSet):
    queryset = Perro.objects.all()
    serializer_class = PerroSerializer