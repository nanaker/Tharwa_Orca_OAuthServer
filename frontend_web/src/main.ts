import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {LogModule} from './log/log.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}



//platformBrowserDynamic().bootstrapModule(AppModule)
//  .catch(err => console.log(err));

platformBrowserDynamic().bootstrapModule(LogModule)
  .catch(err => console.log(err));
