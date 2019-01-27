import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { MatToolbarModule, MatIconModule, 
         MatMenuModule, MatButtonModule,
         MatDialogModule, MatTableModule,
         MatSortModule, MatInputModule, MatSlideToggleModule,
         MatAutocompleteModule, MatFormFieldModule } from '@angular/material';

// FxFlex
import { FlexLayoutModule } from '@angular/flex-layout';

// App components
import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog.component';
import { QueryDialogComponent } from './components/dialogs/query-dialog.component';
import { HeatingTableComponent } from './heating-table/heating-table.component';

// Pipes
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { PrefixPipe } from './pipes/prefix.pipe';

// Modules
import { MeshViewerModule } from './modules/ng-mesh-viewer/ng-mesh-viewer.module';
import { PlanModule } from './modules/ng-plan/plan.module';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    ToolbarComponent,
    MessageDialogComponent,
    HeatingTableComponent,
    QueryDialogComponent,
    PrefixPipe
  ],
  imports: [
    BrowserModule,
    MeshViewerModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    PlanModule,
    MatMenuModule,
    OverlayModule,
    MatAutocompleteModule,
    MatDialogModule,
    MarkdownToHtmlModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MarkdownToHtmlModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MessageDialogComponent, PopupComponent, QueryDialogComponent]
})
export class AppModule { }
