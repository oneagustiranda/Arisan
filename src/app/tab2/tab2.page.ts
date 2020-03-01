import { Component } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  users: any = [];
  constructor(private userService: UserService) {}

  
  //Tampilkan data users
  getData(){
    this.userService.getAllUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (err) =>{
        this.users = [];
        console.log(JSON.stringify(err));
       
      }
    );
  }

  //otomatis panggil getData() ketika buka page
  ionViewWillEnter(){
    this.getData();
  }
}
