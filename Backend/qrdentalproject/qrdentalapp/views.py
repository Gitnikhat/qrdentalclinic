from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.conf import settings

import os
import uuid

from .appconstants.responseconstants import *
from .models import Patient, Users

import pyqrcode


def index(request):
    return HttpResponse("Hello, welcome to QR Dental Clinic!!!")

# @APIView
def Login(request):
    if request.method == "POST":
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(request, username, password)
        if user:
            _ = login(request, user)
            return msg_and_status_response("Logged in successfully", status.HTTP_200_OK)
        else:
            return msg_and_status_response("Invalid credentials", status.HTTP_401_UNAUTHORIZED)


class RegisterPatient(APIView):

    def post(self, request):
        print(request.data)
        data = {
            'uu': uuid.uuid4(),
            'name': request.data.get('name', None),
            'phone': request.data.get('phone', None),
            'email': request.data.get('email', None),
            'image': request.FILES.get("file", None),
            'age': request.data.get('age', None),
            'adhaar_num': request.data.get('adhaar_num', None),
            'gender': request.data.get('gender', None),
        }
        password = request.data.get('password', None)
        obj = Patient.objects.create(**data)
        self.generate_profile_qr(obj.uu)
        self.create_user(obj.uu, password)
        return  msg_and_status_response("Patient created", status.HTTP_201_CREATED)

    def generate_profile_qr(self, uu):
        new_profile = Patient.objects.get(uu=uu)
        s = "www.geeksforgeeks.org/12345"
        url = pyqrcode.create(s)

        media_root = settings.MEDIA_ROOT
        qr_codes_folder = os.path.join(media_root, 'qr_codes')

        if not os.path.exists(qr_codes_folder):
            os.makedirs(qr_codes_folder)

        file_name = f"{new_profile.uu}.png"
        file_path = os.path.join(qr_codes_folder, file_name)

        try:
            url.png(file_path, scale=6)
            new_profile.profile_qr = os.path.relpath(file_path, media_root) 
            new_profile.save()
            print("QR Code saved successfully:", file_path)
        except Exception as e:
            print("Error saving QR Code:", e)


    def create_user(self, uu, password):
        new_profile = Patient.objects.get(uu=uu)
        user = {
            "username": new_profile.email,
            "password": password
        }
        Users.objects.create(**user)

@api_view(['GET'])
def view_profile(request):
    import uuid
    uu = uuid.UUID(request.GET.get('id'))
    profile = Patient.objects.get(uu= uu)
    return msg_and_status_response("Data retrived", status.HTTP_200_OK)
        
