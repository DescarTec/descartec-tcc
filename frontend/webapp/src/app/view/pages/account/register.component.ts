import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../../domain/services/account.service';
import { AlertService } from '../../../domain/services/alert.service';
import { AddressService, Address } from 'src/app/domain/services/address.service';
import { SignUpDto } from 'src/app/models/dto/signUpDTO';
import { addressValidator, confirmPasswordValidator, passwordValidator } from '../../../utils/validators';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;
	showAddressFields = false;

	address: Address | null = null;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private accountService: AccountService,
		private alertService: AlertService,
		private addressService: AddressService
	) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			completeName: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			passwordConfirm: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			phoneNumber: ['', Validators.required],
			cep: ['', Validators.required, ],
			logradouro: ['', Validators.required],
			bairro: ['', Validators.required],
			localidade: ['', Validators.required],
			uf: ['', Validators.required]
		}, 
		{  
			validators: [
				confirmPasswordValidator('password', 'passwordConfirm'), 
				passwordValidator()
			] 
		});

		this.form.get('cep')?.valueChanges.subscribe(value => {
			if (value && value.length === 8 && value.includes('-')) { return }
			if (value && value.length === 8) {
				//this.alertService.info('Buscando endereço...');
				this.addressService.getAddressByCep(value).subscribe( { next: (address) => {
					this.address = address;
					if (!address.logradouro) {
						this.alertService.error('CEP não encontrado.');
						this.showAddressFields = false;
						this.f['cep'].setErrors({ invalidCep: true });
						return;
					}
					this.showAddressFields = true;
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
					this.showAddressFields = false;
					this.f['cep'].setErrors({ invalidCep: true });

				}			
			});
			} else {
				this.showAddressFields = false;
			}
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	onSubmit() {
		this.submitted = true;

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (this.form.invalid) {
			return;
		}
		
		this.loading = true;
		let user = new SignUpDto(this.form, this.address!) ;
		this.accountService.register(user)
			.pipe(first())
			.subscribe({
				next: () => {
					this.alertService.success('Registration successful', { keepAfterRouteChange: true });
					this.router.navigate(['../login'], { relativeTo: this.route });
				},
				error: error => {
					console.error(error)
					this.alertService.error(error.error);
					this.loading = false;
				}
			});
	}

	onPhoneKeyPress(event: any) {
		const pattern = /[0-9]/;
		const inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
		  event.preventDefault();
		} else {
		  const input = event.target as HTMLInputElement;
		  const inputLength = input.value.length;
		  if (inputLength === 0) {
			input.value = '(' + input.value;
		  }
		  if (inputLength === 3) {
			input.value = input.value + ') ';
		  }
		  if (inputLength === 10) {
			input.value = input.value + '-';
		  }
		}
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