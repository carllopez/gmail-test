import httplib2

from django.views.generic.base import TemplateView

from apiclient import discovery
from oauth2client.client import AccessTokenCredentials
from social.apps.django_app.default.models import UserSocialAuth

class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)

        if not self.request.user.is_anonymous:
            user_social_auth = UserSocialAuth.objects.get(user=self.request.user)
            credentials = AccessTokenCredentials(user_social_auth.extra_data['access_token'],
                'my-user-agent/1.0')
            http = httplib2.Http()
            http = credentials.authorize(http)
            service = discovery.build('gmail', 'v1', credentials=credentials)
            results = service.users().messages().list(userId='me').execute()
            messages = []
            for result in results['messages'][:100]:
                
                msg = service.users().messages().get(userId='me', id=result['id']).execute()
                subject = ''
                _from = ''
                for header in msg['payload']['headers']:
                    if header['name'] == 'Subject':
                        subject = header['value']
                    elif header['name'] == 'From':
                        _from = header['value']
                messages.append({'subject': subject, 'from': _from})
            context['messages'] = messages

        context['user'] = self.request.user
        return context