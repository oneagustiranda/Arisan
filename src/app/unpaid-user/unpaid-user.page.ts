import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-unpaid-user',
  templateUrl: './unpaid-user.page.html',
  styleUrls: ['./unpaid-user.page.scss'],
})
export class UnpaidUserPage implements OnInit {
  private groupId = '';
  users: any = [];
  myDate: String = new Date().toISOString();
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  
  getData(){
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter(){
    this.getData();
    this.getUsersData();
  }

  ionViewDidEnter(){
    this.getData();
    this.getUsersData();
  }
  getUsersData(){
    this.userService.getAllUsersWithGroupAndUnpaid(this.groupId).subscribe((response) =>{
      this.users = response;
      console.log(this.users);
    })
  }
  UpdateToPaidUser(groupId, username){
    this.userService.UpdateToPaidUser(groupId, username).subscribe((response) =>{
      this.users = response;
      console.log(this.users);
      this.getData();
      this.getUsersData();
    })
  }
}
