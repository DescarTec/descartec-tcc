"use strict";
(self["webpackChunkwebapp"] = self["webpackChunkwebapp"] || []).push([[1],{

/***/ 1679:
/*!****************************************************!*\
  !*** ./src/app/domain/services/address.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Address": () => (/* binding */ Address),
/* harmony export */   "AddressService": () => (/* binding */ AddressService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 4004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 529);



let AddressService = /*#__PURE__*/(() => {
  class AddressService {
    constructor(http) {
      this.http = http;
      this.VIACEP_API_URL = 'https://viacep.com.br/ws';
    }
    getAddressByCep(cep) {
      const url = `${this.VIACEP_API_URL}/${cep}/json`;
      return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.map)(address => {
        return {
          cep: address.cep,
          logradouro: address.logradouro,
          bairro: address.bairro,
          localidade: address.localidade,
          uf: address.uf,
          ibge: address.ibge,
          ddd: address.ddd
        };
      }));
    }
  }
  AddressService.ɵfac = function AddressService_Factory(t) {
    return new (t || AddressService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  AddressService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AddressService,
    factory: AddressService.ɵfac,
    providedIn: 'root'
  });
  return AddressService;
})();
class Address {
  constructor(cep, logradouro, bairro, localidade, uf, ibge, ddd) {
    this.cep = cep;
    this.logradouro = logradouro;
    this.bairro = bairro;
    this.localidade = localidade;
    this.uf = uf;
    this.ibge = ibge;
    this.ddd = ddd;
  }
}

/***/ }),

/***/ 7053:
/*!*****************************************!*\
  !*** ./src/app/models/dto/signUpDTO.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignUpDto": () => (/* binding */ SignUpDto)
/* harmony export */ });
class SignUpDto {
  constructor(form, address) {
    this.username = form.get('username').value;
    this.nomeCompleto = form.get('completeName').value;
    this.dataNascimento = new Date();
    this.email = form.get('email').value;
    this.password = form.get('password').value;
    this.passwordConfirm = form.get('passwordConfirm').value;
    this.phoneNumber = form.get('phoneNumber').value;
    this.cep = address.cep;
    this.logradouro = address.logradouro;
    this.bairro = address.bairro;
    this.localidade = address.localidade;
    this.uf = address.uf;
    this.ibge = address.ibge;
    this.ddd = address.ddd;
    this.dataNascimento = new Date();
  }
}

/***/ }),

/***/ 895:
/*!*************************************!*\
  !*** ./src/app/utils/validators.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addressValidator": () => (/* binding */ addressValidator),
/* harmony export */   "confirmPasswordValidator": () => (/* binding */ confirmPasswordValidator),
/* harmony export */   "passwordValidator": () => (/* binding */ passwordValidator)
/* harmony export */ });
function confirmPasswordValidator(controlName, matchingControlName) {
  return formGroup => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmPassword']) {
      // retorna se outro validador já encontrou um erro em matchingControl
      return;
    }
    // define o erro confirmPassword se os valores dos dois campos são diferentes
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({
        confirmPassword: true
      });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
function addressValidator(address) {
  return formGroup => {
    if (!address) {
      formGroup.controls['cep'].setErrors({
        invalidCep: true
      });
    } else {
      formGroup.controls['cep'].setErrors(null);
    }
  };
}
function passwordValidator() {
  return formGroup => {
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberPattern = /[0-9]/;
    const control = formGroup.controls['password'];
    if (control.value && (!upperCasePattern.test(control.value) || !lowerCasePattern.test(control.value) || !specialCharPattern.test(control.value) || !numberPattern.test(control.value))) {
      return control.setErrors({
        passwordInvalid: true
      });
    }
    return control.setErrors(null);
  };
}

/***/ }),

/***/ 2318:
/*!**************************************************************!*\
  !*** ./src/app/view/pages/account/account-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccountRoutingModule": () => (/* binding */ AccountRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 4793);
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.component */ 672);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component */ 5586);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.component */ 5842);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4650);






const routes = [{
  path: '',
  component: _layout_component__WEBPACK_IMPORTED_MODULE_0__.LayoutComponent,
  children: [{
    path: 'login',
    component: _login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent
  }, {
    path: 'register',
    component: _register_component__WEBPACK_IMPORTED_MODULE_2__.RegisterComponent
  }]
}];
let AccountRoutingModule = /*#__PURE__*/(() => {
  class AccountRoutingModule {}
  AccountRoutingModule.ɵfac = function AccountRoutingModule_Factory(t) {
    return new (t || AccountRoutingModule)();
  };
  AccountRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
    type: AccountRoutingModule
  });
  AccountRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
  return AccountRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AccountRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 6001:
/*!******************************************************!*\
  !*** ./src/app/view/pages/account/account.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccountModule": () => (/* binding */ AccountModule)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4006);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6895);
/* harmony import */ var _account_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account-routing.module */ 2318);
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout.component */ 672);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ 5586);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register.component */ 5842);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4650);







let AccountModule = /*#__PURE__*/(() => {
  class AccountModule {}
  AccountModule.ɵfac = function AccountModule_Factory(t) {
    return new (t || AccountModule)();
  };
  AccountModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: AccountModule
  });
  AccountModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _account_routing_module__WEBPACK_IMPORTED_MODULE_0__.AccountRoutingModule]
  });
  return AccountModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AccountModule, {
    declarations: [_layout_component__WEBPACK_IMPORTED_MODULE_1__.LayoutComponent, _login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent, _register_component__WEBPACK_IMPORTED_MODULE_3__.RegisterComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _account_routing_module__WEBPACK_IMPORTED_MODULE_0__.AccountRoutingModule]
  });
})();

/***/ }),

/***/ 672:
/*!********************************************************!*\
  !*** ./src/app/view/pages/account/layout.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutComponent": () => (/* binding */ LayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 4793);
/* harmony import */ var _domain_services_account_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/services/account.service */ 5644);



let LayoutComponent = /*#__PURE__*/(() => {
  class LayoutComponent {
    constructor(router, accountService) {
      this.router = router;
      this.accountService = accountService;
      // redirect to home if already logged in
      if (this.accountService.currentUser) {
        this.router.navigate(['/']);
      }
    }
  }
  LayoutComponent.ɵfac = function LayoutComponent_Factory(t) {
    return new (t || LayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_domain_services_account_service__WEBPACK_IMPORTED_MODULE_0__.AccountService));
  };
  LayoutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LayoutComponent,
    selectors: [["ng-component"]],
    decls: 2,
    vars: 0,
    consts: [[1, "container", "col-md-6", "offset-md-3", "mt-5"]],
    template: function LayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
    encapsulation: 2
  });
  return LayoutComponent;
})();

/***/ }),

/***/ 5586:
/*!*******************************************************!*\
  !*** ./src/app/view/pages/account/login.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4006);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 590);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 4793);
/* harmony import */ var _domain_services_account_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/services/account.service */ 5644);
/* harmony import */ var _domain_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../domain/services/alert.service */ 2322);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6895);








function LoginComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Username is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function LoginComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, LoginComponent_div_9_div_1_Template, 3, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.f["username"].errors["required"]);
  }
}
function LoginComponent_div_14_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function LoginComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, LoginComponent_div_14_div_1_Template, 3, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.f["password"].errors["required"]);
  }
}
function LoginComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 15);
  }
}
const _c0 = function (a0) {
  return {
    "is-invalid": a0
  };
};
let LoginComponent = /*#__PURE__*/(() => {
  class LoginComponent {
    constructor(formBuilder, route, router, accountService, alertService) {
      this.formBuilder = formBuilder;
      this.route = route;
      this.router = router;
      this.accountService = accountService;
      this.alertService = alertService;
      this.loading = false;
      this.submitted = false;
    }
    ngOnInit() {
      this.form = this.formBuilder.group({
        username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
        password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]
      });
    }
    // convenience getter for easy access to form fields
    get f() {
      return this.form.controls;
    }
    onSubmit() {
      this.submitted = true;
      // reset alerts on submit
      this.alertService.clear();
      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }
      this.loading = true;
      this.accountService.login(this.f['username'].value, this.f['password'].value).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.first)()).subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.error(error);
          this.alertService.error(error.error);
          this.loading = false;
        }
      });
    }
  }
  LoginComponent.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_domain_services_account_service__WEBPACK_IMPORTED_MODULE_0__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_domain_services_alert_service__WEBPACK_IMPORTED_MODULE_1__.AlertService));
  };
  LoginComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["ng-component"]],
    decls: 21,
    vars: 11,
    consts: [[1, "custom-card"], [2, "font-family", "ClashDisplay-Semibold"], [1, "card-body"], [3, "formGroup", "ngSubmit"], [1, "mb-3"], [1, "form-label"], ["type", "text", "formControlName", "username", 1, "form-control", 3, "ngClass"], ["class", "invalid-feedback", 4, "ngIf"], ["type", "password", "formControlName", "password", 1, "form-control", 3, "ngClass"], [3, "disabled"], ["class", "spinner-border spinner-border-sm me-1", 4, "ngIf"], ["routerLink", "../register", 1, "btn", "btn-link", "custom-link"], [1, "invalid-feedback"], [4, "ngIf"], [2, "color", "rgba(252, 71, 58, 0.979)"], [1, "spinner-border", "spinner-border-sm", "me-1"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "LOGIN");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2)(4, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_4_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4)(6, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "USUARIO");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, LoginComponent_div_9_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 4)(11, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "SENHA");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, LoginComponent_div_14_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div")(16, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, LoginComponent_span_17_Template, 1, 0, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, " LOGIN ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "REGISTRAR-SE");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c0, ctx.submitted && ctx.f["username"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["username"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](9, _c0, ctx.submitted && ctx.f["password"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["password"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
    encapsulation: 2
  });
  return LoginComponent;
})();

/***/ }),

/***/ 5842:
/*!**********************************************************!*\
  !*** ./src/app/view/pages/account/register.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterComponent": () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4006);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 590);
/* harmony import */ var src_app_models_dto_signUpDTO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/dto/signUpDTO */ 7053);
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/validators */ 895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 4793);
/* harmony import */ var _domain_services_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/services/account.service */ 5644);
/* harmony import */ var _domain_services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/services/alert.service */ 2322);
/* harmony import */ var src_app_domain_services_address_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/domain/services/address.service */ 1679);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6895);











function RegisterComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Nome Completo \u00E9 obrigat\u00F3rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RegisterComponent_div_9_div_1_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.f["completeName"].errors["required"]);
  }
}
function RegisterComponent_div_14_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "E-mail \u00E9 obrigat\u00F3rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RegisterComponent_div_14_div_1_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.f["email"].errors["required"]);
  }
}
function RegisterComponent_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Celular \u00E9 obrigat\u00F3rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RegisterComponent_div_19_div_1_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.f["phoneNumber"].errors["required"]);
  }
}
function RegisterComponent_div_24_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Username \u00E9 obrigat\u00F3rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RegisterComponent_div_24_div_1_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r3.f["username"].errors["required"]);
  }
}
function RegisterComponent_div_29_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Senha \u00E9 obrigat\u00F3rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_29_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Senha deve conter no m\u00EDnimo 6 caracteres");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_29_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Senha deve conter ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "- 1 car\u00E1cter especial, ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "- 1 letra mai\u00FAscula, ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "- 1 letra min\u00FAscula ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "- 1 numero ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RegisterComponent_div_29_div_1_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, RegisterComponent_div_29_div_2_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, RegisterComponent_div_29_div_3_Template, 11, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r4.f["password"].errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r4.f["password"].errors["minlength"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r4.f["password"].errors["passwordInvalid"]);
  }
}
function RegisterComponent_div_34_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Confirmar Senha \u00E9 obrigat\u00F3rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_34_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "As senhas devem ser iguais");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RegisterComponent_div_34_div_1_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, RegisterComponent_div_34_div_2_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r5.f["passwordConfirm"].errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r5.f["passwordConfirm"].errors["confirmPassword"]);
  }
}
function RegisterComponent_div_39_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "CEP \u00E9 obrigat\u00F3rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_39_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "CEP \u00E9 inv\u00E1lido");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RegisterComponent_div_39_div_1_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, RegisterComponent_div_39_div_2_Template, 3, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r6.f["cep"].errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r6.f["cep"].errors["invalidCep"]);
  }
}
function RegisterComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 3)(1, "div", 20)(2, "label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "RUA/LOGADOURO");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 20)(6, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "BAIRRO");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 20)(10, "label", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "CIDADE");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 20)(14, "label", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "ESTADO");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](16, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function RegisterComponent_span_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "span", 29);
  }
}
const _c0 = function (a0) {
  return {
    "is-invalid": a0
  };
};
let RegisterComponent = /*#__PURE__*/(() => {
  class RegisterComponent {
    constructor(formBuilder, route, router, accountService, alertService, addressService) {
      this.formBuilder = formBuilder;
      this.route = route;
      this.router = router;
      this.accountService = accountService;
      this.alertService = alertService;
      this.addressService = addressService;
      this.loading = false;
      this.submitted = false;
      this.showAddressFields = false;
      this.address = null;
    }
    ngOnInit() {
      this.form = this.formBuilder.group({
        completeName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
        username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
        password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.minLength(6)]],
        passwordConfirm: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required]],
        email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.email]],
        phoneNumber: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
        cep: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
        logradouro: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
        bairro: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
        localidade: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
        uf: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required]
      }, {
        validators: [(0,_utils_validators__WEBPACK_IMPORTED_MODULE_1__.confirmPasswordValidator)('password', 'passwordConfirm'), (0,_utils_validators__WEBPACK_IMPORTED_MODULE_1__.passwordValidator)()]
      });
      this.form.get('cep')?.valueChanges.subscribe(value => {
        if (value && value.length === 8 && value.includes('-')) {
          return;
        }
        if (value && value.length === 8) {
          //this.alertService.info('Buscando endereço...');
          this.addressService.getAddressByCep(value).subscribe({
            next: address => {
              this.address = address;
              if (!address.logradouro) {
                this.alertService.error('CEP não encontrado.');
                this.showAddressFields = false;
                this.f['cep'].setErrors({
                  invalidCep: true
                });
                return;
              }
              this.showAddressFields = true;
              this.f['cep'].setErrors(null);
              this.form.patchValue({
                logradouro: address.logradouro,
                bairro: address.bairro,
                localidade: address.localidade,
                uf: address.uf
              });
            },
            error: error => {
              this.alertService.error(error);
              this.showAddressFields = false;
              this.f['cep'].setErrors({
                invalidCep: true
              });
            }
          });
        } else {
          this.showAddressFields = false;
        }
      });
    }
    // convenience getter for easy access to form fields
    get f() {
      return this.form.controls;
    }
    onSubmit() {
      this.submitted = true;
      // reset alerts on submit
      this.alertService.clear();
      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }
      this.loading = true;
      let user = new src_app_models_dto_signUpDTO__WEBPACK_IMPORTED_MODULE_0__.SignUpDto(this.form, this.address);
      this.accountService.register(user).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.first)()).subscribe({
        next: () => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true
          });
          this.router.navigate(['../login'], {
            relativeTo: this.route
          });
        },
        error: error => {
          console.error(error);
          this.alertService.error(error.error);
          this.loading = false;
        }
      });
    }
    onPhoneKeyPress(event) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      } else {
        const input = event.target;
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
    formatarCep(event) {
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
  RegisterComponent.ɵfac = function RegisterComponent_Factory(t) {
    return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_domain_services_account_service__WEBPACK_IMPORTED_MODULE_2__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_domain_services_alert_service__WEBPACK_IMPORTED_MODULE_3__.AlertService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_domain_services_address_service__WEBPACK_IMPORTED_MODULE_4__.AddressService));
  };
  RegisterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: RegisterComponent,
    selectors: [["ng-component"]],
    decls: 47,
    vars: 32,
    consts: [[1, "custom-card"], [1, "card-body"], [3, "formGroup", "ngSubmit"], [1, "mb-3"], [1, "form-label"], ["type", "text", "formControlName", "completeName", 1, "form-control", 3, "ngClass"], ["class", "invalid-feedback", 4, "ngIf"], ["type", "text", "formControlName", "email", 1, "form-control", 3, "ngClass"], ["type", "text", "formControlName", "phoneNumber", 1, "form-control", 3, "ngClass", "keypress"], ["type", "text", "formControlName", "username", 1, "form-control", 3, "ngClass"], ["type", "password", "formControlName", "password", 1, "form-control", 3, "ngClass"], ["type", "password", "formControlName", "passwordConfirm", 1, "form-control", 3, "ngClass"], ["type", "text", "formControlName", "cep", "maxLength", "9", 1, "form-control", 3, "ngClass", "input"], ["class", "mb-3", 4, "ngIf"], [3, "disabled"], ["class", "spinner-border spinner-border-sm me-1", 4, "ngIf"], ["routerLink", "../login", 1, "btn", "btn-link", "custom-link"], [1, "invalid-feedback"], [4, "ngIf"], [2, "color", "rgba(252, 71, 58, 0.979)"], [1, "form-group"], ["for", "logradouro"], ["type", "text", "id", "logradouro", "formControlName", "logradouro", "readonly", "", 1, "form-control"], ["for", "bairro"], ["type", "text", "id", "bairro", "formControlName", "bairro", "readonly", "", 1, "form-control"], ["for", "localidade"], ["type", "text", "id", "localidade", "formControlName", "localidade", "readonly", "", 1, "form-control"], ["for", "uf"], ["type", "text", "id", "uf", "formControlName", "uf", "readonly", "", 1, "form-control"], [1, "spinner-border", "spinner-border-sm", "me-1"]],
    template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "REGISTRAR-SE");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 1)(4, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_4_listener() {
          return ctx.onSubmit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 3)(6, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "NOME COMPLETO");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, RegisterComponent_div_9_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 3)(11, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "E-MAIL");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, RegisterComponent_div_14_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 3)(16, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "CELULAR");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keypress", function RegisterComponent_Template_input_keypress_18_listener($event) {
          return ctx.onPhoneKeyPress($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](19, RegisterComponent_div_19_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 3)(21, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22, "USUARIO");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](23, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](24, RegisterComponent_div_24_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div", 3)(26, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "SENHA");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](28, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, RegisterComponent_div_29_Template, 4, 3, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "div", 3)(31, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](32, "CONFIRMAR SENHA");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](33, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](34, RegisterComponent_div_34_Template, 3, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "div", 3)(36, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](37, "CEP");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function RegisterComponent_Template_input_input_38_listener($event) {
          return ctx.formatarCep($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](39, RegisterComponent_div_39_Template, 3, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](40, RegisterComponent_div_40_Template, 17, 0, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](41, "div")(42, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](43, RegisterComponent_span_43_Template, 1, 0, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](44, " REGISTRAR ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](45, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](46, "J\u00E1 registrado?");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](18, _c0, ctx.submitted && ctx.f["completeName"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["completeName"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](20, _c0, ctx.submitted && ctx.f["email"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["email"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](22, _c0, ctx.submitted && ctx.f["phoneNumber"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["phoneNumber"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](24, _c0, ctx.submitted && ctx.f["username"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["username"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](26, _c0, ctx.submitted && ctx.f["password"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["password"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](28, _c0, ctx.submitted && ctx.f["passwordConfirm"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["passwordConfirm"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](30, _c0, ctx.submitted && ctx.f["cep"].errors));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["cep"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showAddressFields);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loading);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink],
    encapsulation: 2
  });
  return RegisterComponent;
})();

/***/ })

}]);