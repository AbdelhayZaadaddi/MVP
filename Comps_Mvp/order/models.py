from django.db import models
from django.conf import settings
from products.models import Product
from accounts.models import NewUser

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

def get_default_user():
    return NewUser.objects.first().id 

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=get_default_user)
    city = models.CharField(max_length=100, default='', blank=False)
    street = models.CharField(max_length=100, default='', blank=False)
    address = models.CharField(max_length=100, default='', blank=False)
    phone = models.CharField(max_length=15, default='', blank=False)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PROCESSING)
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.COD)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.user_name}"  # user.user_name NOT user.username

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderitems')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.product.name
