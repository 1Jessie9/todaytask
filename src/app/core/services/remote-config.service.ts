// src/app/core/services/remote-config.service.ts
import { Injectable, signal } from '@angular/core';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private defaults = {
    show_new_banner: false,
  };

  readonly showNewBannerSignal = signal<boolean>(this.defaults.show_new_banner);
  private initialized = false;

  constructor(
    private platform: Platform,
    private firebaseX: FirebaseX,
  ) {
    this.init();
  }

  private async init() {
    if (this.initialized) return;

    await this.platform.ready();

    if (!(window as any).cordova) {
      console.warn('[RemoteConfig] Cordova no disponible, uso defaults');
      this.initialized = true;
      return;
    }

    try {
      await this.firebaseX.setDefaults(this.defaults);
      await this.firebaseX.fetch(0);
      const rawValue = await this.firebaseX.getValue('show_new_banner');
      const flag = rawValue === true;
      this.showNewBannerSignal.set(flag);
      this.initialized = true;
    } catch (err) {
      this.initialized = true;
    }
  }

  get showNewBanner(): boolean {
    return this.showNewBannerSignal();
  }
}
