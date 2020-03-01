import { Component } from '@angular/core';
import { GroupService } from '../services/group.service';
import { UtilsService } from '../services/utils.service';
import { ModalController, AlertController} from '@ionic/angular';
import { GroupAddPage } from '../group-add/group-add.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groups: any = [];
  constructor(
    private groupService: GroupService,
    private utils: UtilsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController

    ) {}
  
  //Tampilkan data users
  getData(){
    this.groupService.getAllGroup().subscribe(
      (response) => {
        console.log(response);
        this.groups = response;
      },
      (err) =>{
        this.groups = [];
        console.log(JSON.stringify(err));
        this.utils.showToast('Terjadi Kesalahan');
      }
    );
  }

  //otomatis panggil getData() ketika buka page
  ionViewWillEnter(){
    this.getData();
  }

  doRefresh(event){
    this.getData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  
  async goAdd(){
    const modal = await this.modalCtrl.create({
      component: GroupAddPage
    });
    modal.onWillDismiss().then(() => {
      this.getData();
    });
    return await modal.present();
  }

  async delete(group){
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin akan menghapus group <strong>' + group.name + '</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (lol) => {
            console.log('cancel' + lol);
          }
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.groupService.deleteGroup(group.id).subscribe((response) =>{
              console.log(response);
              this.utils.showToast('Berhasil DiHapus');
              this.getData();
            }, (err) => {
              console.log(JSON.stringify(err));
              this.utils.showToast('Terjadi Kesalahan');
            });
          }
        }
      ]
    });
    alert.present();
  }
  
}
