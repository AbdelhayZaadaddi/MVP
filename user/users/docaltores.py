from django.http import HttpResponse
from functools import wraps

def user_role_required(roles=[""]):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.user.role in roles:
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse('Unauthorized', status=401)
        return _wrapped_view
    return decorator