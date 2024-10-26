import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
    {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'addProduct',
        component: ProductFormComponent
      },
      

      {
        path: '',
        redirectTo: '/product-list',
        pathMatch: 'full',
      },
];
