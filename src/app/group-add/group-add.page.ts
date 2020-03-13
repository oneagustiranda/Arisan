import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { UtilsService } from '../services/utils.service';
import { GroupService } from '../services/group.service';
import * as moment from 'moment';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.page.html',
  styleUrls: ['./group-add.page.scss'],
})
export class GroupAddPage implements OnInit {
  group: any = {}
  constructor(
    private modalCtrl: ModalController,
    private utils: UtilsService,
    private groupService:GroupService
  ) { }

  ngOnInit() {
  }

  submit(){
    
    this.group.endDate = moment().add(this.group.period, 'days').format();
    this.groupService.createGroup(this.group).subscribe((response) =>{
      console.log(response);
      this.utils.showToast('Berhasil Ditambahkan');
      this.modalCtrl.dismiss();
    }, (err) => {
      console.log(JSON.stringify(err));
      this.utils.showToast('Terjadi Kesalahan');
    });
  }
  closePage(){
    this.modalCtrl.dismiss();
  
  }

}
