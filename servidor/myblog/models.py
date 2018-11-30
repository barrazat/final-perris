from django.db import models
from django.utils import timezone

EstadoPerro = {
    ('Rescatado', 'Rescatado'),
    ('Adoptado', 'Adoptado'),
    ('Disponible', 'Disponible')
}

class Perro(models.Model):
    idperro = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)
    estado = models.CharField(max_length=15, choices=EstadoPerro)
    foto = models.FileField()
    created_date = models.DateTimeField(
            default=timezone.now)

    def create(self):
        self.created_date = timezone.now()
        self.save()

    def __str__(self):
        return self.nombre