import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatCardModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatGridListModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
  ]
})
export class MaterialModule {}
