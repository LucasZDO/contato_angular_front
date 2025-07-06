import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from '../contatos';

@Component({
  selector: 'app-filtros',
  standalone: false,
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent implements OnInit {
  contatos: Contato[] = [];
  filtroForm: FormGroup;

  constructor(private fb: FormBuilder, private contatoService: ContatoService) {
    this.filtroForm = this.fb.group({
      name: [''],
      telephone: [''],
      email: [''],
      category: [''],
      favorite: [false],
    });
  }

  ngOnInit(): void {
    this.buscarContatos();
  }

  buscarContatos(): void {
    const filtros = this.filtroForm.value;

    // Remove campos vazios ou nulos
    const params: any = {};
    Object.keys(filtros).forEach((key) => {
      const val = filtros[key];
      if (val !== null && val !== '' && val !== false) {
        params[key] = val;
      }
    });

    this.contatoService.listarContatosComFiltro(params).subscribe((data) => {
      this.contatos = data;
    });
  }

  alternarFavorito(contatos: Contato): void {
    this.contatoService
      .alternarFavorito(contatos.id, !contatos.favorite)
      .subscribe(() => {
        contatos.favorite = !contatos.favorite;
      });
  }
}
