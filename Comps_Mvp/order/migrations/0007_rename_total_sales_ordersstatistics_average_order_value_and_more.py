# Generated by Django 5.0.4 on 2024-07-30 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0006_ordersstatistics'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ordersstatistics',
            old_name='total_sales',
            new_name='average_order_value',
        ),
        migrations.RenameField(
            model_name='ordersstatistics',
            old_name='num_orders',
            new_name='total_orders',
        ),
        migrations.RemoveField(
            model_name='ordersstatistics',
            name='data',
        ),
        migrations.AddField(
            model_name='ordersstatistics',
            name='total_revenue',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=15),
        ),
    ]
