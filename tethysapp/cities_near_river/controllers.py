from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from tethys_sdk.gizmos import Button


@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    # btnCalculate = Button(display_text="Run HydroProspector",
    #                     name="btnCalculate",
    #                     attributes="onclick=app.run_service()",
    #                     submit=False)

    context = { }

    return render(request, 'cities_near_river/home.html', context)