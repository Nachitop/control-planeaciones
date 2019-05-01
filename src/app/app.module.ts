import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import {Routes,RouterModule} from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';
import {FormsModule} from '@angular/forms';
import { GrupoComponent } from './components/grupo/grupo.component';
import { SelectCarreraComponent } from './components/select-carrera/select-carrera.component'
import { CarreraService } from './services/carrera.service';
import { GrupoService } from './services/grupo.service';
import { ToastComponent } from './components/toast/toast.component';
import { MateriaComponent } from './components/materia/materia.component';
import { MateriaService } from './services/materia.service';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AlumnoService } from './services/alumno.service';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { SelectGrupoComponent } from './components/select-grupo/select-grupo.component';
import { PlanDeEstudioComponent } from './components/plan-de-estudio/plan-de-estudio.component';
import { ConverttoarrayPipe } from './pipes/converttoarray.pipe';
import { SelectMateriaComponent } from './components/select-materia/select-materia.component';
import { MateriacardComponent } from './components/materiacard/materiacard.component';
import { SelectPlanComponent } from './components/select-plan/select-plan.component';
import { VerplaneacionesComponent } from './components/verplaneaciones/verplaneaciones.component';
import { HorarioComponent } from './components/horario/horario.component';
import { VerHorarioComponent } from './components/ver-horario/ver-horario.component';
import { AreaacademicaComponent } from './components/areaacademica/areaacademica.component';
import { CompetenciaComponent } from './components/competencia/competencia.component';
import { ProgramaestudioComponent } from './components/programaestudio/programaestudio.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TreeviewModule } from 'ngx-treeview';
import { ProgramaestudiopdfComponent } from './components/programaestudiopdf/programaestudiopdf.component';
import { AvancesComponent } from './components/avances/avances.component';

const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'usuario',component:UsuarioComponent},
  {path:'alumno',component:AlumnoComponent},
  {path:'profesor',component:ProfesorComponent},
  {path:'grupo',component:GrupoComponent},
  {path:'materia',component:MateriaComponent},
  {path:'plan',component:PlanDeEstudioComponent},
  {path:'ver-plan',component:VerplaneacionesComponent},
  {path:'horario',component:HorarioComponent},
  {path:'ver-horario',component:VerHorarioComponent},
  {path:'area-academica',component:AreaacademicaComponent},
  {path:'competencia',component:CompetenciaComponent},
  {path:'programa-estudio',component:ProgramaestudioComponent},
  {path:'programa-estudio-pdf',component:ProgramaestudiopdfComponent},
  {path:'actividad',component:ActividadComponent},
  {path:'avances',component:AvancesComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UsuarioComponent,
    GrupoComponent,
    SelectCarreraComponent,
    ToastComponent,
    MateriaComponent,
    AlumnoComponent,
    ProfesorComponent,
    SelectGrupoComponent,
    PlanDeEstudioComponent,
    ConverttoarrayPipe,
    SelectMateriaComponent,
    MateriacardComponent,
    SelectPlanComponent,
    VerplaneacionesComponent,
    HorarioComponent,
    VerHorarioComponent,
    AreaacademicaComponent,
    CompetenciaComponent,
    ProgramaestudioComponent,
    ActividadComponent,
    ProgramaestudiopdfComponent,
    AvancesComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}), HttpClientModule,FormsModule,NgbModule, TreeviewModule.forRoot()
  ],
  providers: [UsuarioService,CarreraService, GrupoService,MateriaService,AlumnoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
