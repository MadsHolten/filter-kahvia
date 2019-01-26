import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, MatDialogModule } from '@angular/material';

// FxFlex
import { FlexLayoutModule } from '@angular/flex-layout';

// App components
import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

// 3rd party modules
// import { MeshViewerModule } from 'ng-mesh-viewer';                    // NPM version
import { MeshViewerModule } from './modules/ng-mesh-viewer.module';   // Local version

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    MeshViewerModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    OverlayModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent]
})
export class AppModule { }
