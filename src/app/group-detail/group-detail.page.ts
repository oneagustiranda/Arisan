import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { mainUrl } from '../services/config';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
})
export class GroupDetailPage implements OnInit {
  group: any = {};
  users: any = [];
  groupId = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private router: Router,
    private userService: UserService
  ) { }

  getData(){
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.groupService.getGroup(this.groupId).subscribe((response) =>{
      this.group = response;
      this.group.images = mainUrl + '/img/' + this.group.images;
      console.log(this.group);
    })
  }

  getUsersData(){
    this.userService.getAllUsersWithGroup(this.groupId).subscribe((response) =>{
      this.users = response;
      console.log(this.users);
    })
  }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.getData();
    this.getUsersData();
  }
}
