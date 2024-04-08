from rest_framework.views import Response

def msg_and_status_response(message: str, status: str) -> Response:
    return Response({
        "message": message,
        "status": status
    })

def data_and_status_response(data: dict, status: str) -> Response:
    return Response({
        "data": data,
        "status": status
    })