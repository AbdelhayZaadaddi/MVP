from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user
    

class NewUser(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN = 'admin'
        USER = 'user'
        EMPLOYE = 'employe'
        COMPANY = 'company'
        TRADER = 'trader'
        

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField('user name', max_length=150, unique=True)
    start_date = models.DateTimeField('start date', default=timezone.now)
    role = models.CharField('Role', max_length=50, choices=Role.choices, default=Role.USER)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return self.user_name
    


class Company(NewUser):
    company_name = models.CharField('company name', max_length=150, blank=True, null=True)
    address = models.CharField('address', max_length=150, blank=True, null=True)
    phone = models.IntegerField('phone', blank=True, null=True)

class Employes(NewUser):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, default=None)
    first_name = models.CharField('first name', max_length=150, blank=True, null=True)
    last_name = models.CharField('last name', max_length=150, blank=True, null=True)
    address = models.CharField('address', max_length=150, blank=True, null=True)
    phone = models.IntegerField('phone', blank=True, null=True)


class Trader(NewUser):
    company_name = models.CharField('company name', max_length=150, blank=True, null=True)
    address = models.CharField('address', max_length=150, blank=True, null=True)
    phone = models.IntegerField('phone', blank=True, null=True)