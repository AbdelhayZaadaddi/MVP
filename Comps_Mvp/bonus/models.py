from django.db import models

# Create your models here.


class Bonus(models.Model):
    name = models.CharField(max_length=100)
    value = models.FloatField()


    def __str__(self):
        return self.name
