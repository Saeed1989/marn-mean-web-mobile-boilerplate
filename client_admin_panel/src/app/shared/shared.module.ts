import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/organisms/menu/menu.component';
import { PageNotFoundComponent } from './components/organisms/no-page/page-not-found.component';
import { LoadingIndicatorComponent } from './components/organisms/loading-indicator/loading-indicator.component';
import { CategoryTreeComponent } from './components/organisms/category-tree/category-tree.component';
import { CategoryViewComponent } from './components/molecules/cat-view/category-view.component';
import { LoadingOverlayComponent } from './components/organisms/loading-overlay/loading-overlay.component';
import { ListCard } from './components/organisms/list-card/list-card.component';
import { EditCard } from './components/organisms/edit-card/edit-card.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    MenuComponent,
    PageNotFoundComponent,
    LoadingIndicatorComponent,
    CategoryTreeComponent,
    CategoryViewComponent,
    LoadingOverlayComponent,
    ListCard,
    EditCard
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuComponent,
    PageNotFoundComponent,
    LoadingIndicatorComponent,
    CategoryTreeComponent,
    LoadingOverlayComponent,
    ListCard,
    EditCard
  ],
})
export class SharedModule {}
