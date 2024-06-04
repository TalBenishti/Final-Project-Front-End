import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimations(), provideFirebaseApp(() => initializeApp({ "projectId": "little-linguist-fa9ec", "appId": "1:267904242090:web:6c9d526957b5496a1bdbd3", "storageBucket": "little-linguist-fa9ec.appspot.com", "apiKey": "AIzaSyAoi3F3r8DnyJihLEbCC1toYsIrSByMmKQ", "authDomain": "little-linguist-fa9ec.firebaseapp.com", "messagingSenderId": "267904242090" })), provideFirestore(() => getFirestore())]
};
