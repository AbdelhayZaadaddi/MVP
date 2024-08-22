from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import NewUser, Employee
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer, CompanySerializer, EmployeeSerializer, TraderSerializer
from .permission import IsCompany
import logging
import pandas as pd

class UserCreate(APIView):
    def post(self, request, *args, **kwargs):
        role = request.data.get('role')

        if role == NewUser.Role.COMPANY:
            serializer_class = CompanySerializer
        elif role == NewUser.Role.EMPLOYEE:
            serializer_class = EmployeeSerializer
        elif role == NewUser.Role.TRADER:
            serializer_class = TraderSerializer
        else:
            serializer_class = CustomUserSerializer  # Default to regular user

        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserUpdate(APIView):
    def put(self, request, *args, **kwargs):
        user = NewUser.objects.get(pk=request.user.pk)
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        if user.role == NewUser.Role.COMPANY:
            serializer_class = CompanySerializer
        elif user.role == NewUser.Role.EMPLOYEE:
            # Fetch the Employee instance
            user = Employee.objects.get(pk=user.pk)
            serializer_class = EmployeeSerializer
        elif user.role == NewUser.Role.TRADER:
            serializer_class = TraderSerializer
        else:
            serializer_class = CustomUserSerializer

        serializer = serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


logger = logging.getLogger(__name__)

class BlacklistTokenUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            logger.info('Received request data: %s', request.data)
            refresh_token = request.data.get("refresh_token")
            if refresh_token is None:
                logger.error('No refresh_token in request data')
                return Response({"error": "refresh_token is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            logger.exception('Exception while blacklisting token')
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer



class AddEmployeeView(APIView):
    permission_classes = [IsCompany]

    def post(self, request, *args, **kwargs):
        company = request.user  # Get the currently authenticated user
        if company.role != NewUser.Role.COMPANY:
            return Response({"detail": "Only companies can add employees."}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['company_e'] = company.pk
        
        # Debug prints
        print(f"Authenticated user: {company}")
        print(f"Authenticated company ID: {company.pk}")

        serializer = EmployeeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.error("Serializer errors: %s", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
class UserEmployeeList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        if user.role == NewUser.Role.COMPANY:
            employees = Employee.objects.filter(company_e=user)
        elif user.role == NewUser.Role.TRADER:
            # Assuming traders have their own list of employees, adjust accordingly
            employees = Employee.objects.filter(company_e__trader=user)
        elif user.role == NewUser.Role.ADMIN:
            # Admins can see all employees, adjust as needed
            employees = Employee.objects.all()
        else:
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class BulkAddEmployeesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        company = request.user
        if company.role != NewUser.Role.COMPANY:
            return Response({"detail": "Only companies can add employees."}, status=status.HTTP_403_FORBIDDEN)

        file = request.FILES.get('file')
        if not file:
            return Response({"detail": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Read the uploaded Excel file into a pandas DataFrame
            df = pd.read_excel(file)
            logger.info(f"File read successfully: {df.shape[0]} rows found.")

            
            for index, row in df.iterrows():
                employee_data = {
                    'email': row.get('email'),
                    'user_name': row.get('user_name'),
                    'first_name': row.get('first_name'),
                    'last_name': row.get('last_name'),
                    'address': row.get('address'),
                    'phone': row.get('phone'),
                    'role': 'employee',
                    'password': row.get('password'),
                    'password_confirm': row.get('password_confirm'),
                    'company_e': company.pk,  # Assign the company to the employee
                }

                serializer = EmployeeSerializer(data=employee_data)
                if serializer.is_valid():
                    serializer.save()
                    logger.info(f"Employee {employee_data['user_name']} created successfully.")
                else:
                    logger.error(f"Error in row {index + 1}: {serializer.errors}")
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({"detail": "Employees added successfully"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.exception("An error occurred while processing the Excel file.")
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RemoveEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

        if user.role != NewUser.Role.COMPANY:
            return Response({"detail": "Only companies can remove employees."}, status=status.HTTP_403_FORBIDDEN)

        email = request.data.get('email')
        username = request.data.get('username')

        logger.debug(f"Attempting to delete employee with email: {email} and username: {username}")

        try:
            employee = Employee.objects.get(email=email, user_name=username)
            logger.debug(f"Found employee: {employee}")
            employee.delete()
            logger.debug("Employee deleted successfully.")
            return Response({"detail": "Employee removed successfully."}, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            logger.debug("Employee not found.")
            return Response({"detail": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)