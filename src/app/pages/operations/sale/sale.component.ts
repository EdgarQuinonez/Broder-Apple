import { Component } from '@angular/core';
import {
  LucideAngularModule,
  XIcon,
  SearchIcon,
  PlusIcon,
  ChevronRightIcon,
} from 'lucide-angular';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../providers/products.service';
import { Product } from '@types';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss',
})
export class SaleComponent {
  XIcon = XIcon;
  ChevronRightIcon = ChevronRightIcon;
  SearchIcon = SearchIcon;
  PlusIcon = PlusIcon;

  searchTerm: string = '';
  searchResults: { id: number; title: string; price: number }[] = [];
  selectedResult: any = null;
  allProducts: Product[] = [];

  selectedResultId: number | null = null;
  fragment$!: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.allProducts = this.productsService.getAllProducts();
  }

  ngOnInit() {
    this.searchResults = [...this.allProducts];

    this.route.queryParams.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.selectedResult = this.allProducts.find(
          (product) => product.id === +productId
        );
        this.selectedResultId = +productId;
      }
    });

    this.fragment$ = this.route.fragment;
  }

  onSearchChange(event: any) {
    const searchValue = event.target.value.trim().toLowerCase();

    if (searchValue === '') {
      this.searchResults = [...this.allProducts];
    } else {
      this.searchResults = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue)
      );
    }
  }

  handleInputChange(event: any, productId: number): void {
    this.selectedResultId = productId;
    this.selectedResult = this.allProducts.find(
      (product) => product.id === productId
    );

    // Update the query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: productId },
      fragment: 'product-details', // Optionally set a fragment
      queryParamsHandling: 'merge', // Keep the existing query params
    });
  }

  navigateToDetail(): void {
    if (this.selectedResultId !== null) {
      this.router.navigate([`/operation/purchase/${this.selectedResultId}`]);
    }
  }
}
