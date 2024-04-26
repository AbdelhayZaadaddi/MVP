from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.

class CustomAccountManager(BaseUserManager):
    """
    A custom account manager for creating and managing user accounts.
    """

    def create_superuser(self, email, user_name, first_name, password, **other_fields):
        """
        Creates and saves a superuser with the given email, username, first name, and password.
        Additional fields can be provided as keyword arguments.

        Args:
            email (str): The email address of the superuser.
            user_name (str): The username of the superuser.
            first_name (str): The first name of the superuser.
            password (str): The password of the superuser.
            **other_fields: Additional fields to be set for the superuser.

        Returns:
            User: The created superuser object.
        
        Raises:
            ValueError: If the superuser is not assigned to is_staff=True or is_superuser=True.
        """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):
        """
        Creates and saves a user with the given email, username, first name, and password.
        Additional fields can be provided as keyword arguments.

        Args:
            email (str): The email address of the user.
            user_name (str): The username of the user.
            first_name (str): The first name of the user.
            password (str): The password of the user.
            **other_fields: Additional fields to be set for the user.

        Returns:
            User: The created user object.
        
        Raises:
            ValueError: If the email address is not provided.
        """
        if not email:
            raise ValueError('You must provide an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

    

class NewUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model representing a new user.

    Inherits from AbstractBaseUser and PermissionsMixin.

    Attributes:
        email (EmailField): The email address of the user (unique).
        user_name (CharField): The username of the user (unique).
        first_name (CharField): The first name of the user.
        start_date (DateTimeField): The start date of the user (default: timezone.now).
        role (CharField): The role of the user (choices: ADMIN, USER, EMPLOYE, COMPANY, TRADER; default: USER).
        is_staff (BooleanField): Whether the user is a staff member (default: False).
        is_active (BooleanField): Whether the user is active (default: False).

    Methods:
        save(*args, **kwargs): Overrides the save method to set the password before saving the user.
        __str__(): Returns the username of the user.

    """

    class Role(models.TextChoices):
        ADMIN = 'admin'
        USER = 'user'
        EMPLOYE = 'employe'
        COMPANY = 'company'
        TRADER = 'trader'

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField('user name', max_length=150, unique=True)
    first_name = models.CharField('first name', max_length=150)
    start_date = models.DateTimeField('start date', default=timezone.now)
    role = models.CharField('Role', max_length=50, choices=Role.choices, default=Role.USER)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def save(self, *args, **kwargs):
        """
        Overrides the save method to set the password before saving the user.

        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        """
        if self.pk is None:
            password = self.password
            self.set_password(password)
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Returns the username of the user.

        Returns:
            str: The username of the user.

        """
        return self.user_name
    


class Company(NewUser):
    """
    Represents a company in the system.

    Attributes:
        company_name (str): The name of the company.
        address (str): The address of the company.
        phone (int): The phone number of the company.
    """
    company_name = models.CharField('company name', max_length=150, blank=True, null=True)
    address = models.CharField('address', max_length=150, blank=True, null=True)
    phone = models.IntegerField('phone', blank=True, null=True)



class Employes(NewUser):
    """
    Represents an employee in the company.

    Attributes:
        company_id (ForeignKey): The ID of the company the employee belongs to.
        employee_name (CharField): The first name of the employee.
        last_name (CharField): The last name of the employee.
        address (CharField): The address of the employee.
        phone (IntegerField): The phone number of the employee.
    """
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, default=None)
    employee_name = models.CharField('first name', max_length=150, blank=True, null=True)
    last_name = models.CharField('last name', max_length=150, blank=True, null=True)
    address = models.CharField('address', max_length=150, blank=True, null=True)
    phone = models.IntegerField('phone', blank=True, null=True)


class Trader(NewUser):
    """
    Represents a trader in the system.

    Attributes:
        company_name (str): The name of the trader's company.
        address (str): The address of the trader.
        phone (int): The phone number of the trader.
    """
    company_name = models.CharField('company name', max_length=150, blank=True, null=True)
    address = models.CharField('address', max_length=150, blank=True, null=True)
    phone = models.IntegerField('phone', blank=True, null=True)
