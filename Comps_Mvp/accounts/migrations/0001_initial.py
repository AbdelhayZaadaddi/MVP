# Generated by Django 5.0.4 on 2024-05-17 21:07

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('user_name', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=150)),
                ('start_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('user', 'User'), ('employee', 'Employee'), ('company', 'Company'), ('trader', 'Trader')], default='user', max_length=50, verbose_name='Role')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'ordering': ['start_date'],
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('newuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('company_name', models.CharField(blank=True, max_length=150, null=True, verbose_name='company name')),
                ('address', models.CharField(blank=True, max_length=150, null=True, verbose_name='address')),
                ('phone', models.CharField(blank=True, max_length=15, null=True, verbose_name='phone')),
            ],
            options={
                'verbose_name': 'company',
                'verbose_name_plural': 'companies',
            },
            bases=('accounts.newuser',),
        ),
        migrations.CreateModel(
            name='Trader',
            fields=[
                ('newuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('company_name', models.CharField(blank=True, max_length=150, null=True, verbose_name='company name')),
                ('address', models.CharField(blank=True, max_length=150, null=True, verbose_name='address')),
                ('phone', models.CharField(blank=True, max_length=15, null=True, verbose_name='phone')),
            ],
            options={
                'verbose_name': 'trader',
                'verbose_name_plural': 'traders',
            },
            bases=('accounts.newuser',),
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('newuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('employee_name', models.CharField(blank=True, max_length=150, null=True, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, null=True, verbose_name='last name')),
                ('address', models.CharField(blank=True, max_length=150, null=True, verbose_name='address')),
                ('phone', models.IntegerField(blank=True, null=True, verbose_name='phone')),
                ('company_e', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='accounts.company')),
            ],
            options={
                'verbose_name': 'employee',
                'verbose_name_plural': 'employees',
            },
            bases=('accounts.newuser',),
        ),
    ]