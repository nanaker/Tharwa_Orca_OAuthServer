import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { Page2RoutingModule } from "./page2-routing.module";
import { Page2Component } from "./page2.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        Page2RoutingModule,
        SharedModule
    ],
    declarations: [
        Page2Component
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class Page2Module { }
