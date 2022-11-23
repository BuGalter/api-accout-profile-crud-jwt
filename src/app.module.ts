import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { Profile } from './profiles/entities/profile.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kaban',
      password: 'kaban',
      database: 'nestcrud',
      entities: [Account, Profile],
      synchronize: true,
    }),
    AccountsModule,
    ProfilesModule,
    AuthModule,
  ],
})
export class AppModule {}
