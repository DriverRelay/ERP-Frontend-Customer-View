import {Component, ElementRef, HostListener, inject, Signal, signal, ViewChild, WritableSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {applicationStore} from '../store/application.store';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  private readonly applicationStore = inject(applicationStore);
  protected readonly isSignedIn: Signal<boolean> = this.applicationStore.signedIn;

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;
  @ViewChild('toggleButton') dropdownButton!: ElementRef;
  @ViewChild('mobileNavContainer') mobileNavContainer!: ElementRef;
  @ViewChild('mobileToggleButton') mobileToggleButton!: ElementRef;
  @ViewChild('mobileToggleButton2') mobileToggleButton2!: ElementRef;

  isDropdownOpen: WritableSignal<boolean> = signal(false);
  isMobileMenuOpen = signal<boolean>(false);
  isServiceDropDownOpen = signal<boolean>(false);

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    this.isServiceDropDownOpen.set(false);
  }

  toggleServiceDropDownOpen() {
    this.isServiceDropDownOpen.set(!this.isServiceDropDownOpen());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isDropdownOpen()) {
      const clickedInsideContainer = this.dropdownContainer.nativeElement.contains(event.target);
      const clickedOnButton = this.dropdownButton.nativeElement.contains(event.target);

      if (!clickedInsideContainer && !clickedOnButton) {
        this.isDropdownOpen.set(false);
      }
    }

    if(this.isMobileMenuOpen()) {
      const clickedInsideContainer = this.mobileNavContainer.nativeElement.contains(event.target);
      const clickedOnButton1 = this.mobileToggleButton.nativeElement.contains(event.target);
      const clickedOnButton2 = this.mobileToggleButton2.nativeElement.contains(event.target);

      if (!clickedInsideContainer && (!clickedOnButton1  || !clickedOnButton2)) {
        this.isMobileMenuOpen.set(false);
        this.isServiceDropDownOpen.set(false);
      }
    }
  }
}
