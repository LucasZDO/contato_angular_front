import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contato } from '../contatos';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contatos',
  standalone: false,
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css',
})
export class ContatosComponent {
  contatos: Contato[] = [];
  formGroupContato: FormGroup;
  isEditing: boolean = false;

  constructor(
    private service: ContatoService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupContato = formBuilder.group({
      id: [''],
      name: [''],
      telephone: [''],
      email: [''],
      age: [''],
      maritalStatus: [''],
      RG: [''],
      CPF: [''],
      profession: [''],
      address: [''],
      dateOfBirth: [''],
      category: [''],
      favorite: [false],
    });
  }

  ngOnInit(): void {
    this.loadContatos();
  }

  loadContatos() {
    this.service.getAll().subscribe({
      next: (json) => (this.contatos = json),
    });
  }

  save() {
    this.service.save(this.formGroupContato.value).subscribe({
      next: (json) => {
        this.contatos.push(json);
        this.formGroupContato.reset();
      },
    });
  }

  delete(contatos: Contato) {
    this.service.delete(contatos).subscribe({
      next: () => this.loadContatos(),
    });
  }

  onClickUpdate(contatos: Contato) {
    this.isEditing = true;
    this.formGroupContato.setValue(contatos);
  }

  update() {
    this.service.update(this.formGroupContato.value).subscribe({
      next: () => {
        this.loadContatos();
        this.clear();
      },
    });
  }

  clear() {
    this.isEditing = false;
    this.formGroupContato.reset();
  }
}
