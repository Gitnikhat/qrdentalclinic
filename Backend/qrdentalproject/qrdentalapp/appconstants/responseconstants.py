from rest_framework.views import Response

def msg_and_status_response(message, status):
    return Response({
        "message": message,
        "status": status
    })