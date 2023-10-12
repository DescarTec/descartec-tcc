import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from 'src/app/domain/services/account.service';
import { Address, AddressService } from 'src/app/domain/services/address.service';
import { AlertService } from 'src/app/domain/services/alert.service';
import { SignUpDto } from 'src/app/models/dto/signUpDTO';
import { confirmPasswordValidator, passwordValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-register-coletor',
  templateUrl: './register-coletor.component.html',
  styleUrls: ['./register-coletor.component.scss']
})
export class RegisterColetorComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  showAddressFields = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      completeName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    },
      {
        validators: [
          confirmPasswordValidator('password', 'passwordConfirm'),
          passwordValidator()
        ]
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
    let user = new SignUpDto(this.form, undefined);
    this.accountService.registerColetor(user)
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
}
