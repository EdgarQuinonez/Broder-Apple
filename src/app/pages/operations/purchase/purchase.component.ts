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
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../providers/products.service';
import { Product } from '@types';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [
    LucideAngularModule,
    ButtonPrimaryComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  XIcon = XIcon;
  ChevronRightIcon = ChevronRightIcon;
  SearchIcon = SearchIcon;
  PlusIcon = PlusIcon;

  searchProductsForm = new FormGroup({
    searchQuery: new FormControl(''),
  });

  searchResults$!: Observable<Product[]>;
  selectedResult: Product | null = null;
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
        const products = this.productsService.getAllProducts();
        if (this.selectedResultId) {
          this.selectedResult =
            products.find((product) => product.id === this.selectedResultId) ??
            null;
        } else if (products.length > 0) {
          this.selectedResult = products[0];
          this.selectedResultId = products[0].id;
        }
        return of(products);
      })
    );

    // TODO: address getAllProducts performance concerns

    this.searchProductsForm.valueChanges.subscribe((values) => {
      console.log(values);

      // if (!searchQuery) {
      //   this.searchResults$ = of(this.productsService.getAllProducts());
      //   return;
      // }
      // this.searchResults$ = of(
      //   this.productsService
      //     .getAllProducts()
      //     .filter((product) =>
      //       product.title.toLowerCase().includes(searchQuery.toLowerCase())
      //     )
      // );
    });
  }

  handleSubmitSearch(): void {}

  handleInputChange(event: any, productId: number): void {
    this.selectedResultId = productId;
    this.selectedResult =
      this.productsService
        .getAllProducts()
        .find((product) => product.id === productId) ?? null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: productId },

      queryParamsHandling: 'merge',
    });
  }

  navigateToDetail(): void {
    if (this.selectedResultId !== null) {
      this.router.navigate([`/operation/purchase/${this.selectedResultId}`]);
    }
  }
}
