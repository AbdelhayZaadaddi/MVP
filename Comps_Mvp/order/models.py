from django.db import models
from django.conf import settings
from products.models import Product
from accounts.models import NewUser
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Count
import logging


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
    


class OrdersStatistics(models.Model):
    data = models.DateField()
    num_orders = models.IntegerField(default=0)
    total_sales = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    @classmethod
    def update_daily_statistics(cls):
        today = timezone.now().date()
        orders_today = Order.objects.filter(created_at__date=today)
        num_orders = orders_today.count()
        total_price = orders_today.aggregate(Sum('total'))['total__sum'] or 0.00

        cls.objects.update_or_create(
            date=today,
            defaults={'num_orders': num_orders, 'total_price': total_price}
        )
    
    @classmethod
    def update_weekly_statistics(cls):
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)
        orders_this_week = Order.objects.filter(created_at__date__range=[start_of_week, end_of_week])
        num_orders = orders_this_week.count()
        total_price = orders_this_week.aggregate(Sum('total'))['total__sum'] or 0.00

        cls.objects.update_or_create(
            date=start_of_week,
            defaults={'num_orders': num_orders, 'total_price': total_price}
        )

    def __str__(self):
        return f"Statistics for {self.date}: {self.num_orders} orders, Total Price: {self.total_price}"
