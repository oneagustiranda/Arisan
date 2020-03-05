import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {
  private groupId = '';
  users: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private utils: UtilsService,
    private router: Router,
    private userService: UserService,
    private storage: Storage
    ) { }

  ngOnInit() {
  }

  getData(){
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter(){
    this.getData();
    console.log(this.groupId);
  }

  submit(){
    this.users.group_id = this.groupId;
    console.log(this.users.group);
    this.users.img = 'user.png';
    this.router.navigate(['/group-detail/' + this.groupId]);
    this.userService.createUser(this.users).subscribe((response) =>{
      console.log(response);
      this.utils.showToast('Berhasil Ditambahkan');
    }, (err) => {
      console.log(JSON.stringify(err));
      this.utils.showToast('Terjadi Kesalahan');
    });
  }

}
