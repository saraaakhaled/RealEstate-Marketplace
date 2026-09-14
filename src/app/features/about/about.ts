import { Component } from '@angular/core';

import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    Navbar,
    Footer
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
