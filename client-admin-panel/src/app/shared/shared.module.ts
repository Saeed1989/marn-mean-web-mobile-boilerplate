import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/organisms/menu/menu.component';
import { PageNotFoundComponent } from './components/organisms/no-page/page-not-found.component';
import { LoadingIndicatorComponent } from './components/organisms/loading-indicator/loading-indicator.component';
import { CatagoryTreeComponent } from './components/organisms/catagory-tree/catagory-tree.component';
import { CatagoryViewComponent } from './components/molecules/cat-view/catagory-view.component';
import { LoadingOverlayComponent } from './components/organisms/loading-overlay/loading-overlay.component';
import { ListCard } from './components/organisms/list-card/list-card.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    MenuComponent,
    PageNotFoundComponent,
    LoadingIndicatorComponent,
    CatagoryTreeComponent,
    CatagoryViewComponent,
    LoadingOverlayComponent,
    ListCard,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuComponent,
    PageNotFoundComponent,
    LoadingIndicatorComponent,
    CatagoryTreeComponent,
    LoadingOverlayComponent,
    ListCard
  ],
})
export class SharedModule {}
