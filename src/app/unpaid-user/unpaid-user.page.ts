import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { TransactionService } from '../services/transaction.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-unpaid-user',
  templateUrl: './unpaid-user.page.html',
  styleUrls: ['./unpaid-user.page.scss'],
})
export class UnpaidUserPage implements OnInit {
  private groupId = '';
  users: any = [];
  transaction: any = {};
  myDate: String = new Date().toISOString();
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private transactionService: TransactionService,
    private router: Router,
    private utils: UtilsService
  ) { }

  ngOnInit() {
  }

  submitTransaction(){
    this.transaction.username = this.users.username;
    console.log("transaksi :" + this.transaction);
    this.transaction.group_id = this.groupId;
    this.transaction.date = this.myDate;
    this.transaction.status = 'paid';
    this.transactionService.createTransaction(this.transaction).subscribe((response) =>{
      console.log(response);
      this.utils.showToast('Transaksi Berhasil');
    }, (err) => {
      console.log(JSON.stringify(err));
      this.utils.showToast('Terjadi Kesalahan');
    });
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
      this.submitTransaction();
    })
  }
}
