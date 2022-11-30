export interface IApp {
  port: number;
}

export interface IDataBase {
  type: any;
  host: string;
  port: number;
  userName: string;
  password: string;
  name: string;
}

export interface IConfiguration {
  app: IApp;
  dataBase: IDataBase;
}

export default (): IConfiguration => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 8000,
  },
  dataBase: {
    type: process.env.TYPE_DB,
    host: process.env.HOST_DB,
    port: parseInt(process.env.PORT_DB, 10) || 3306,
    userName: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    name: process.env.NAME_DB,
  },
});
