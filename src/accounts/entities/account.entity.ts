import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isLoggin: boolean;

  @OneToOne(() => Profile, (profile) => profile.account)
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
