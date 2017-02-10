import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes } from '@angular/router';
import { RouterModule} from "@angular/router";

import { ModalModule }  from 'ng2-modal';

import { AppComponent } from './app.component';

import { SpinnerService} from './spinner/spinner.service';
import { SpinnerComponent} from './spinner/spinner.component';

import { AuthService }    from './auth/auth.service';
import { SaveGuard } from "./auth/save-guard.service";

//----------------------------------------------------------------------------------------------

import { DummyComponent } from './dummy/dummy.component';
import { ChatVersionModule,ChatVersionList,ChatVersionDetail} from "./chat-version/chat-version.module";

import {ChatModule} from "./chat/chat.module"
import {ChatDashboardComponent}    from "./chat-dashboard/chat-dashboard.component";
import {ChatComponent}    from "./chat/chat.component";

import {ChatReportComponent}    from "./chat-report/list/chat-report.component";
import {ChatReportModule}    from "./chat-report/chat-report.module";

import {RulesEditorComponent}    from "./rules-editor/list/rules-editor.component";

import {VariableEditorList}    from "./variable-editor/list/variable-editor-list.component";
import {VariableEditorDetail}    from "./variable-editor/detail/variable-editor-detail.component";
import {VariableEditorModule}    from "./variable-editor/variable-editor.module";

import {GlobalVariableEditorModule} from "./global-variable-editor/global-variable-editor.module"
import {GlobalVariableEditorList}    from "./global-variable-editor/list/global-variable-editor-list.component";
import {GlobalVariableEditorDetail}    from "./global-variable-editor/detail/global-variable-editor-detail.component";

import {LocalVariableEditorModule} from "./local-variable-editor/local-variable-editor.module"
import {LocalVariableEditorList}    from "./local-variable-editor/list/local-variable-editor-list.component";
import {LocalVariableEditorDetail}    from "./local-variable-editor/detail/local-variable-editor-detail.component";

import {QuestionEditorComponent}    from "./question-editor/list/question-editor.component";
import {QuestionDetailComponent}    from "./question-editor/detail/question-editor-detail.component";
import {QuestionEditorModule} from './question-editor/question-editor.module'

import {RulesEditorModule} from './rules-editor/rules-editor.module';
import {RuleDetailComponent} from './rules-editor/detail/rule-editor-detail.component'

import {DictionaryEditorModule} from './dictionary/dictionary-editor.module'
import {DictionaryEditorList} from './dictionary/list/dictionary-editor-list.component'

import { Ng2UploaderModule } from 'ng2-uploader';

const ROUTES: Routes = [
    { path: '', redirectTo: 'chat_dashboard', pathMatch: 'full' },
    { path: 'app',  component: DummyComponent},
    { path: 'chat_version', component: ChatVersionList },
    { path: 'chat_version/:id', component: ChatVersionDetail, canDeactivate: [SaveGuard]},
    {path: 'chat_version', component: ChatVersionList},
    {path: 'chat_dashboard', component: ChatDashboardComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'chat_report', component: ChatReportComponent},
    {path: 'question_editor/:id', component: QuestionEditorComponent},
    {path: 'question_detail/:id', component: QuestionDetailComponent},
    {path: 'rule_detail/:id', component: RuleDetailComponent},
    {path: 'variable_editor', component: VariableEditorList},
    {path: 'variable_editor/:id', component: VariableEditorDetail, canDeactivate: [SaveGuard]},
    {path: 'global_variable', component: GlobalVariableEditorList},
    {path: 'global_variable/:id', component: GlobalVariableEditorDetail, canDeactivate: [SaveGuard]},
    {path: 'local_variable', component: LocalVariableEditorList},
    {path: 'local_variable/:id', component: LocalVariableEditorDetail, canDeactivate: [SaveGuard]},
    {path: 'dictionaries', component: DictionaryEditorList},
    //{path: 'chat_version/:id', component: ChatVersionDetail},
//    { path: ':id', component: AddressDetail, },
];

//----------------------------------------------------------------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    DummyComponent,
      ChatDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
      Ng2UploaderModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),

    ChatVersionModule,
      VariableEditorModule,
      ChatModule,
      GlobalVariableEditorModule,
      LocalVariableEditorModule,
      QuestionEditorModule,
      RulesEditorModule,
      ChatReportModule,
      DictionaryEditorModule
  ],
  providers: [SpinnerService, AuthService, SaveGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
