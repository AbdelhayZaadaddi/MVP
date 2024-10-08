import os
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.deletion import CASCADE
from django.conf import settings  # Import settings to reference AUTH_USER_MODEL

def product_image_upload_path(instance, filename):
    return os.path.join('assets/images/products', filename)

class Company(models.Model):
    name = models.CharField(max_length=200, default='Default Company Name')

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=200, default='All Branches')

    def __str__(self):
        return self.name
        
def get_default_user():
    User = get_user_model()
    return User.objects.first()


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
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    image = models.ImageField(upload_to=product_image_upload_path, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=CASCADE,
        related_name='products',
        default=get_default_user
    )

    def __str__(self):
        return self.name

class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField()
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
