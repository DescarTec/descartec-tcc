export class NotificacaoResponse {
  data?: Notificacao[];
  meta?: Meta;
  erro?: Erro;
}

export class Erro {
  exception?: Exception;
  message?: string;
}

export class Exception {
  targetSite?: any;
  message?: string;
  data?: Data;
  innerException?: any;
  helpLink?: any;
  source?: any;
  hResult?: number;
  stackTrace?: any;
}

export class Data {
}

export class Meta {
  count?: number;
  info?: Info;
}

export class Info {
  totalNaoLidos?: number;
}

export class Notificacao {
  id?: string;
  titulo?: string;
  body?: string;
  lido?: boolean;
  data?: string;
  applicationUserId?: string;
}