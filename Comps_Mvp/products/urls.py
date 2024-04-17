from . import views
from django.urls import path

urlpatterns = [

    # --------------------- Fonction base views ------------------------------------
    path("products", views.list_products, name="list_products"),
    path("product/<int:pk>/", views.product, name="product"),
    path("product/create", views.create_product, name="Create Product"),
    path("product/update/<int:pk>", views.update_product, name="Update Product"),


    # --------------------------- class Base Views ---------------------------------
    path("cls/products", views.ProductListView.as_view()),
    path("cls/product/<int:pk>/", views.ProductDetailView.as_view()),
]