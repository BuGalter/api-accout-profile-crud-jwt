import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { Profile } from './profiles/entities/profile.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: configuration().dataBase.type,
      host: configuration().dataBase.host,
      port: configuration().dataBase.port,
      username: configuration().dataBase.userName,
      password: configuration().dataBase.password,
      database: configuration().dataBase.name,
      entities: [Account, Profile],
      synchronize: true,
    }),
    AccountsModule,
    ProfilesModule,
    AuthModule,
  ],
})
export class AppModule {}
