import { Component } from '@angular/core';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { ModalController, AlertController} from '@ionic/angular';
import { GroupAddPage } from '../group-add/group-add.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groups: any = [];
  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private utils: UtilsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
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
  goDetail(group){
    console.log('id:' + group.id);
    this.router.navigate(['/group-detail/' + group.id]);
  }
  async delete(group){
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin akan menghapus group <strong>' + group.name + '</strong> dan menghapus semua user yang terdaftar di group ini',
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
              
              this.getData();
            }, (err) => {
              console.log(JSON.stringify(err));
              
            });
            this.userService.deleteUserByGroup(group.id).subscribe((response) =>{
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
