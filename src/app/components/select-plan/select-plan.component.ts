import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/models/Plan';


@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css']
})
export class SelectPlanComponent implements OnInit {
  plan_id:string;
  planes:Plan[]=[];
  @Input() multiple:boolean=false;
  @Output() obtenerPlanEvent= new EventEmitter<any>();
  constructor(public planService:PlanService) {
    this.planService.obtenerPlanes().subscribe((res)=>{
      this.planes= res as Plan[];
      if(this.multiple==false){
        this.plan_id= this.planes[0]._id;
        this.seleccionarPlan();
      }
    },error=>console.log(error));

   }

  ngOnInit() {
  }

  seleccionarPlan(){
    this.obtenerPlanEvent.emit(this.plan_id);
  }

}
