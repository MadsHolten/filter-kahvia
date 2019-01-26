import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';

// 3rd party modules
// import { MeshViewerModule } from 'ng-mesh-viewer';                    // NPM version
import { MeshViewerModule } from './modules/ng-mesh-viewer.module';   // Local version

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MeshViewerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
