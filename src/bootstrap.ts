import { bootstrapModule } from '@onecx/angular-webcomponents'
import { environment } from 'src/environments/environment'
import { OneCXConcessionsModule } from './app/onecx-concessions-ui.remote.module'

bootstrapModule(OneCXConcessionsModule, 'microfrontend', environment.production)