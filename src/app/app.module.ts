import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';

import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { WorkService } from './services/work.service';
import { ToastrModule } from 'ngx-toastr';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RememberComponent } from './remember/remember.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SearchComponent } from './search/search.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AddHallComponent } from './add-hall/add-hall.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { AddEventComponent } from './add-event/add-event.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { FooterComponent } from './footer/footer.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { HttpClientModule } from '@angular/common/http';
import { connect } from 'http2';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MembersComponent,
    HomeComponent,
    RememberComponent,
    EventsComponent,
    LoginComponent,
    UserLoginComponent,
    SearchComponent,
    EventDetailsComponent,
    MemberDetailsComponent,
    AdminMenuComponent,
    AddHallComponent,
    AddMembersComponent,
    AddEventComponent,
    MemberFormComponent,
    FooterComponent,
    SidebarComponent,
    DialogBoxComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [

    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'members', component: MembersComponent,
          children: [
            {path: '', component: MemberDetailsComponent},
            {path: 'member-form', component: MemberFormComponent}

       ]},
      { path: 'remember', component: RememberComponent },
      { path: 'events', component: EventsComponent,
             children: [{path: 'event-details', component: EventDetailsComponent}

        ]},
      { path: 'login', component: LoginComponent },
      { path: 'user-login', component: UserLoginComponent },
      { path: 'search', component: SearchComponent },
      {path: 'footer', component: FooterComponent},
      { path: 'login/admin-menu', component: AdminMenuComponent ,
        children: [
          // { path: 'add-hall', component: AddHallComponent,
          //   children: [
          //     {path: 'sidebar', component: SidebarComponent}
          //   ]},
          // {path: 'add-members', component: AddMembersComponent,
          //   children: [
          //     {path: 'sidebar', component: SidebarComponent}
          //   ]},
          // {path: 'add-event', component: AddEventComponent,
          //   children: [
          //     {path: 'sidebar', component: SidebarComponent}
          //   ]}

          {path: 'sidebar', component: SidebarComponent},
          { path: 'add-hall', component: AddHallComponent},
          {path: 'add-members', component: AddMembersComponent},
          { path: 'add-event', component: AddEventComponent}


        ]},

    ])
  ],
  entryComponents: [
    DialogBoxComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [WorkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
