import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

import { MyService } from './services/my.service';
import { EventService } from './services/event.service';
import { MemberService } from './services/member.service';
import { RememberService } from './services/remember.service';
import { UpdateEventDialogComponent } from './dialogs/update-event/update-event.dialog.component';
import { DeleteEventDialogComponent } from './dialogs/delete-event/delete-event.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { WorkService } from './services/work.service';
import { ToastrModule } from 'ngx-toastr';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
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
import { DeleteMemberDialogComponent } from './dialogs/delete-member/delete-member.dialog.component';
import {AddMemberDialogComponent} from './dialogs/add-member/add-member.dialog.component';
import { EditMemberDialogComponent } from './dialogs/edit-member/edit-member.dialog.component';
import { AddEventDialogComponent } from './dialogs/add-event/add-event.dialog.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminHallComponent } from './Adminpanel/admin-hall/admin-hall.component';
import { AdminAddHallComponent } from './adminpanel/Dialogs/admin-add-hall/admin-add-hall.component';
import { AdminEditHallComponent } from './adminpanel/Dialogs/admin-edit-hall/admin-edit-hall.component';
import { AdminDepartmentComponent } from './adminpanel/admin-department/admin-department.component';
import { AdminUpdateDeptComponent } from './adminpanel/Dialogs/admin-update-dept/admin-update-dept.component';
import { AdminAddDeptComponent } from './adminpanel/Dialogs/admin-add-dept/admin-add-dept.component';

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
    DeleteDialogComponent,
    DeleteMemberDialogComponent,
    AddMemberDialogComponent,
    EditMemberDialogComponent,
    DeleteEventDialogComponent,
    AddEventDialogComponent,
    UpdateEventDialogComponent,
    AdminpanelComponent,
    AdminHallComponent,
    AdminAddHallComponent,
    AdminEditHallComponent,
    AdminDepartmentComponent,
    AdminUpdateDeptComponent,
    AdminAddDeptComponent
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
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'Danger'}),
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
      {path: 'sidebar', component: SidebarComponent},
      {path: 'admin', component: AdminpanelComponent,
        children: [
          {path: '', component: AdminHallComponent},
          // {path: 'admin-hall', component: AdminHallComponent},
          { path: 'add-event', component: AddEventComponent},
          {path: 'add-hall', component: AdminAddHallComponent},
          {path: 'update-hall/:id', component: AdminEditHallComponent},
          {path: 'department', component: AdminDepartmentComponent},
          {path: 'add-dept', component: AdminAddDeptComponent},
          {path: 'department/update-dept/:id', component: AdminUpdateDeptComponent},
          {path: 'add-members', component: AddMembersComponent},


        ]},



      { path: 'login/admin-menu', component: AdminMenuComponent ,
        children: [
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
    DeleteDialogComponent,
    DeleteMemberDialogComponent,
    AddMemberDialogComponent,
    EditMemberDialogComponent,
    DeleteEventDialogComponent,
    AddEventDialogComponent,
    UpdateEventDialogComponent,
    // all entry for adminpanel/Dialogs
  ],
  providers: [WorkService, RememberService, MemberService, EventService, MyService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }

