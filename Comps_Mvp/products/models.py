import os
from django.db import models
from django.db.models.deletion import CASCADE


def product_image_upload_path(instance, filename):
    return os.path.join('assets/images/products', filename)

class Company(models.Model):
    name = models.CharField(max_length=200, default='Default Company Name' )

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=200, default='All Branches')

    def __str__(self):
        return self.name


class Product(models.Model):
    CATEGORIES = [
        '...',
        'Education',
        'Medical',
        'Restaurants & Cafes',
        'Health & Fitness',
        'Home Services',
        'Financial Services',
        'Pet Services',
        'Automotive',
        'Travel & Hospitality',
        'Entertainment',
        'Technology',
        'Fashion',
        'Other',
    ]

    CATEGORY_CHOICES = [(category, category) for category in CATEGORIES]
    
    name = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default=CATEGORIES[0],
    )
    description = models.TextField()
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='products', null=True, blank=True) # Corrected company field
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    image = models.ImageField(upload_to=product_image_upload_path, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='products', null=True, blank=True)

    def __str__(self):
        return self.name
