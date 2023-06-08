from django.shortcuts import render, HttpResponse, redirect
from services.models import Service, ServiceCategory, Application
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

def index(request):
    is_show_phone = request.GET.get('is_show_phone')
    if is_show_phone is None:
        is_show_phone = True
    else:
        is_show_phone = is_show_phone.lower() == 'true'
    context = {
        'title': 'Cleaning X',
        'current_link': 0,
        'is_show_phone': is_show_phone
    }
    return render(request, 'services/index.html', context)

@login_required(login_url='/login/')
def opinion(request):
    context = {
        'title': 'Opinion',
        'current_link': 1
    }
    return render(request, 'services/opinion.html', context)

def services(request,  category_id=None):
    if category_id:
        category = ServiceCategory.objects.get(id=category_id)
        serviceitems = Service.objects.filter(category=category)
    else:
        serviceitems = Service.objects.all()
    context = {
        'title': 'Services',
        'services': serviceitems,
        'categories': ServiceCategory.objects.all(),
        'current_link': 2
    }
    return render(request, 'services/services.html', context)


def application(request, application_id=1):
    if request.method == 'GET':
        context= {
            'application_id': application_id
        }
        return render(request, 'services/application-info.html', context)
    if request.method == 'POST':
        name = request.POST.get("name")
        phone = request.POST.get('phone')
        address = request.POST.get('address')
        email = request.POST.get('email')
        service_id = request.POST.get('service')
        date_string = request.POST.get('date')
        note = request.POST.get('note')
        date = datetime.strptime(date_string, '%Y-%m-%d').date()
        service = Service.objects.get(id=service_id)
        newapplication = Application(name=name, phone=phone, address=address, email=email, service=service, date=date, message=note)
        newapplication.save()
        return redirect('success')
    return redirect('services')

def appToDict(objSpec):
    if objSpec == None:
        return None
    dictionary = {}
    dictionary["name"] = objSpec.name
    dictionary["phone"] = objSpec.phone
    dictionary["email"] = objSpec.email
    dictionary["service"] = objSpec.service.name
    dictionary["date"] = objSpec.date
    dictionary["message"] = objSpec.message
    dictionary["created_at"] = objSpec.created_at
    return dictionary

def application_ajax(request, application_id=1):

    if request.method == 'GET':
        current_application = Application.objects.get(id=application_id)
        appJson = []

        appJson.append(appToDict(current_application))
        return JsonResponse(appJson, safe=False)

def success(request):
    applications = Application.objects.order_by('-id')[:3]
    context = {
        'is_show_footer': False,
        'applications': applications
    }
    return render(request, 'services/success.html', context)