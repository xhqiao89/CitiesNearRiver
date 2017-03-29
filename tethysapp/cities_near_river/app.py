from tethys_sdk.base import TethysAppBase, url_map_maker


class CitiesNearRiver(TethysAppBase):
    """
    Tethys app class for Cities Near River.
    """

    name = 'Cities Near River'
    index = 'cities_near_river:home'
    icon = 'cities_near_river/images/icon.gif'
    package = 'cities_near_river'
    root_url = 'cities-near-river'
    color = '#9b59b6'
    description = ''
    tags = ''
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='cities-near-river',
                           controller='cities_near_river.controllers.home'),
        )

        return url_maps