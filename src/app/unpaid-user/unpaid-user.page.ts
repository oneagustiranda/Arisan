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
  UpdateToPaidUser(groupId){
    this.userService.UpdateToPaidUser(groupId).subscribe((response) =>{
      this.users = response;
      console.log(this.users);
      this.getData();
      this.getUsersData();
    })
  }
}
