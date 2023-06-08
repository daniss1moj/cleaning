from django.contrib import admin
from django.utils.html import format_html
from services.models import ServiceCategory, Service, Application

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    list_editable = ['description']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_filter = ['category']
    list_editable = ['price', 'category']
    list_display = ["name", "description", "price", 'image_display', 'category']

    def image_display(self, obj):
        return format_html('<img src="{}" width="100" height="100" />', obj.image.url)



@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["name", "phone", "address", 'email', 'service', 'date', 'message']
