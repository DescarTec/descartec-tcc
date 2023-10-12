import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/domain/services/account.service';
import { Address, AddressService } from 'src/app/domain/services/address.service';
import { AlertService } from 'src/app/domain/services/alert.service';
import { PositionTrackingService } from 'src/app/domain/services/position-tracking.service';
import { RotaService } from 'src/app/domain/services/rota.service';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.scss']
})
export class RotaComponent {
  listCep: string[] = [];
  address: Address | null = null;
  form!: FormGroup;
  submitted = false;
  iniciarRotaB = false;
  erroTempo = false;
  erroLista = false;
  constructor(
    private formBuilder: FormBuilder,
    private positionTrackingService: PositionTrackingService,
    private rotaService: RotaService,
    private addressService: AddressService,
    private alertService: AlertService,
    private accountService: AccountService,
    private router: Router
  ) {

    if (this.accountService.currentUser.discriminator != "ColetorUser") {
      this.router.navigate(['/']);
    }
  }

  async iniciarRota() {
    this.erroTempo = false;
    this.erroLista = false;
    this.iniciarRotaB = true;
    let tempo = this.form.get('tempo')?.value;

    if (tempo == undefined || tempo === "") {
      this.erroTempo = true;
    } 
    if (this.listCep.length === 0) {
      this.erroLista = false;
    }
    if (!this.erroLista && !this.erroLista) {
      await this.positionTrackingService.startPositionTracking();

      const [hours, minutes] = tempo.split(":").map(Number);
      const currentDate = new Date();
      const dataFim = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours() + hours,
        currentDate.getMinutes() + minutes
      )
      console.log(dataFim)

      await this.rotaService.iniciarRota(
        this.listCep,
        dataFim
      );
    }
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cep: ['', Validators.required,],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      tempo: ['']
    });

    this.form.get('cep')?.valueChanges.subscribe(value => {
      this.form.patchValue({
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
      });
      if (value && value.length === 8 && value.includes('-')) { return }
      if (value && value.length === 8) {
        //this.alertService.info('Buscando endereço...');
        this.addressService.getAddressByCep(value).subscribe({
          next: (address) => {
            this.address = address;
            if (!address.logradouro) {
              this.alertService.error('CEP não encontrado.');
              this.f['cep'].setErrors({ invalidCep: true });
              return;
            }
            this.f['cep'].setErrors(null);

            this.form.patchValue({
              logradouro: address.logradouro,
              bairro: address.bairro,
              localidade: address.localidade,
              uf: address.uf,
            });
          },
          error: (error) => {
            this.alertService.error(error);
            this.f['cep'].setErrors({ invalidCep: true });

          }
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    let cepFrom: string = this.form.get('cep')?.value
    if (this.listCep.includes(cepFrom)) { return this.alertService.info("Este CEP já existe na sua lista.") }
    this.listCep.push(cepFrom)
  }


  formatarCep(event: any) {
    let cep = event.target.value.replace(/\D/g, '');

    if (cep.length > 8) {
      cep = cep.substr(0, 8);
    }

    if (cep.length === 8) {
      event.target.value = `${cep.substr(0, 5)}-${cep.substr(5, 3)}`;
    } else {
      event.target.value = cep;
    }
  }
}
