import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from '../contatos';

@Component({
  selector: 'app-filtros',
  standalone: false,
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent {

  contatos: Contato[] = [];
  filtroForm: FormGroup;

  constructor(private fb: FormBuilder, private contatoService: ContatoService) {
    this.filtroForm = this.fb.group({
      name: [''],
      telephone: [''],
      email: [''],
      age: [''],
      maritalStatus: [''],
      rg: [''],
      cpf: [''],
      profession: [''],
      address: [''],
      dateOfBirth: [''],
      category: [''],
      favorite: [false],
    });
  }


  // localhost:8080/contatos?nome-do-parametro=valor-do-parametro?nome-do-parametro=valor-do-parametro
  // localhost:8080/contatos?name=lucas?telephone=18379841379
  buscarContatos(): void {

    // preciso pegar o valor do formGroup
    let filtros: { [key: string]: any } = {};

    // determinar  quais campos tem valores, ou seja, quais nao sao nulos ou vazios
    Object.keys(this.filtroForm.value).forEach(key => {
      let valorDoCampo = this.filtroForm.value[key];
      if (valorDoCampo !== '') {
        filtros[key] = valorDoCampo;
      }
    });

    console.log(this.filtroForm.value);

    // chamar o serviço e construir a url
    this.contatoService.listarContatosComFiltro(filtros).subscribe({
      next: (response) => {
        this.contatos = response; // pegar o resultado
        console.log(response);
      },
      error: (err) => {
        console.log(err)
      }
    });

  }

  resetForm(): void {
    this.filtroForm.reset();
  }
}
