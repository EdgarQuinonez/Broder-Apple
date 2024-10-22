import { Component } from '@angular/core';
import {
  LucideAngularModule,
  XIcon,
  SearchIcon,
  PlusIcon,
  ChevronRightIcon,
} from 'lucide-angular';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { InventoryProduct, Product } from '@types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss',
})
export class SaleComponent {
  XIcon = XIcon;
  ChevronRightIcon = ChevronRightIcon;
  SearchIcon = SearchIcon;
  PlusIcon = PlusIcon;

  searchProductsForm = new FormGroup({
    searchQuery: new FormControl(''),
  });

  searchResults$!: Observable<InventoryProduct[]>;
  selectedResult: InventoryProduct | null = null;
  selectedResultId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.searchResults$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedResultId = Number(params.get('id'));
        const inventoryProducts = this.productsService.getInventory();
        if (this.selectedResultId) {
          this.selectedResult =
            inventoryProducts.find(
              (product) => product.productID === this.selectedResultId
            ) ?? null;
        } else if (inventoryProducts.length > 0) {
          this.selectedResult = inventoryProducts[0];
          this.selectedResultId = inventoryProducts[0].productID;
        }
        return of(inventoryProducts);
      })
    );

    // TODO: address getInventory performance concerns

    this.searchProductsForm.valueChanges.subscribe((values) => {
      const searchQuery = values.searchQuery;

      if (!searchQuery) {
        this.searchResults$ = of(this.productsService.getInventory());
        return;
      }

      // TODO: Search using multiple product properties not only title
      this.searchResults$ = of(
        this.productsService
          .getInventory()
          .filter((InventoryProduct) =>
            InventoryProduct.product.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
      );
    });
  }

  handleInputChange(event: any, productId: number): void {
    this.selectedResultId = productId;
    this.selectedResult =
      this.productsService
        .getInventory()
        .find((product) => product.productID === productId) ?? null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: productId },

      queryParamsHandling: 'merge',
    });
  }
  selectProduct(productID: number) {
    this.selectedResultId = productID;
  }

  navigateToDetail(): void {
    if (this.selectedResultId !== null) {
      this.router.navigate([`/operation/sale/${this.selectedResultId}`]);
    }
  }
}
