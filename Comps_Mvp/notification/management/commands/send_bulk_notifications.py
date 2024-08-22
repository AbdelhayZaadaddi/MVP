from django.core.management.base import BaseCommand
from notification.models import Notification
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Send bulk notifications to all users'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        users = User.objects.all()
        for user in users:
            Notification.objects.create(
                user=user,
                message='This is a bulk notification message.'
            )
        self.stdout.write(self.style.SUCCESS('Successfully sent bulk notifications'))
