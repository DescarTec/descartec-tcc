import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AddressService {

  private readonly VIACEP_API_URL = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  getAddressByCep(cep: string): Observable<Address> {
    const url = `${this.VIACEP_API_URL}/${cep}/json`;
    return this.http.get<Address>(url).pipe(
      map((address: Address) => {
        return {
          cep: address.cep,
          logradouro: address.logradouro,
          bairro: address.bairro,
          localidade: address.localidade,
          uf: address.uf,
          ibge: address.ibge,
          ddd: address.ddd
        };
      })
    );
  }
}

export class Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  ddd: string;

  constructor(
    cep: string, 
    logradouro: string, 
    bairro: string, 
    localidade: string, 
    uf: string, 
    ibge: string, 
    ddd: string
) {
    this.cep = cep
    this.logradouro = logradouro
    this.bairro = bairro
    this.localidade = localidade
    this.uf = uf
    this.ibge = ibge
    this.ddd = ddd
  }
}