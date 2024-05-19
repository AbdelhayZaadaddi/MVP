from django.db import models

def product_image_upload_path(instance, filename):
    return os.path.join('assets/images/products', filename)

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    image = models.ImageField(upload_to=product_image_upload_path, null=True, blank=True)

    def __str__(self):
        return self.name
