import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ProductListComponent {


 
  pageSize = 10; 
  currentPage = 1;
  searchTerm = ''; 
  paginatedProducts:any = []
  constructor(private router: Router,
    private service:ApiService) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.paginatedProducts = this.getProductList(startIndex,10)
    }

    getProductList(startIndex:any,take:any,searchTerm?:any){
      this.service.getProductList(startIndex,10,searchTerm).subscribe((res:any)=>{
this.paginatedProducts = res.status ? res.response : [];
        return res.status?res.response:[];
      },(err:any)=>{
this.paginatedProducts = [];
        return []
      })
    }

  filteredProducts():any {

    this.paginatedProducts= this.getProductList(0,10,this.searchTerm)
    return this.paginatedProducts
    // return this.products.filter(product => 
    //   product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //   product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    // );
  }

  // get paginatedProducts():any {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   // take = 10 skip 0
  //   return this.getProductList(startIndex,10)
  //   // return [] || this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  // }

  totalPages() {
    return Math.ceil(this.filteredProducts?.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  goToAddProduct() {
    this.router.navigate(['/addProduct']); // Navigate to add product page
  }
}


interface ProductList{
  ProductId:number;
  Title:string;
  Description:string;
  Quantity:number;
  Price:number;
  Date:Date;
  Image:string;
  TotalRecords:number;
}

