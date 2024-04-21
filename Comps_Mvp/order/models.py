from django.db import models
from operator import mod
from django.contrib.auth.models import User
from products.models import Product

# Create your models here.

class OrderStatus(models.TextChoices):
    PROCESSING = 'Processing'
    SHIPPED = 'Shipped'
    DELIVERED = 'Delivered'

class PaymentStatus(models.TextChoices):
    PENDING = 'Pending'
    PAID = 'Paid'

class PaymentMethod(models.TextChoices):
    COD = 'Cash on Delivery'
    CARD = 'Credit Card'
    PAYPAL = 'Paypal'

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=100, default='', blank=False)
    street = models.CharField(max_length=100, default='', blank=False)
    address = models.CharField(max_length=100, default='', blank=False)
    phone = models.CharField(max_length=100, default='', blank=False)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PROCESSING)
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.COD)
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return str(self.id)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderitems')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False)

    def __str__(self):
        return self.product.name