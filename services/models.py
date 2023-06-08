from django.db import models
from django.utils import timezone

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='service_images')
    category = models.ForeignKey(to=ServiceCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Application(models.Model):
    name = models.CharField(max_length=256)
    phone = models.TextField(max_length=10)
    address = models.TextField(null=False, blank=False)
    email = models.CharField(max_length=100)
    service = models.ForeignKey(to=Service, on_delete=models.CASCADE)
    date = models.DateField()
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

