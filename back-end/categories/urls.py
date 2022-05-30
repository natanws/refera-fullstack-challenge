from django.urls import path

from categories.views import CategoriesView, SingleCategoryView

urlpatterns = [
    path('categories', CategoriesView.as_view()),
    path('categories/<int:id>', SingleCategoryView.as_view()),
]
