from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


from django.contrib.auth.forms import UserCreationForm

# Create your views here.


def Login(request):
    return HttpResponse("Login Page")


def Register(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        form.save()
        return JsonResponse({'message': 'User Created'})
    return render(request, 'accounts/register.html', {'form': form})
    


def Logout(request):
    return HttpResponse("Logout Page")