from accounts.models import Company
company_id = 1  # Replace with the ID you are testing
try:
    company = Company.objects.get(pk=company_id)
    print(f"Company exists: {company}")
except Company.DoesNotExist:
    print(f"Company with ID {company_id} does not exist.")